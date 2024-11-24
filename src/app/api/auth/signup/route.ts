import UserModel from "@/models/user"; // مدل کاربر
import RefreshTokenModel from "@/models/refreshToken"; // مدل توکن رفرش
import connectToDB from "@/configs/db"; // اتصال به دیتابیس
import { generateToken, hashPassword } from "@/utils/auth"; // توابع تولید توکن و هش رمز عبور
import { NextRequest } from "next/server"; // نوع درخواست Next.js
import { cookies } from "next/headers"; // مدیریت کوکی‌ها

export async function POST(req: NextRequest) {
    try {
        // اتصال به دیتابیس
        connectToDB();

        // دریافت داده‌ها از درخواست
        const { username, email, password } = await req.json();
        const cookieStore = await cookies(); // برای مدیریت کوکی‌ها

        // اعتبارسنجی اطلاعات ورودی
        if (!username.trim() || !email.trim() || !password.trim()) {
            return Response.json(
                { message: "اطلاعات وارد شده معتبر نمی‌باشد!" },
                { status: 422 }
            );
        }

        // بررسی وجود کاربر با نام کاربری یا ایمیل
        const isUserExist = await UserModel.findOne({
            $or: [{ username }, { email }],
        });

        if (isUserExist) {
            return Response.json(
                { message: "این نام کاربری یا ایمیل قبلاً ثبت شده است!" },
                { status: 422 }
            );
        }

        // هش کردن رمز عبور
        const hashedPassword = await hashPassword(password);

        // تولید توکن‌های دسترسی و رفرش
        const accessToken = await generateToken({ email }); // تولید توکن دسترسی
        const refreshToken = crypto.randomUUID(); // تولید توکن رفرش (UUID)

        // تعیین نقش کاربر: اولین کاربر به عنوان "ADMIN" و بقیه به عنوان "USER"
        const users = await UserModel.find({});
        await UserModel.create({
            username,
            email,
            password: hashedPassword,
            role: users.length > 0 ? "USER" : "ADMIN", // تعیین نقش کاربر
        });

        // بازیابی اطلاعات کاربر از دیتابیس
        const user = await UserModel.findOne({ email });

        // ذخیره توکن رفرش در دیتابیس
        await RefreshTokenModel.create({
            token: refreshToken,
            user: user._id,
        });

        // ذخیره توکن دسترسی در کوکی
        cookieStore.set({
            name: 'accessToken',
            value: accessToken,
            httpOnly: true, // فقط از طریق سرور قابل دسترسی
            maxAge: 60 * 60 * 24, // اعتبار 1 روزه
            path: '/',
        });

        // ذخیره توکن رفرش در کوکی
        cookieStore.set({
            name: 'refreshToken',
            value: refreshToken,
            httpOnly: true, // فقط از طریق سرور قابل دسترسی
            maxAge: 60 * 60 * 24 * 7, // اعتبار 7 روزه
            path: '/',
        });

        // بازگرداندن پاسخ موفقیت‌آمیز
        return Response.json(
            { message: "کاربر با موفقیت ایجاد شد :))" },
            { status: 201 }
        );
    } catch (err) {
        // مدیریت خطای داخلی
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است!" },
            { status: 500 }
        );
    }
};
