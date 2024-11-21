import Image from 'next/image'
import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'

function MagazineBox() {
  return (
    <div className='rounded-xl cursor-pointer group hover:border-goldnes transition-all duration-500 border border-lightnes overflow-hidden w-full lg:w-[404px] h-max'>
      {/* img */}
      <div className='relative'>
        <Image className='rounded-xl bg-veronese' width={880} height={203} alt='sperso' src="/images/magazine/esperso.webp" />
        <div className='absolute opacity-0 group-hover:opacity-50 transition-all duration-500 inset-0  bg-veronese'>
        </div>
        {/* btn */}
        <button className='bg-veronese opacity-0 group-hover:opacity-100 transition-all duration-500 absolute left-8 -translate-y-1/2 rounded-full p-2 flex justify-center items-center'>
          <MdArrowBackIosNew className='text-background text-xl' />
        </button>
      </div>

      {/* date */}
      <div className='flex justify-center -translate-y-1/2'>
        <button className='text-darknes  text-sm bg-[#FAFAFA] shadow-sm border border-[#D9D9D9] rounded-3xl py-[6px] px-[30px] hover:text-veronese transition-all duration-500'>18 آبان 1363</button>
      </div>
      {/* title */}
      <div className='px-2'>
        <p className='line-clamp-1 mb-[15px] group-hover:text-veronese duration-500 transition-all'>فرق قهوه ساز و اسپرسو چیست ؟</p>
        <p className='line-clamp-2 text-darknes mb-[15px]'>
          حتی اگر آشنایی کمی ‌با دنیای قهوه داشته باشید، باز هم به احتمال زیاد اسم دانه‌های قهوه عربیکا و روبوستا را شنیده باشید. قهوه چیست و چرا انواع مختلفی از دانه‌های آن وجود دارد؟ اما اگر کمی‌ بیشتر وار...
        </p>
      </div>
    </div>
  )
}

export default MagazineBox