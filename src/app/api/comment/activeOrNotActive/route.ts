import ProductModel from "@/models/products"; // مدل کاربر
import CommentModel from "@/models/comments"; // مدل دسته بندی
import UserModel from "@/models/user"; // مدل کاربر
import connectToDB from "@/configs/db"; // متصل شدن به دیتابیس
import { NextRequest } from "next/server"; // نوع درخواست Next.js
import { cookies } from "next/headers"; // مدیریت کوکی‌ها
import { verifyToken } from "@/utils/auth";

export const PUT = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        await connectToDB();

        const {commentId} = await req.json();

        console.log("Comment ID received in API:", commentId);
        
        const cookieStore = await cookies(); // برای مدیریت کوکی‌ها
        const accessToken = cookieStore.get('accessToken')?.value;

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

        const comment = await CommentModel.findOne({ _id: commentId });
        const commentUpdated = await CommentModel.findOneAndUpdate(
            { _id: commentId },
            { $set: { isActive: !comment.isActive } },
            { new: true }
        );

        if (!commentUpdated) {
            return Response.json({ message: "کامنت یافت نشد" }, { status: 404 });
        }

        // بازگشت پاسخ موفقیت‌آمیز
        return Response.json(
            { message: `کامنت با موفقیت
                ${commentUpdated.isActive ? "تایید" : "رد"}
               شد ` },
            { status: 200 }
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
