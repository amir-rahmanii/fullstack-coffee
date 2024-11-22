import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import BoxProduct from '@/components/modules/Product/BoxProduct/BoxProduct'
import { PaginationSection } from '@/components/modules/PaginationSection/PaginationSection'


function ProdTagAllProduct() {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <Select>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="مرتب سازی را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="latest">مرتب سازی بر اساس آخرین</SelectItem>
                            <SelectItem value="price-desc">مرتب سازی بر اساس گرانترین</SelectItem>
                            <SelectItem value="price">مرتب سازی بر اساس ارزانترین</SelectItem>
                            <SelectItem value="score">مرتب سازی بر اساس امتیاز</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex items-center px-4 gap-6 border h-12 rounded-md border-neutral-200">
                    <Label htmlFor="airplane-mode">فقط کالاهای موجود</Label>
                    <Switch dir='ltr' id="airplane-mode" />
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 mt-6'>
                <BoxProduct />
                <BoxProduct />
                <BoxProduct />
                <BoxProduct />
                <BoxProduct />
                <BoxProduct />
                <BoxProduct />
            </div>
            <div className='mt-10'>
                <PaginationSection />
            </div>
        </div>
    )
}

export default ProdTagAllProduct