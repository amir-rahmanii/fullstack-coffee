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
import { Button } from '@/components/ui/button';
import CartProduct from '@/components/modules/Product/CartProduct/CartProduct';


type SheetSideProps = {
    side: "top" | "right" | "bottom" | "left",
    children: React.ReactNode
}



export function CartSlide({ side, children }: SheetSideProps) {
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
                    <div className='mt-5'>
                        <p className='text-red-500 text-center'>سبد خرید شما خالی است.</p>
                    </div>

                    {/* basket */}
                    <div className='border-b border-lightnes h-calc-vh overflow-y-auto'>
                        {/* product */}
                       <CartProduct />
                      
                     
                       
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