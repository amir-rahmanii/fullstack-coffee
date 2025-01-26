import ProductModel from "@/models/products"; // مدل کاربر
import CategoryProductModel from "@/models/categoryProducts"; // مدل دسته بندی
import UserModel from "@/models/user"; // مدل کاربر
import connectToDB from "@/configs/db"; // متصل شدن به دیتابیس
import { NextRequest } from "next/server"; // نوع درخواست Next.js
import { cookies } from "next/headers"; // مدیریت کوکی‌ها
import { verifyToken } from "@/utils/auth";

export const DELETE = async (req: NextRequest, {
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    try {
        // اتصال به دیتابیس
        await connectToDB();

        const { id } = await params;


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

        // حذف کاربر از دیتابیس
        const deleteCategoryProduct = await CategoryProductModel.findOneAndDelete({ _id: id });
        await ProductModel.deleteMany({ category: id });

        // اگر کاربر یافت نشد
        if (!deleteCategoryProduct) {
            return Response.json({ message: "دسته بندی محصول یافت نشد" }, { status: 404 });
        }

        // بازگشت پاسخ موفقیت‌آمیز
        return Response.json(
            { message: "دسته بندی محصول با موفقیت حذف شد" },
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
