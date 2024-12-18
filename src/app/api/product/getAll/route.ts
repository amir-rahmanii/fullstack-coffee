import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import ProductModel from "@/models/products";

export const GET = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        await connectToDB();

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        // بررسی توکن
        if (!accessToken) {
            return Response.json({ message: "شما وارد سیستم نشده‌اید" }, { status: 401 });
        }

        const verifiedUser = verifyToken(accessToken);
        if (!verifiedUser) {
            return Response.json({ message: "توکن نامعتبر است" }, { status: 401 });
        }

        // پارامترهای فیلترینگ
        const searchQuery = req.nextUrl.searchParams.get("search") || "";
        const sortQuery = req.nextUrl.searchParams.get("sort") || "latest";
        const stockQuery = req.nextUrl.searchParams.get("stock") || "0";

        // ایجاد شرط‌های فیلترینگ
        const filterCondition = {
            ...(searchQuery && {
                $or: [
                    { title: { $regex: searchQuery, $options: "i" } },
                    { description: { $regex: searchQuery, $options: "i" } },
                ],
            }),
            ...(stockQuery === "1" && { stock: { $gt: 0 } }),
        }; // اگر stock=0 باشد، شرطی اضافه نمی‌شود و همه محصولات نمایش داده می‌شوند.

        // مرتب‌سازی
        const sortCondition =
            sortQuery === "price"
                ? { price: 1 } // قیمت صعودی
                : sortQuery === "price-desc"
                ? { price: -1 } // قیمت نزولی
                : { createdAt: -1 }; // پیش‌فرض: جدیدترین محصولات

        // واکشی محصولات
        const allProducts = await ProductModel.find(filterCondition, "-__v")
            .sort(sortCondition)
            .populate("category");

        // بازگشت محصولات
        return Response.json(allProducts, { status: 200 });
    } catch (err) {
        console.error("خطا در دریافت محصولات:", err);
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است" },
            { status: 500 }
        );
    }
};
