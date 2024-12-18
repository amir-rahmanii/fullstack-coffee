import LoadingSpinner from '@/components/modules/LoadingBox/LoadingSpinner';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import usePostOrPut from '@/hook/usePostOrPut';
import categoryProductSchema from '@/validation/categoryProduct';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

function AddCategoryProductAdmin() {

    const { mutate : mutateAllCategoryProduct } = useSWRConfig();
      const searchParams = useSearchParams();

    // Hook for POST request to sign up
    const { mutate, isMutating } = usePostOrPut(
        '/api/category-product/create', //  API
        'POST', // method
        'category product created successfully!',// success MSG
        () => {
            reset();
            mutateAllCategoryProduct(`/api/category-product/getAll?search=${searchParams?.get("search") || ""}`)
        }
    );


    // hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(categoryProductSchema)
    });

    const onSubmit = async ({ title }: { title: string }) => {
        mutate({ title })
        // اینجا می‌توانید داده‌ها را ارسال کنید
    };



    return (
        <div className="bg-admin-navy rounded mb-8 p-6">
            <h3 className="text-xl mb-6 font-danaBold">اضافه کردن دسته بندی محصول</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
                {/* title */}
                <div className="flex flex-col">
                    <label htmlFor="title">عنوان</label>
                    <Input
                        {...register("title")}
                        required
                        className='mt-2 min-w-[265px]'
                        dir='rtl'
                        type="text"
                        id="title"
                        placeholder="عنوان دسته بندی محصول" />
                    {errors.title && <span className='text-red-500 text-sm'> {errors.title.message}</span>}
                </div>

                <Button disabled={isMutating} type='submit' variant={"default"} size={"default"}>
                    {isMutating ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            تایید و اضافه کردن دسته بندی محصول
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}

export default AddCategoryProductAdmin