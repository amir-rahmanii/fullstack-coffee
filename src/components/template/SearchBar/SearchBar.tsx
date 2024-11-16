"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { CiSearch } from "react-icons/ci"
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";




type SearchBarProps = {
    side: "top" | "right" | "bottom" | "left",
    children: React.ReactNode
}



export function SearchBar({ side, children }: SearchBarProps) {

    const [searchValue, setSearchValue] = useState("");
    const [isShowClearSearch, setIsShowClearSearch] = useState(false);

    useEffect(() => {
        if (searchValue.trim()) {
            setIsShowClearSearch(true); // If the search has a valid value, display the icon clear search
        }
    }, [searchValue])


    const clearSearchHandler = () => {
        setIsShowClearSearch(false)  //hide icon clear search
        setSearchValue("") //clear search value
    }

    return (
        <div className="grid grid-cols-1">
            <Sheet key={side} >
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>
                <SheetContent side={side}>
                    <SheetTitle>
                        <div className="pt-[140px] pb-5 container">
                            <div className="h-12 flex rounded-lg items-center bg-background p-2.5">
                                <button className="border border-gray-300 rounded-md flex items-center p-2">
                                    <CiSearch className='text-veronese text-xl' />
                                </button>
                                <Input
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="font-light border-none rounded-xl"
                                    type="text"
                                    placeholder="جستجو در بن مانو" />
                                {isShowClearSearch && (
                                    <button onClick={clearSearchHandler}>
                                        <IoClose className="text-red-500 text-2xl" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </SheetTitle>
                    <div className="container">
                        <p className="text-darknes text-center">برای جستجو، نام کالا یا دسته بندی را وارد کنید...</p>
                        <div className="flex justify-center items-center mt-5">
                            <Image className="opacity-30" width={130} height={139} src={"/images/search.webp"} alt="search img" />
                        </div>

                        {/* search popular */}
                        <div className="mt-5">
                            <p>جستجوهای پرطرفدار:</p>
                            {/* key search */}
                            <div className="flex flex-wrap gap-3 mt-5">
                                <Link href='/noreska'>
                                    <Button variant="searchPopular">
                                        نورسکا
                                    </Button>
                                </Link>
                                <Link href='/noreska'>
                                    <Button variant="searchPopular">
                                        قهوه ترک
                                    </Button>
                                </Link>
                                <Link href='/noreska'>
                                    <Button variant="searchPopular">
                                        قهوه فرانسه
                                    </Button>
                                </Link>
                                <Link href='/noreska'>
                                    <Button variant="searchPopular">
                                        قهوه اسپرسو
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
