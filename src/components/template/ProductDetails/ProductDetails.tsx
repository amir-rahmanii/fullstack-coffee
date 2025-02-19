import React from 'react'
import ProductTypes from '@/types/product.types'
import SideBarToBasketSticky from '@/components/parts/SideBarToBasketSticky/SideBarToBasketSticky'
import SliderProductGallary from './SliderProductGallary/SliderProductGallary'
import HeaderDescProduct from './HeaderDescProduct/HeaderDescProduct'
import Image from 'next/image'



type ProductDetailsProps = {
    product: ProductTypes
}

function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <div className='mt-10 mb-36 grid gap-4 md:grid-cols-7 container'>
            <div className='md:col-span-4 lg:col-span-5'>
                <div className='flex flex-col lg:flex-row items-center md:items-start gap-6'>
                    <div className='max-w-[300px] md:max-w-[427px]'>
                        <SliderProductGallary images={product.images} />
                    </div>
                    <HeaderDescProduct
                        title={product.title}
                        catgoryName={product.category.title}
                        weight={product.weight}
                    />
                </div>
                <div className='flex flex-col lg:flex-row lg:items-center gap-6 mt-10 bg-lightnes rounded-xl p-3 text-darknes'>
                    <Image alt='1' className='max-w-[320px] max-h-[320px]' width={1024} height={1024} src={product.images[0]} />
                    <div>
                        <h3 className='text-2xl'>معرفی محصول</h3>
                        <p className='mt-2'>{product.description}</p>
                    </div>
                </div>
            </div>
            <div className='md:col-span-3 lg:col-span-2'>
                <SideBarToBasketSticky
                    stock={product.stock}
                    price={product.price}
                    priceWithDiscount={product.priceWithDiscount}
                    id={product._id}
                    title={product.title}
                    image={product.images[0]}
                />
            </div>
        </div>
    )
}

export default ProductDetails