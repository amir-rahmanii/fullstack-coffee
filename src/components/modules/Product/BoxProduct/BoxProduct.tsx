"use client";

import { weight } from '@/components/icons/Svg/Svg'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { MdAddShoppingCart } from "react-icons/md";

function BoxProduct() {
    const [counterProduct, setCounterProduct] = useState(0);

    return (
        <div data-aos="fade-up" className='border relative hover:border-goldnes h-max w-max group transition-all duration-500 border-[#D9D9D9] rounded-2xl overflow-hidden'>
            <div className='relative -z-10'>
                {/* main img */}
                <Image
                    className='block opacity-100 group-hover:opacity-0 transition-opacity duration-500'
                    width="247"
                    height="247"
                    src="/images/products/giorno-main-300x300.webp"
                    alt='coffee-bean-main-page'
                />

                {/* hover img */}
                <Image
                    className='absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    width="247"
                    height="247"
                    src="/images/products/giorno-hover-300x300.webp"
                    alt='coffee-bean-main-page'
                />
            </div>
            {/* offer box */}
            <div className='bg-red-500 absolute top-0 left-4 p-1 rounded-b-xl'>
                <p className='text-background'>5%</p>
            </div>
            {/* body */}
            <div className='px-5'>
                {/* icon */}
                <div className='flex items-center gap-1 py-[10px]'>
                    <div className='w-3 h-4 f'>
                        {weight}
                    </div>
                    <p className='text-darknes text-xs'>250 گرم</p>
                </div>
                {/* name product */}
                <Link href="fdjsfd" className='text-sm lg:text-base group-hover:text-veronese'>دانه قهوه اسپورسو جونیورو</Link>

                {/* price and counter and go to basket */}
                <div className='py-5 flex justify-between items-center'>
                    <div>
                        {/* price offer */}
                        <div className='flex text-sm items-center line-through gap-1 text-darknes'>
                            <span>195,565 </span>
                            <span>تومان</span>
                        </div>
                        {/* price */}
                        <div className='flex items-center gap-1 text-darknes'>
                            <span>195,565 </span>
                            <span>تومان</span>
                        </div>
                    </div>
                    {/* add to shoping cart */}
                    {/* <button className='border cursor-pointer border-veronese p-3 rounded-full'>
            <MdAddShoppingCart className='text-veronese text-xl' />
        </button> */}

                    {/* counter */}
                    <div className='flex flex-col items-center'>
                        <button onClick={() => setCounterProduct(prev => prev + 1)} className='bg-[#D9D9D9]  p-1 rounded-full  flex items-center justify-center'>
                            <FaPlus className='text-background text-sm' />
                        </button>
                        <span className='text-veronese text-[15px]'>{counterProduct}</span>
                        <button onClick={() => setCounterProduct(prev => prev - 1)} className='bg-[#D9D9D9]  p-1 rounded-full  flex items-center justify-center'>
                            <FaMinus className='text-background text-sm' />
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default BoxProduct