import { greenSperso } from '@/components/icons/Svg/Svg'
import React from 'react'

function WhyHorkaIcons() {
  return (
    <div className='flex items-center gap-4'>
    {/* big icon */}
    <div className='bg-veronese w-24 h-24 p-1 rounded-full flex justify-center items-center'>
        <div className='border border-background rounded-full w-full h-full  text-background flex justify-center items-center'>
            <div className='w-8 h-8'>
                {greenSperso}
            </div>
        </div>
    </div>
    {/* title */}
    <div className='flex flex-col gap-2'>
        <p>انتخاب دانه‌ قهوه‌های باکیفیت</p>
        <p className='text-darknes text-sm'>مناسب با ذائقه ایرانی از بهترین مزارع دنیا</p>
    </div>
</div>
  )
}

export default WhyHorkaIcons