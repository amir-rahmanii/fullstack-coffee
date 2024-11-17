"use client";
import { greenSperso, weight } from '@/components/icons/Svg/Svg'
import Image from 'next/image'
import React, { useState } from 'react'

function CoffeeCategories() {

    const [isActiveCategory, setIsActiveCategory] = useState(false)

    const changeCategoryHandler = () => {
        setIsActiveCategory(true)
    }

    return (
        <div className='py-[80px] lg:py-[100px] container xl:flex'>
            {/* images */}
            <div className='hidden lg:block'>
                <Image width="533" height="623" src="/images/categories/coffee-bean-main-page.jpg" alt='coffee-bean-main-page' />
            </div>

            {/* products */}
            <div>
                {/* categories */}
                {/* name */}
                <div className='flex flex-col items-center'>
                    <p className='text-darknes'>محصولات خانگی</p>
                    <p className='text-[18px]/[34px] font-danaMedium lg:text-2xl/[48px]'>دانه قهوه اسپرسو</p>
                </div>
                {/* icons */}
                <div className='py-10 flex gap-3 justify-center'>
                    <button onClick={changeCategoryHandler} className='w-14 h-14 p-1 border border-lightnes hover:border-veronese transition-all duration-500 cursor-pointer rounded-full flex justify-center items-center'>
                        <div className={`${isActiveCategory ? "bg-veronese" : "bg-lightnes"} w-full h-full p-3  rounded-full flex justify-center items-center`}>
                            <div className={`w-full h-full ${isActiveCategory ? "text-background" : "text-veronese"}`}>
                                {greenSperso}
                            </div>
                        </div>
                    </button>
                    <button onClick={changeCategoryHandler} className='w-14 h-14 p-1 border border-lightnes hover:border-veronese transition-all duration-500 cursor-pointer rounded-full flex justify-center items-center'>
                        <div className={`${isActiveCategory ? "bg-veronese" : "bg-lightnes"} w-full h-full p-3  rounded-full flex justify-center items-center`}>
                            <div className={`w-full h-full ${isActiveCategory ? "text-background" : "text-veronese"}`}>
                                {greenSperso}
                            </div>
                        </div>
                    </button>
                    <button onClick={changeCategoryHandler} className='w-14 h-14 p-1 border border-lightnes hover:border-veronese transition-all duration-500 cursor-pointer rounded-full flex justify-center items-center'>
                        <div className={`${isActiveCategory ? "bg-veronese" : "bg-lightnes"} w-full h-full p-3  rounded-full flex justify-center items-center`}>
                            <div className={`w-full h-full ${isActiveCategory ? "text-background" : "text-veronese"}`}>
                                {greenSperso}
                            </div>
                        </div>
                    </button>
                </div>
                {/* product */}
                <div className='border cursor-pointer h-[409px] group transition-all duration-500 border-[#D9D9D9] rounded-2xl overflow-hidden'>
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
                    {/* body */}
                    <div className='px-5'>
                        {/* icon */}
                        <div className='flex items-center gap-1 py-[10px]'>
                            <div className='w-3 h-4 f'>
                                {weight}
                            </div>
                            <p className='text-darknes text-xs'>250 گرم</p>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CoffeeCategories