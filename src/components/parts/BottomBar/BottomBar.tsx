import React from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { TiHomeOutline } from "react-icons/ti";
import { BiCategoryAlt } from "react-icons/bi";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import CartSlide from '@/components/template/CartSlide/CartSlide';
import Link from 'next/link';

function BottomBar() {
    return (
        <div className='fixed z-40 sm:hidden bottom-0 w-full bg-darknes'>
            <div className='flex items-center justify-evenly'>
                <div className='flex flex-col gap-1 items-center'>
                    <FaRegHeart className='text-background text-2xl' />
                    <span className='text-background text-xs'>علاقه مندی</span>
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    <BiCategoryAlt className='text-background text-2xl' />
                    <span className='text-background text-xs'>دسته بندی ها</span>
                </div>
                <div className='flex flex-col items-center bg-veronese border-2 border-background rounded-full p-3 -translate-y-1/2'>
                    <TiHomeOutline className='text-background text-[30px]' />
                </div>
                <Link href="/auth/login" className='flex flex-col gap-1 items-center'>
                    <FaRegUser className='text-background text-2xl' />
                    <span className='text-background text-xs'>ورود | ثبت نام</span>
                </Link>
                <CartSlide side="left">
                    <button className='flex flex-col gap-1 items-center'>
                        <RiShoppingBag3Line className='text-background text-2xl' />
                        <span className='text-background text-xs'>سبد خرید</span>
                    </button>
                </CartSlide>
            </div>
        </div>
    )
}

export default BottomBar