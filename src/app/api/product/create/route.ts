import { NextRequest } from "next/server";
import ProductModel from "@/models/products";
import UserModel from "@/models/user";
import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import fs from 'fs';
import path from 'path';


const saveFiles = async (files: Buffer[], filenames: string[]) => {
    const uploadDir = path.join(process.cwd(), 'public/uploads/products');
    
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = filenames.map((filename, index) => {
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, files[index]);
        return `${filename}`;
    });

    return filePaths;
};

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

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

        // دریافت داده‌ها از فرم (multipart/form-data)
        const formData = await req.formData();  // استفاده از formData برای داده‌های multipart/form-data
        const title = formData.get("title")?.toString() ?? '';
        const price = formData.get("price")?.toString() ?? '';
        const discount = formData.get("discount")?.toString() ?? '';
        const description = formData.get("description")?.toString() ?? '';
        const category = formData.get("category")?.toString() ?? '';
        const weight = formData.get("weight")?.toString() ?? '';
        const stock = formData.get("stock")?.toString() ?? '';

        if (!title || !price || !discount || !description || !category || !weight) {
            return Response.json({ message: "لطفاً تمام فیلدهای مورد نیاز را پر کنید" }, { status: 400 });
        }

        // دریافت فایل‌ها به صورت Buffer
        const images = formData.getAll("images");

        if (images.length < 2) {
            return Response.json({ message: "لطفاً دو تصویر انتخاب کنید" }, { status: 400 });
        }

        // ذخیره فایل‌ها به صورت باینری (Buffer)
        const filesBuffer: Buffer[] = [];
        const filenames: string[] = [];

        for (const file of images) {
            if (file instanceof File) {  // بررسی اینکه آیا file از نوع File است
                const buffer = await file.arrayBuffer(); // تبدیل به ArrayBuffer
                filesBuffer.push(Buffer.from(buffer));  // تبدیل به Buffer
                filenames.push(`${Date.now()}-${file.name}`);
            }
        }

        const imageUrls = await saveFiles(filesBuffer, filenames);



        await ProductModel.create({
            title,
            price,
            discount,
            category,
            description,
            weight,
            stock,
            images: imageUrls,
        });

        return Response.json({ message: "محصول با موفقیت اضافه شد" }, { status: 201 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "خطای داخلی ناشناخته رخ داده است" }, { status: 500 });
    }
};
