"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import productSchema from '@/validation/Product';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React, { ChangeEvent, DragEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CategoryProductType from '@/types/categoryProduct.types';
import useSWR, { useSWRConfig } from 'swr';
import usePostOrPut from '@/hook/usePostOrPut';
import AddProductTypes from '@/types/addProduct.types';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSearchParams } from 'next/navigation';

function AddProductAdmin() {

    const [imagesPreview, setImagesPreview] = useState<(string | null)[]>([null, null]);
    const [imagesFile, setImagesFile] = useState<File[]>([]);// حداکثر دو تصویر
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null); // برای مدیریت درگ
    const [isStock, setIsStock] = useState(true);
    const { data: categories } = useSWR<CategoryProductType[]>(
        `/api/category-product/getAll`
    );
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const { mutate } = useSWRConfig();

    const { mutate : mutateAddProduct } = usePostOrPut(
        '/api/product/create', //  API
        'POST', // method
        'product created successfully!',// success MSG
        () => {
            setImagesFile([]);
            setImagesPreview([null, null]);
            setSelectedCategory(null)
            reset();
            mutate(`/api/product/getAll?search=${searchParams?.get("search") || ""}&sort=${searchParams?.get("sort") || "latest"}&stock=${searchParams?.get("stock") || "0"}`)
        },
        true
    );



    const handleImageUpload = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const validFiles = Array.from(files).filter((file) =>
            file.type.startsWith("image/")
        );

        // به‌روزرسانی تصاویر پیش‌نمایش و فایل‌ها
        setImagesPreview((prev) => {
            const nonNullImages = prev.filter((img) => img !== null); // تصاویر موجود
            if (nonNullImages.length >= 2) {
                return prev;
            }

            const updatedImages = [...prev];
            validFiles.forEach((file) => {
                const index = updatedImages.findIndex((img) => img === null); // خانه خالی
                if (index !== -1) {
                    updatedImages[index] = URL.createObjectURL(file); // به‌روزرسانی پیش‌نمایش
                }
            });

            return updatedImages.slice(0, 2); // اطمینان از داشتن حداکثر ۲ تصویر
        });

        // به‌روزرسانی فایل‌ها
        setImagesFile((prev) => {
            const updatedFiles = [...prev];
            validFiles.forEach((file) => {
                if (updatedFiles.length < 2) {
                    updatedFiles.push(file); // اضافه کردن فایل به آرایه
                }
            });

            return updatedFiles.slice(0, 2); // اطمینان از داشتن حداکثر ۲ فایل
        });
    };



    const removeImage = (index: number) => {
        setImagesPreview((prev) => {
            const updatedImages = [...prev];
            if (updatedImages[index]) URL.revokeObjectURL(updatedImages[index]!); // پاکسازی URL
            updatedImages[index] = null; // حذف پیش‌نمایش
            return updatedImages;
        });

        setImagesFile((prev) => {
            const updatedFiles = [...prev];
            updatedFiles.splice(index, 1); // حذف فایل
            return updatedFiles;
        });
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDropInside = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) return;

        setImagesPreview((prev) => {
            const updatedImages = [...prev];
            // جابجایی تصاویر
            updatedImages[draggedIndex] = updatedImages[index]; // جابجایی تصویر
            updatedImages[index] = null; // تصویر در مقصد خالی می‌شود
            return updatedImages;
        });

        setDraggedIndex(null); // ریست درگ
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // برای اجازه دادن به دراپ
    };

    const handleExternalDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض مرورگر
        handleImageUpload(e.dataTransfer.files); // آپلود فایل‌ها
    };

    // hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(productSchema)
    });


    const onSubmit = async (data: AddProductTypes) => {
        if (!selectedCategory) {
            alert("لطفاً یک دسته‌بندی انتخاب کنید");
            return;
        }
        if (imagesFile.length < 2) {
            alert("لطفاً دو تصویر انتخاب کنید");
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("stock", isStock ? "1" : "0");
        formData.append("price", data.price.toString());
        formData.append("discount", data.discount.toString());
        formData.append("description", data.description);
        formData.append("weight", data.weight.toString());
        formData.append("category", selectedCategory);

        imagesFile.forEach((file) => formData.append("images", file));

        mutateAddProduct(formData); // ارسال درخواست
    };


    return (
        <div className="bg-admin-navy rounded mb-8 p-6">
            <h3 className="text-xl mb-6 font-danaBold">اضافه کردن محصول</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
                {/* title and category */}
                <div className='grid grid-cols-2 gap-6'>
                    <div className="flex flex-col">
                        <label htmlFor="title">عنوان</label>
                        <Input
                            {...register("title")}
                            required
                            className='mt-2 min-w-[265px]'
                            dir='rtl'
                            type="text"
                            id="title"
                            placeholder="عنوان محصول" />
                        {errors.title && <span className='text-red-500 text-sm'> {errors.title.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label>دسته بندی</label>
                        <Select onValueChange={(value) => setSelectedCategory(value)}>
                            <SelectTrigger className="w-full h-10 mt-2 text-foreground">
                                <SelectValue placeholder="دسته بندی را انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categories?.map(category => (
                                        <SelectItem key={category._id} value={category._id}>{category.title}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price">قیمت</label>
                    <Input
                        {...register("price")}
                        required
                        className='mt-2 min-w-[265px]'
                        dir='rtl'
                        type="text"
                        id="price"
                        placeholder="قیمت محصول" />
                    {errors.price && <span className='text-red-500 text-sm'> {errors.price.message}</span>}
                </div>

                {/* stock and discount  */}
                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col justify-end items-center'>
                        <div className="flex items-center px-4 gap-6 border h-12 rounded-md border-neutral-200">
                            <Label htmlFor="stock">کالا موجود است ؟</Label>
                            <Switch
                                defaultChecked={isStock}
                                onCheckedChange={(checked) => setIsStock(checked)}
                                dir='ltr'
                                id="stock"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="discount">درصد تخفیف</label>
                        <Input
                            {...register("discount")}
                            className='mt-2 min-w-[265px]'
                            dir='rtl'
                            type="text"
                            id="discount"
                            placeholder="درصد تخفیف" />
                        {errors.discount && <span className='text-red-500 text-sm'> {errors.discount.message}</span>}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="weight">وزن</label>
                    <Input
                        {...register("weight")}
                        required
                        className='mt-2 min-w-[265px]'
                        dir='rtl'
                        type="text"
                        id="weight"
                        placeholder="وزن محصول" />
                    {errors.weight && <span className='text-red-500 text-sm'> {errors.weight.message}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">توضیحات</label>
                    <textarea
                        {...register("description")}
                        required
                        className='mt-2 h-28 w-full rounded-lg p-2 text-foreground'
                        dir='rtl'
                        id="description"
                        placeholder="توضیحات محصول" />
                    {errors.description && <span className='text-red-500 text-sm'> {errors.description.message}</span>}
                </div>

                <div
                    className="flex flex-col border border-gray-300 rounded-lg p-3"
                    onDragOver={(e) => e.preventDefault()} // جلوگیری از رفتار پیش‌فرض در ناحیه بیرونی
                    onDrop={handleExternalDrop} // مدیریت دراپ خارجی
                >
                    <label
                        htmlFor="pictures"
                        className="block mb-2 text-lg font-medium text-gray-700"
                    >
                        آپلود تصاویر (حداکثر 2 تصویر)
                    </label>
                    <Input
                        id="pictures"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="block w-full mb-4 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    />
                    <div className="flex gap-4">
                        {imagesPreview.map((src, index) => (
                            <div
                                key={index}
                                className="relative w-32 h-32 border border-dashed border-gray-300 flex items-center justify-center rounded"
                                draggable={!!src} // فقط اگر تصویر وجود داشته باشد، امکان درگ وجود دارد
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDropInside(index)}
                            >
                                {src ? (
                                    <div>
                                        <Image
                                            width={40}
                                            height={40}
                                            src={src}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover rounded"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white text-sm px-1 rounded"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-gray-400">تصویر {index + 1}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        فایل‌های خود را اینجا بکشید و رها کنید یا از دکمه بالا استفاده کنید.
                    </p>

                </div>

                <Button type='submit' variant={"default"} size={"default"}>
                    تایید و اضافه کردن محصول
                </Button>
            </form>
        </div>
    );
}

export default AddProductAdmin;
