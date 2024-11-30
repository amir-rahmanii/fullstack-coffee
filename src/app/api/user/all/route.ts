import UserModel from "@/models/user"; // مدل کاربر
import connectToDB from "@/configs/db"; // متصل شدن به دیتابیس
import { NextRequest } from "next/server"; // نوع درخواست Next.js
import { cookies } from "next/headers"; // مدیریت کوکی‌ها
import { verifyToken } from "@/utils/auth";

export const GET = async (req: NextRequest) => {
    try {
        // اتصال به دیتابیس
        connectToDB();

        const cookieStore = await cookies(); // برای مدیریت کوکی‌ها

        const accessToken = cookieStore.get('accessToken')?.value;

       
        if (!accessToken) {
            return Response.json({ message: "You are not login" }, { status: 401 });
        }

        const verifyUser = verifyToken(accessToken);

        if (!verifyUser) {
            return Response.json({ message: "You are not login" }, { status: 401 });
        }

        const userDetails = await UserModel.findOne({ email: verifyUser.email }, "-password -__v -updatedAt");

        if(userDetails.role !== "ADMIN"){
            return Response.json({ message: "You can't access these items." }, { status: 403 });
        }


        const allUser = await UserModel.find({}, "-password");
   


        // بازگشت پاسخ موفقیت‌آمیز
        return Response.json(
            allUser,
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
