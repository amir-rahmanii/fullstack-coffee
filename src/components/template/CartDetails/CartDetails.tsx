"use client";
import CartProductLarge from '@/components/modules/Product/CartProductLarge/CartProductLarge';
import { useBasketStore } from '@/store/useBasket';
import Link from 'next/link'
import React from 'react'

function CartDetails() {

    const { basket, removeFromBasket, totalPrice , addToBasket , minusCountFromProduct} = useBasketStore();

    return (
        <div className='mt-10 mb-36 grid gap-4 md:grid-cols-8 container'>
            <div className='col-span-5'>
                <div className='flex flex-col gap-3'>
                    <p className='text-darknes'>سبد خرید شما</p>
                    <p className='text-[#707070]'>{basket.length} کالا</p>
                </div>
                <div className='flex flex-col gap-4 mt-3'>
                    {basket.length ? (
                        basket.map(product => (
                            <CartProductLarge 
                            key={product.id}
                             product={product}
                             removeFromBasket={removeFromBasket}
                             addToBasket={addToBasket}
                             minusCountFromProduct={minusCountFromProduct}
                             />
                        ))
                    ) : (
                        <p className='text-darknes text-xl'>لطفا اول محصولی به سبد اضافه کنید.</p>
                    )}
                </div>
            </div>
            <div className='col-span-3 flex flex-col'>
                {basket.length ? (
                    <div className='bg-[#00987912] text-darknes p-[15px] rounded-xl sticky top-24'>
                        <div className='mt-2.5 border-b border-[#DEDEDE] flex justify-between'>
                            <p>قیمت کل</p>
                            <p>{totalPrice.toLocaleString()} تومان</p>
                        </div>
                        <div className='w-full mt-5'>
                            <Link href="/checkout" className='link-default block text-center w-full'>
                                اقدام به پرداخت
                            </Link>
                        </div>
                    </div>
                ) : ""}
            </div>
        </div>
    )
}

export default CartDetails