"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { MdAddShoppingCart } from 'react-icons/md';
import { FaTruck } from "react-icons/fa6";
import { useBasketStore } from '@/store/useBasket';

function SideBarToBasketSticky(
    { id, price, priceWithDiscount , title , image }
        : {
            id: string,
            price: number,
            priceWithDiscount: number,
            title: string,
            image: string
        }) {

    const [counterProduct, setCounterProduct] = useState(1);
    const { basket, addToBasket, removeFromBasket, totalPrice } = useBasketStore();


    const minusCountHandler = () => {
        if (counterProduct > 1) {
            setCounterProduct(prev => prev - 1)
        }
    }

    const plusCountHandler = () => {
        setCounterProduct(prev => prev + 1)
    }


    const addToBasketHandler = () => {
        addToBasket({
            id,
            title,
            price,
            priceWithDiscount,
            image,
            count: counterProduct
        })
    }

    return (
        <div className="sticky top-24">
            {/* part top */}
            <div className='border border-[#D9D9D9] rounded-xl flex flex-col p-5'>
                {/* price */}
                <p className='line-through text-darknes'>{price.toLocaleString()} تومان</p>
                <p className='text-2xl text-darknes pt-1'>{priceWithDiscount.toLocaleString()} تومان</p>

                {/* add to basket */}
                <div className='p-3 flex justify-between border border-[#D9D9D9] rounded-lg mt-3'>
                    <button onClick={plusCountHandler} className='bg-[#D9D9D9]  p-2 rounded-full  flex items-center justify-center'>
                        <FaPlus className='text-background text-sm' />
                    </button>
                    <span className='text-veronese text-xl'>{counterProduct}</span>
                    <button onClick={minusCountHandler} className='bg-[#D9D9D9]  p-2 rounded-full  flex items-center justify-center'>
                        <FaMinus className='text-background text-sm' />
                    </button>
                </div>

                <Button onClick={addToBasketHandler} className='text-background mt-3 h-12 rounded-xl text-xl' variant={"default"}>
                    <MdAddShoppingCart />
                    افزودن به سبد خرید
                </Button>
            </div>

            {/* part two  */}
            <div className='mt-4 flex flex-col gap-4 p-5'>
                <div className='flex items-center gap-5 text-darknes py-1 bg-[#fafafa]'>
                    <FaTruck className='text-xl' />
                    <p className='text-base'>ارسال رایگان برای خریدهای بالای 700 هزار تومان</p>
                </div>
                <div className='flex items-center gap-5 text-darknes py-1 bg-[#fafafa]'>
                    <FaTruck className='text-xl' />
                    <p className='text-base'>7 روز ضمانت بازگشت کالا</p>
                </div>
                <div className='flex items-center gap-5 text-darknes py-1 bg-[#fafafa]'>
                    <FaTruck className='text-xl' />
                    <p className='text-base'>
                        پشتیبانی سریع</p>
                </div>
            </div>
        </div>
    )
}

export default SideBarToBasketSticky