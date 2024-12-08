import UserModel from "@/models/user"; // مدل کاربر
import connectToDB from "@/configs/db"; // متصل شدن به دیتابیس
import { NextRequest } from "next/server"; // نوع درخواست Next.js
import { cookies } from "next/headers"; // مدیریت کوکی‌ها
import { verifyToken } from "@/utils/auth";

export const GET = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        await connectToDB();

        const cookieStore = await cookies(); // برای مدیریت کوکی‌ها

        const accessToken = cookieStore.get('accessToken')?.value;

        // بررسی وجود توکن
        if (!accessToken) {
            return Response.json({ message: "شما وارد سیستم نشده‌اید" }, { status: 401 });
        }

        const verifyUser = verifyToken(accessToken);

        // بررسی اعتبار توکن
        if (!verifyUser) {
            return Response.json({ message: "توکن نامعتبر است" }, { status: 401 });
        }

        const userDetails = await UserModel.findOne({ email: verifyUser.email }, "-password -__v -updatedAt");

        // بررسی نقش کاربر
        if (userDetails?.role !== "ADMIN") {
            return Response.json({ message: "دسترسی به این بخش برای شما مجاز نیست" }, { status: 403 });
        }

        // دریافت تمام کاربران
        const allUser = await UserModel.find({}, "-password -__v -updatedAt");

        // بازگشت پاسخ موفقیت‌آمیز
        return Response.json(allUser, { status: 200 });
    } catch (err) {
        // مدیریت خطای داخلی
        console.error(err); // چاپ خطا در کنسول برای بررسی بیشتر
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است" },
            { status: 500 }
        );
    }
};
