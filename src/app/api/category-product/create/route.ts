import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import UserModel from "@/models/user";
import categoryProductModel from "@/models/categoryProducts";

export const POST = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        await connectToDB();

        const {
            title
        } = await req.json();
        

        const cookieStore = await cookies(); // برای مدیریت کوکی‌ها
        const accessToken = cookieStore.get('accessToken')?.value;
        // دریافت فایل‌ها از درخواست (با استفاده از async/await)

        // بررسی توکن
        if (!accessToken) {
            return Response.json({ message: "شما وارد سیستم نشده‌اید" }, { status: 401 });
        }

        const verifiedUser = verifyToken(accessToken); // استفاده از await برای اعتبارسنجی توکن

        // اگر توکن معتبر نیست
        if (!verifiedUser) {
            return Response.json({ message: "توکن نامعتبر است" }, { status: 401 });
        }

        // جستجو کاربر با ایمیل verified
        const userDetails = await UserModel.findOne({ email: verifiedUser.email }, "-password -__v -updatedAt");

        // بررسی نقش کاربر
        if (userDetails?.role !== "ADMIN") {
            return Response.json({ message: "دسترسی به این بخش برای شما مجاز نیست" }, { status: 403 });
        }


        await categoryProductModel.create({
            title,
        });




        // بازگشت پاسخ موفقیت‌آمیز
        return Response.json(
            { message: "دسته بندی محصول با موفقیت اضافه شد" },
            { status: 201 }
        );
    } catch (err) {
        // مدیریت خطای داخلی
        console.error(err); // چاپ خطا در کنسول برای بررسی بیشتر
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است" },
            { status: 500 }
        );
    }
};