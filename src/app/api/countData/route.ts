import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import ProductModel from "@/models/products";
import UserModel from "@/models/user";

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

        // واکشی محصولات
        const allProducts = await ProductModel.find({}, "-__v");
        const allUsers = await UserModel.find({}, "-__v");

        // بازگشت محصولات
        return Response.json({
            countProduct: allProducts.length,
            countUser: allUsers.length,

        }, { status: 200 });
    } catch (err) {
        console.error("خطا در دریافت محصولات:", err);
        return Response.json(
            { message: "خطای داخلی ناشناخته رخ داده است" },
            { status: 500 }
        );
    }
};
