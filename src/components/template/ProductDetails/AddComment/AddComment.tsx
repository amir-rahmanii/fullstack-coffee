"use client";

import LoadingSpinner from '@/components/modules/LoadingBox/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePostOrPut from '@/hook/usePostOrPut';
import commentSchema from '@/validation/comment';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';


type CommentType = {
    description: string,
    email: string,
    name: string,
    productId: string
}

function AddComment({ productId }: { productId: string }) {

    // Hook for POST request to sign up
    const { mutate, isMutating } = usePostOrPut(
        '/api/comment/create', //  API
        'POST', // method
        'comment create successfuly!',// success MSG
        () => {
            reset();
        }
    );

    // hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            productId
        },
        resolver: yupResolver(commentSchema)
    });

    const onSubmit = async (data: CommentType) => {
        mutate(data)
    };

    return (
        <div className='w-full my-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                <div className='flex w-full justify-between gap-4'>
                    <div className="flex flex-col w-full">
                        <label htmlFor="name">نام
                            <span className="required text-red-500">*</span>
                        </label>
                        <Input type='hidden' {...register("productId")} />
                        <Input
                            required
                            {...register("name")}
                            className='mt-2 focus:outline-veronese w-full h-12'
                            dir='rtl'
                            type="text"
                            id="name"
                            placeholder="نام خود را وارد کنید" />
                        {errors.name && <span className='text-red-500 text-sm'> {errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email">ایمیل
                            <span className="required text-red-500">*</span>
                        </label>
                        <Input
                            required
                            {...register("email")}
                            className='mt-2 focus:outline-veronese w-full h-12'
                            dir='rtl'
                            type="email"
                            id="email"
                            placeholder="ایمیل خود را وارد کنید" />
                        {errors.email && <p className='text-red-500 text-sm '> {errors.email.message}</p>}
                    </div>
                </div>
                <div className='w-full'>
                    <div className="flex flex-col w-full">
                        <label htmlFor="description">توضیحات
                            <span className="required text-red-500">*</span>
                        </label>
                        <textarea
                            rows={6}
                            required
                            {...register("description")}
                            className='mt-2 focus:outline-veronese border rounded-lg p-3 border-[#D9D9D0] w-full'
                            dir='rtl'
                            id="description"
                            placeholder="توضیحات خود را وارد کنید" >
                        </textarea>
                        {errors.description && <p className='text-red-500 text-sm '> {errors.description.message}</p>}
                    </div>
                </div>
                <Button type='submit' variant="default" size="default" disabled={isMutating}>
                    {isMutating ? <LoadingSpinner /> : "ارسال نظر"}
                </Button>
            </form>
        </div>
    );
}

export default AddComment;
