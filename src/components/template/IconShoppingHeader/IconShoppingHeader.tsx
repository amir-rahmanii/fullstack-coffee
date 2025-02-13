"use client"

import { useBasketStore } from '@/store/useBasket';
import React from 'react'
import { RiShoppingBag3Line } from 'react-icons/ri'

function IconShoppingHeader() {

    const { basket } = useBasketStore();

    return (
        <div className='relative'>
            <RiShoppingBag3Line className='text-darknes text-lg' />
            <span className='bg-veronese p-1 text-xs w-5 h-5 text-lightnes absolute rounded-full right-2.5 bottom-2.5'>{basket.length}</span>
        </div>
    )
}

export default IconShoppingHeader