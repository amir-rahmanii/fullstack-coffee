"use client";

import { BreadcrumbSection } from '@/components/modules/Breadcrumb/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import signUpSchema from '@/validation/register';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import usePostOrPut from '@/hook/usePostOrPut';
import LoadingSpinner from '@/components/modules/LoadingBox/LoadingSpinner';


function SignUp() {
    const [isChangeTypePassword, setIsChangeTypePassword] = useState(true);

    // Hook for POST request to sign up
    const { mutate, isMutating } = usePostOrPut(
        '/api/auth/signup', //  API
        'POST', // method
        'user created successfully!',// success MSG
        () => {
            reset();
        }
    );

    // React Hook Form
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema)
    });


    return (
        <>
            <BreadcrumbSection BreadcrumbPageTitle="ثبت نام کاربر" />
            <div className='flex flex-col justify-center items-center mt-8'>
                <div className='border border-[#D9D9D9] py-[30px] px-[20px] md:px-[50px] rounded-3xl '>
                    <p className='font-DanaMedium text-[#000000] text-lg text-center'>ورود به سایت</p>
                    <form onSubmit={e => e.preventDefault()} className='mt-6'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-3'>
                                <div className="flex flex-col">
                                    <label htmlFor="username">نام کاربری</label>
                                    <Input
                                        required
                                        {...register("username")}
                                        className='mt-2 min-w-[265px]'
                                        dir='ltr'
                                        type="text"
                                        id="username"
                                        placeholder="Amirreza" />
                                </div>
                                {errors.username && <p className='text-red-500 text-sm '> {errors.username.message}</p>}
                                <div className="flex flex-col">
                                    <label htmlFor="email">ایمیل</label>
                                    <Input
                                        required
                                        {...register("email")}
                                        className='mt-2 min-w-[265px]'
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
                                            className='mt-2 min-w-[265px] border-none'
                                            dir='ltr'
                                            type={isChangeTypePassword ? "password" : "text"}
                                            id="password"
                                            placeholder="password" />
                                    </div>
                                </div>
                                {errors.password && <p className='text-red-500 text-sm'> {errors.password.message}</p>}
                            </div>
                        </div>
                        <div className='flex justify-center mt-8'>
                            <Button
                                disabled={isMutating}
                                onClick={handleSubmit((data) => {
                                    mutate(data);
                                })}
                                type="submit"
                                className='rounded-md px-10' variant="default" size="default">
                                {isMutating ? (
                                    <LoadingSpinner />
                                ) : (
                                    <>
                                        ثبت نام
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                    <div className='mt-12'>
                        <p className='text-sm text-center text-[#808080]'>
                            قبلا ثبت نام کرده اید ؟ <Link href='/auth/login' className='underline text-[#000000] font-DanaDemiBold'>ورود</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
