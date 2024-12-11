import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import ProductModel from "@/models/products";

export const GET = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        await connectToDB();

        const cookieStore = await cookies(); // برای مدیریت کوکی‌ها
        const accessToken = cookieStore.get('accessToken')?.value;
        // دریافت فایل‌ها از درخواست (با استفاده از async/await)


        const searchQuery = req.nextUrl.searchParams.get("search") || "";


        // بررسی توکن
        if (!accessToken) {
            return Response.json({ message: "شما وارد سیستم نشده‌اید" }, { status: 401 });
        }

        const verifiedUser = verifyToken(accessToken); // استفاده از await برای اعتبارسنجی توکن

        // اگر توکن معتبر نیست
        if (!verifiedUser) {
            return Response.json({ message: "توکن نامعتبر است" }, { status: 401 });
        }

        const filterCondition = searchQuery
        ? {
              $or: [
                  { title: { $regex: searchQuery, $options: "i" } },
              ],
          }
        : {};


        const allProduct = await ProductModel.find(filterCondition, "-__v -updatedAt")
        .populate("category"); 



        // بازگشت پاسخ موفقیت‌آمیز
        return Response.json(
            allProduct,
            { status: 200 }
        );
    } catch (err) {
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است" },
            { status: 500 }
        );
    }
};