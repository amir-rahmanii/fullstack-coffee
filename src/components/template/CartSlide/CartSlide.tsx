"use client"


import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { IoClose } from "react-icons/io5";
import { Button } from '@/components/ui/button';


type SheetSideProps = {
    side: "top" | "right" | "bottom" | "left",
    children: React.ReactNode
}



export function CartSlide({ side, children }: SheetSideProps) {
    return (
        <div className="grid grid-cols-1">
            <Sheet key={side}>
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>
                <SheetContent side={side}>
                    <SheetHeader className="w-full pt-10">
                        <SheetTitle>
                            <div className='text-background text-center py-4 rounded-lg w-full bg-veronese'>
                                سبد خرید
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <div className='mt-5'>
                        <p className='text-red-500 text-center'>سبد خرید شما خالی است.</p>
                    </div>

                    {/* basket */}
                    <div className='border-b border-lightnes max-h-[400px] overflow-y-auto'>
                        {/* product */}
                        <div className='bg-lightnes relative flex gap-[30px] overflow-hidden p-2.5 mb-2.5 rounded-2xl'>
                            {/* image */}
                            <Image className='border border-veronese rounded-xl' width="70" height="70" src="/images/products/sobar-main.webp" alt='sobar-main' />
                            <div className='flex flex-col gap-2'>
                                {/* title product */}
                                <span className='text-[15px] text-darknes'>کاپوچینو</span>
                                {/* price  */}
                                <div className='px-2.5 py-1 border border-[#d9d9d9] rounded-xl'>
                                    <span className='text-darknes text-[15px]'>1 * 200,000 تومان</span>
                                </div>
                            </div>
                            {/* delete product */}
                            <button className='bg-[#FCEBEB] absolute left-0 top-0 p-1.5 rounded-br-lg'>
                                <IoClose className='text-red-500 text-xl' />
                            </button>
                        </div>
                       
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                        </SheetClose>
                    </SheetFooter>
                    <div className='flex flex-col items-center justify-center gap-[15px] mt-[15px]'>
                        <div className='flex justify-center gap-2'>
                            <span className='text-[#aaaaaa]'>مبلغ قابل پرداخت :</span>
                            <span className='text-veronese text-xl'>313,290 تومان</span>
                        </div>
                        <Button size="default" variant="default">
                            مشاهده سبد خرید
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default CartSlide