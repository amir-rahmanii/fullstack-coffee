
import HeaderPannel from '@/components/parts/HeaderPannel/HeaderPannel';
import SideBarPannel from '@/components/parts/SideBarPannel/SideBarPannel';
import connectToDB from '@/configs/db';
import { verifyToken } from '@/utils/auth';
import { cookies } from 'next/headers';
import UserModel from "@/models/user"
import React from 'react'
import UserType from '@/types/user.types';
import { pathMenuAccount } from '@/utils/pathAccount';

async function LayOutAccount({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await connectToDB();

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
    const userDetails : UserType = await UserModel.findOne({ email: verifiedUser.email }, "-password -__v -updatedAt");


    return (
        <div className='bg-admin-black min-h-screen text-white'>
            <HeaderPannel 
            isAdminPannel = {false}
            username={userDetails.username}
            
            />
            <SideBarPannel pathMenu={pathMenuAccount} />
            <div className="md:mr-16 lg:mr-40 xl:mr-64 mt-12">
                <div className="flex gap-2 h-full w-full py-14 p-4 md:p-[74px]">
                    {children}
                </div>
            </div>
        </div>

    )
}

export default LayOutAccount