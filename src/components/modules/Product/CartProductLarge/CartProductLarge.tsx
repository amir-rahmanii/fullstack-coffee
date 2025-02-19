"use client"

import { BasketItem } from '@/types/basket.types'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa6'


type CartProductLargeType = {
    product: BasketItem,
    addToBasket: (data: BasketItem) => void;
    removeFromBasket: (title: string, itemId: string) => void;
    minusCountFromProduct : (id : string) => void;
}

function CartProductLarge({ product, addToBasket , removeFromBasket , minusCountFromProduct }: CartProductLargeType) {

    const [counterProduct, setCounterProduct] = useState(product.count);

    const minusCountHandler = () => {
        if (counterProduct > 1) {
            setCounterProduct(prev => prev - 1);
            minusCountFromProduct(product.id)
        }
    }

    const plusCountHandler = () => {
        setCounterProduct(prev => prev + 1);
        addToBasket({ ...product, count: 1 })
    }


    const removeProductFromBasket = () => {
        removeFromBasket(product.title , product.id)
    }



    return (
        <div className='border border-[#E6E6E6] flex justify-between p-5'>
            <div className='flex justify-between gap-4'>
                <Image width={220} height={639} src={product.image} alt={product.id} />
                <div className='flex flex-col justify-between'>
                    <p className='text-base/8 text-darknes transition-all hover:text-veronese'>{product.title}</p>
                    {/* add to basket */}
                    <div className='flex justify-between items-center gap-4 mt-3'>
                        <div className='p-2 flex justify-between border gap-3 border-[#D9D9D9] rounded-lg '>
                            <button onClick={plusCountHandler} className='bg-[#D9D9D9]  p-2 rounded-full  flex items-center justify-center'>
                                <FaPlus className='text-background text-sm' />
                            </button>
                            <span className='text-veronese text-xl'>{counterProduct}</span>
                            <button onClick={minusCountHandler} className='bg-[#D9D9D9]  p-2 rounded-full  flex items-center justify-center'>
                                <FaMinus className='text-background text-sm' />
                            </button>
                        </div>
                        {/* delete product */}
                        <button onClick={removeProductFromBasket} className='text-red-500'>
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <p className='text-veronese text-lg/9'>{product.priceWithDiscount.toLocaleString()} تومان</p>
            </div>
        </div>
    )
}

export default CartProductLarge