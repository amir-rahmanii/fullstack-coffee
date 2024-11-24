"use client";

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'
import React, { useState } from 'react'

function SideBarFilter() {
    const [priceRange, setPriceRange] = useState([0, 100]); // Price range state

    const handleSliderChange = (value: number[]) => {
        // Ensure min and max do not cross
        if (value[0] <= value[1]) {
            setPriceRange(value); // Update price range if valid
            console.log(value);

        }
    };


    return (
        <div>
            <div className='p-3 border border-neutral-200 rounded-md '>
                <div className='bg-veronese flex justify-center items-center rounded-md py-4'>
                    <p className='text-background text-center'>بازه قیمت</p>
                </div>
                {/* slider price */}
                <div className='mt-6'>
                    <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={handleSliderChange} // Use onValueChange for shadcn Slider
                    />
                    <div className='flex items-center justify-between mt-2 px-1'>
                        <span className='text-veronese text-xs'>{priceRange[1]}</span>
                        <span className='text-veronese text-xs'>{priceRange[0]}</span>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <Button variant="default" size="default">
                            فیلتر
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBarFilter