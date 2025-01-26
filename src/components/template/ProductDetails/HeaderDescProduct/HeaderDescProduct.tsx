import React from 'react'

function HeaderDescProduct({
    title,
    catgoryName,
    weight
}: {
    title: string,
    catgoryName: string,
    weight: number
}) {
    return (
        <div className='text-darknes w-full'>
            <h2 className='text-2xl border-b-2 border-[#D9D9D9] pb-3'>{title}</h2>
            <div className='mt-4'>
                <p>دسته بندی : {catgoryName}</p>
            </div>
            <div className='grid grid-cols-2 text-sm gap-8 mt-8'>
                <p className='bg-lightnes rounded-xl py-3'>گونه :
                    50% عربیکا و 50% ربوستا</p>
                <p className='bg-lightnes rounded-xl py-3'>خاستگاه :
                    آفریقا، آمریکای مرکزی  </p>
                <p className='bg-lightnes rounded-xl py-3'>
                    مواد تشکیل‌دهنده :
                    دانه اسپرسو
                </p>
                <p className='bg-lightnes rounded-xl py-3'>
                    وزن :
                    <span className='px-1'>
                        {weight}
                    </span>
                    گرم
                </p>
            </div>
        </div>
    )
}

export default HeaderDescProduct