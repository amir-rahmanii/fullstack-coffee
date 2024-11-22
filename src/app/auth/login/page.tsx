"use client";

import { bonManoIcon } from '@/components/icons/Svg/Svg';
import BottomBar from '@/components/layouts/BottomBar/BottomBar';
import Footer from '@/components/layouts/Footer/Footer';
import Header from '@/components/layouts/Header/Header';
import { BreadcrumbSection } from '@/components/modules/Breadcrumb/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '@/validation/login';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Login() {

    const [isChangeTypePassword, setIsChangeTypePassword] = useState(true);

    // hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema)
    });


    return (
        <>
            <Header />
            <BottomBar />
            <BreadcrumbSection BreadcrumbPageTitle="ورود" />
            {/* page */}
            <div className='flex flex-col justify-center items-center mt-8'>
                <div className='border border-[#D9D9D9] py-[30px] px-[20px] md:px-[50px] rounded-3xl '>
                    <p className='font-DanaMedium text-[#000000] text-lg text-center'>ورود به سایت</p>
                    <form onSubmit={e => e.preventDefault()}
                        className='mt-6'>
                        <div className='flex flex-col'>
                            {/* Phone */}
                            <div className='flex flex-col gap-3'>
                                <div className="flex flex-col">
                                    <label htmlFor="email">ایمیل</label>
                                    <Input
                                        required
                                        {...register("email")}
                                        className='mt-2 min-w-[300px]'
                                        dir='ltr'
                                        type="email"
                                        id="email"
                                        placeholder="example@gmail.com" />
                                </div>
                                {errors.email && <p className='text-red-500 text-sm'> {errors.email.message}</p>}
                                <div className="flex flex-col">
                                    <label htmlFor="password">رمز عبور</label>
                                    <div className='flex items-center gap-1 border overflow-hidden rounded-lg h-10'>
                                        <button onClick={() => setIsChangeTypePassword(prev => !prev)}>
                                            {isChangeTypePassword ? <FaRegEyeSlash className='text-xl mr-2' /> : <FaRegEye className='text-xl mr-2' />}

                                        </button>
                                        <Input
                                            required
                                            {...register("password")}
                                            className='mt-2 min-w-[300px] border-none'
                                            dir='ltr'
                                            type={isChangeTypePassword ? "password" : "text"}
                                            id="password"
                                            placeholder="password" />
                                    </div>
                                </div>
                                {errors.password && <p className='text-red-500 text-sm'> {errors.password.message}</p>}
                            </div>
                        </div>
                        {/* login btn */}
                        <div className='flex justify-center mt-8'>
                            <Button onClick={handleSubmit((data) => {
                                console.log(data);
                            })} className='rounded-md px-10' variant="default" size="default">
                                ورود
                            </Button>
                        </div>
                    </form>
                    {/* register */}
                    <div className='mt-12'>
                        <p className='text-sm text-center text-[#808080]'>قبلا ثبت نام نکرده اید ؟ <Link href='/auth/sign-up' className='underline text-[#000000] font-DanaDemiBold'>ثبت نام</Link></p>
                    </div>
                </div>
            </div >
            <Footer />
        </>

    )
}
