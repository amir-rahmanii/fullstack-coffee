import { DragEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import productSchema from '@/validation/Product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import useSWR, { useSWRConfig } from 'swr';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSearchParams } from 'next/navigation';
import usePostOrPut from '@/hook/usePostOrPut';
import CategoryProductType from '@/types/categoryProduct.types';
import ProductTypes from '@/types/product.types';
import AddProductTypes from '@/types/addProduct.types';
import LoadingSpinner from '@/components/modules/LoadingBox/LoadingSpinner';

type UpdateProductAdminProps = {
    product: ProductTypes;
    setIsOpenUpdateModal: (value: boolean) => void;
};

function UpdateProductAdmin({ product, setIsOpenUpdateModal }: UpdateProductAdminProps) {
    const [imagesPreview, setImagesPreview] = useState<(string | null)[]>([product.images[0], product.images[1]]);
    const [imagesFile, setImagesFile] = useState<File[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [isStock, setIsStock] = useState(product.stock ? true : false);
    const { data: categories } = useSWR<CategoryProductType[]>('/api/category-product/getAll');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(product.category._id);
    const searchParams = useSearchParams();
    const { mutate } = useSWRConfig();


    useEffect(() => {
        const convertUrlsToFiles = async () => {
            const files: File[] = await Promise.all(
                product.images.map(async (url: string) => {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    const filename = url.split('/').pop() || 'image.jpg'; // استخراج نام فایل از URL
                    return new File([blob], filename, { type: blob.type });
                })
            );
            setImagesFile(files);
        };

        convertUrlsToFiles();
    }, [product.images]);


    console.log(product);
    


    const { mutate: mutateUpdateProduct, isMutating } = usePostOrPut(
        `/api/product/update/${product._id}`, // API
        'PUT', // method
        'Product Updated successfully!',
        () => {
            mutate(`/api/product/getAll?search=${searchParams?.get("search") || ""}&sort=${searchParams?.get("sort") || "latest"}&stock=${searchParams?.get("stock") || "0"}`);
            setIsOpenUpdateModal(false); // close modal update
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
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: product.title,
            weight: +product.weight,
            description: product.description,
            discount: +product.discount,
            price: +product.price,
        },
        resolver: yupResolver(productSchema),
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



        mutateUpdateProduct(formData); // ارسال درخواست
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-3'>
            {/* title and category */}

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
                <Select defaultValue={product.category._id} onValueChange={(value) => setSelectedCategory(value)}>
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
                                        width={120}
                                        height={120}
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

            <Button disabled={isMutating} type='submit' variant={"default"} size={"default"}>
                {isMutating ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        تایید و ویرایش کردن محصول
                    </>
                )}
            </Button>
        </form>
    )
}

export default UpdateProductAdmin