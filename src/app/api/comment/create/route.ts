import connectToDB from "@/configs/db";
import { NextRequest } from "next/server";
import commentModel from "@/models/comments";

export const POST = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        await connectToDB();

        const {
            name,
            email,
            description,
            productId,
        } = await req.json();


        const createComment = await commentModel.create({
            name,
            email,
            description,
            product: productId
        });

        if (createComment) {
            // بازگشت پاسخ موفقیت‌آمیز
            return Response.json(
                { message: "کامنت محصول با موفقیت اضافه شد" },
                { status: 201 }
            );
        }

    } catch (err) {
        // مدیریت خطای داخلی
        console.error(err); // چاپ خطا در کنسول برای بررسی بیشتر
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است" },
            { status: 500 }
        );
    }
};