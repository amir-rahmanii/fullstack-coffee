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
import CartProduct from '@/components/modules/Product/CartProduct/CartProduct';
import { useBasketStore } from '@/store/useBasket';
import Link from 'next/link';

type SheetSideProps = {
    side: "top" | "right" | "bottom" | "left",
    children: React.ReactNode
}



export function CartSlide({ side, children }: SheetSideProps) {


    const { basket, removeFromBasket, totalPrice } = useBasketStore();


    return (
        <div className="grid grid-cols-1 z-50">
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
                    {basket.length ? (
                        <div className='border-b border-lightnes mt-5 h-calc-vh overflow-y-auto'>
                            {/* product */}
                            {basket.map(data => (
                                <CartProduct removeFromBasket={removeFromBasket} key={data.id} {...data} />
                            ))}
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <p className='text-red-500 text-center'>سبد خرید شما خالی است.</p>
                        </div>
                    )}

                    {/* basket */}

                    <SheetFooter>
                        <SheetClose asChild>
                        </SheetClose>
                        {basket.length ? (
                            <div className='flex flex-col items-center justify-center gap-[15px] mt-[15px]'>
                                <div className='flex justify-center gap-2'>
                                    <span className='text-[#aaaaaa]'>مبلغ قابل پرداخت :</span>
                                    <span className='text-veronese text-xl'>{totalPrice.toLocaleString()} تومان</span>
                                </div>
                                <SheetClose asChild>
                                    <Link href="/cart" className="link-default">
                                        مشاهده سبد خرید
                                    </Link>
                                </SheetClose>
                            </div>
                        ) : ""}
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default CartSlide