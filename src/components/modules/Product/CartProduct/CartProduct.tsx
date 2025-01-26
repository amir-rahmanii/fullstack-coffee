import { BasketItem } from '@/types/product.types'
import Image from 'next/image'
import React from 'react'
import { IoClose } from 'react-icons/io5'

function CartProduct(props : BasketItem) {
    return (
        <div className='bg-lightnes relative flex gap-[30px] overflow-hidden p-2.5 mb-2.5 rounded-2xl'>
            {/* image */}
            <Image className='border border-veronese rounded-xl' width="70" height="70" src={props.image} alt='sobar-main' />
            <div className='flex flex-col gap-2'>
                {/* title product */}
                <span className='text-[15px] text-darknes'>{props.title}</span>
                {/* price  */}
                <div className='px-2.5 py-1 border border-[#d9d9d9] rounded-xl'>
                    <span className='text-darknes text-[15px]'>{props.count} * {props.priceWithDiscount.toLocaleString()} تومان</span>
                </div>
            </div>
            {/* delete product */}
            <button className='bg-[#FCEBEB] absolute left-0 top-0 p-1.5 rounded-br-lg'>
                <IoClose className='text-red-500 text-xl' />
            </button>
        </div>
    )
}

export default CartProduct