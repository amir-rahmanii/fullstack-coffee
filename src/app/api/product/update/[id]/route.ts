import { NextRequest } from "next/server";
import ProductModel from "@/models/products";
import UserModel from "@/models/user";
import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import fs from "fs";
import path from "path";

// Helper function to save files
const saveFiles = async (files: Buffer[], filenames: string[], existingUrls: string[]) => {
    const uploadDir = path.join(process.cwd(), "public/uploads/products");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths: string[] = [];

    for (let i = 0; i < filenames.length; i++) {
        const filePath = path.join(uploadDir, filenames[i]);

        // Check if the file URL already exists in the database
        if (!existingUrls.includes(`/uploads/products/${filenames[i]}`)) {
            await fs.promises.writeFile(filePath, files[i]);
            filePaths.push(`/uploads/products/${filenames[i]}`);
        }
    }

    return filePaths;
};

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return Response.json({ message: "شما وارد سیستم نشده‌اید" }, { status: 401 });
        }

        const verifiedUser = verifyToken(accessToken);

        if (!verifiedUser) {
            return Response.json({ message: "توکن نامعتبر است" }, { status: 401 });
        }

        const userDetails = await UserModel.findOne({ email: verifiedUser.email }, "-password -__v -updatedAt");

        if (userDetails?.role !== "ADMIN") {
            return Response.json({ message: "دسترسی به این بخش برای شما مجاز نیست" }, { status: 403 });
        }

        const { id } = await params;
        const formData = await req.formData();

        const title = formData.get("title")?.toString() ?? "";
        const price = formData.get("price")?.toString() ?? "";
        const discount = formData.get("discount")?.toString() ?? "";
        const description = formData.get("description")?.toString() ?? "";
        const category = formData.get("category")?.toString() ?? "";
        const weight = formData.get("weight")?.toString() ?? "";
        const stock = formData.get("stock")?.toString() ?? "";

        if (!title || !price || !discount || !description || !category || !weight || !stock) {
            return Response.json({ message: "لطفاً تمام فیلدهای مورد نیاز را پر کنید" }, { status: 400 });
        }

        const newImages = formData.getAll("images");
        const remainingImages = JSON.parse(formData.get("remainingImages")?.toString() || "[]");

        
        const existingProduct = await ProductModel.findById(id);

        if (!existingProduct) {
            return Response.json({ message: "محصول مورد نظر یافت نشد" }, { status: 404 });
        }

        // بررسی تعداد تصاویر دقیقاً 2 باشد
        if (newImages.length + remainingImages.length !== 2) {
            return Response.json({ message: "لطفاً دقیقاً دو تصویر انتخاب کنید" }, { status: 400 });
        }

        const filesBuffer: Buffer[] = [];
        const filenames: string[] = [];

        for (const file of newImages) {
            if (file instanceof File) {
                const buffer = await file.arrayBuffer();
                filesBuffer.push(Buffer.from(buffer));
                filenames.push(`${Date.now()}-${file.name}`);
            }
        }

        // Save only files not already present in the database
        const newImageUrls = await saveFiles(filesBuffer, filenames, existingProduct.images);
        const finalImageUrls = [...remainingImages, ...newImageUrls];

        const priceWithDiscount = (+price * (100 - +discount)) / 100;

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            {
                title,
                price: +price,
                discount: +discount,
                category,
                description,
                priceWithDiscount,
                weight: +weight,
                stock: +stock,
                images: finalImageUrls,
            },
            { new: true } // Return the updated document
        );

        return Response.json({ message: "محصول با موفقیت به‌روزرسانی شد", product: updatedProduct }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "خطای داخلی ناشناخته رخ داده است" }, { status: 500 });
    }
};
