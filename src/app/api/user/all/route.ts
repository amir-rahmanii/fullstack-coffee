import UserModel from "@/models/user"; // مدل کاربر
import connectToDB from "@/configs/db"; // متصل شدن به دیتابیس
import { NextRequest } from "next/server"; // نوع درخواست و پاسخ Next.js
import { cookies } from "next/headers"; // مدیریت کوکی‌ها
import { verifyToken } from "@/utils/auth";

export const GET = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        await connectToDB();

        // دریافت مقدار `search` از پارامتر کوئری
        const searchQuery = req.nextUrl.searchParams.get("search") || "";

        // دریافت کوکی‌ها
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        // بررسی وجود توکن
        if (!accessToken) {
            return Response.json(
                { message: "شما وارد سیستم نشده‌اید" },
                { status: 401 }
            );
        }

        // اعتبارسنجی توکن
        const verifyUser = verifyToken(accessToken);

        // بررسی اعتبار توکن
        if (!verifyUser) {
            return Response.json(
                { message: "توکن نامعتبر است" },
                { status: 401 }
            );
        }

        // دریافت اطلاعات کاربر
        const userDetails = await UserModel.findOne(
            { email: verifyUser.email },
            "-password -__v -updatedAt"
        );

        // بررسی نقش کاربر
        if (userDetails?.role !== "ADMIN") {
            return Response.json(
                { message: "دسترسی به این بخش برای شما مجاز نیست" },
                { status: 403 }
            );
        }

        // تنظیم شرط جستجو
        const filterCondition = searchQuery
            ? {
                  $or: [
                      { username: { $regex: searchQuery, $options: "i" } },
                      { email: { $regex: searchQuery, $options: "i" } },
                  ],
              }
            : {};

        // دریافت تمام یا فیلتر شده کاربران
        const allUsers = await UserModel.find(filterCondition, "-password -__v -updatedAt");

        // بازگشت پاسخ موفقیت‌آمیز
        return Response.json(allUsers, { status: 200 });
    } catch (err) {
        // مدیریت خطای داخلی
        console.error(err); // چاپ خطا در کنسول برای بررسی بیشتر
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است" },
            { status: 500 }
        );
    }
};
