import UserModel from "@/models/user"; // مدل کاربر
import RefreshTokenModel from "@/models/refreshToken"; // مدل توکن رفرش
import connectToDB from "@/configs/db"; // متصل شدن به دیتابیس
import { generateToken, comparePassword } from "@/utils/auth"; // توابع احراز هویت (تولید توکن و مقایسه رمز عبور)
import { NextRequest } from "next/server"; // نوع درخواست Next.js
import { cookies } from "next/headers"; // مدیریت کوکی‌ها

export const POST = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        connectToDB();

        // دریافت اطلاعات از درخواست
        const { identity, password } = await req.json();
        const cookieStore = await cookies(); // برای مدیریت کوکی‌ها

        // بررسی معتبر بودن اطلاعات وارد شده
        if (!identity.trim() || !password.trim()) {
            return Response.json(
                { message: "اطلاعات وارد شده معتبر نمی‌باشد!" },
                { status: 422 }
            );
        }

        // جستجوی کاربر بر اساس نام کاربری یا ایمیل
        const user = await UserModel.findOne({
            $or: [{ username: identity }, { email: identity }],
        });

        // بررسی وجود کاربر
        if (!user) {
            return Response.json(
                { message: "کاربر پیدا نشد!" },
                { status: 404 }
            );
        }

        // بررسی صحت رمز عبور
        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) {
            return Response.json(
                { message: "نام کاربری یا رمز عبور اشتباه است!" },
                { status: 422 }
            );
        }

        // تولید توکن‌های دسترسی و رفرش
        const accessToken = await generateToken({ email: user.email }); // تولید توکن دسترسی
        const refreshToken = crypto.randomUUID(); // تولید توکن رفرش (UUID)

        // ذخیره توکن رفرش در دیتابیس
        await RefreshTokenModel.create({
            token: refreshToken,
            user: user._id,
        });

        // تنظیم کوکی برای توکن دسترسی
        cookieStore.set({
            name: 'accessToken',
            value: accessToken,
            httpOnly: true, // فقط از طریق سرور قابل دسترسی است
            maxAge: 60 * 60 * 24, // مدت اعتبار: 1 روز
            path: '/',
        });

        // تنظیم کوکی برای توکن رفرش
        cookieStore.set({
            name: 'refreshToken',
            value: refreshToken,
            httpOnly: true, // فقط از طریق سرور قابل دسترسی است
            maxAge: 60 * 60 * 24 * 7, // مدت اعتبار: 7 روز
            path: '/',
        });

        // بازگشت پاسخ موفقیت‌آمیز
        return Response.json(
            { message: "ورود کاربر با موفقیت انجام شد :))" },
            { status: 200 }
        );
    } catch (err) {
        // مدیریت خطای داخلی
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است!" },
            { status: 500 }
        );
    }
};
