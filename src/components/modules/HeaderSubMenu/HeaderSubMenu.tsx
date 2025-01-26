import { MenuItem } from '@/utils/pathMenu'
import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from 'react-icons/md'


function HeaderSubMenu(props: MenuItem) {
  return (
    <li className='flex items-center gap-[2px] py-8 group relative hover:cursor-pointer'>
      {/* نام و مسیر منوی اصلی */}
      <Link href={props.path} className='group-hover:text-veronese'>{props.name}</Link>

      {/* اگر منو دارای زیرمنو بود، آیکون نشان داده شود */}
      {props.subMenu && (
        <div className='group-hover:rotate-180 duration-700 transition-all'>
          <MdKeyboardArrowDown className='group-hover:text-veronese' />
        </div>
      )}

      {/* سطح اول منو */}
      {props.subMenu && (
        <ul className='bg-[#FAF3EA] custom-shadow p-8 divide-y-2 w-[260px] divide-[#E6C498] rounded-b-2xl absolute top-[84px] opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-300 ease-in-out'>
          {props.subMenu?.map((dataSub, index) => (
            <li
              key={index}
              className='text-darknes flex justify-between relative group p-4' // اضافه کردن padding بین آیتم‌ها
            >
              <Link
                className='hover:text-goldnes flex items-center gap-2 transition-all duration-500'
                href={dataSub.path}
              >
                {dataSub.img && <div className='w-5 h-5'>{dataSub.img}</div>}
                {dataSub.name}
              </Link>

              {dataSub?.subMenu && <MdKeyboardArrowLeft className='text-xl' />}

              {/* سطح دوم منو */}
              {dataSub?.subMenu && (
                <ul className='absolute right-[226px] border-r border-darknes bg-[#FAF3EA] divide-y-2 w-[160px] divide-[#E6C498] p-3 rounded-2xl flex-col child:py-[14px] opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-300 ease-in-out'>
                  {dataSub.subMenu?.map((dataSubSub, indexSubSub) => (
                    <li
                      key={indexSubSub}
                      className='group relative p-4' // اضافه کردن padding بین آیتم‌های سطح دوم
                    >
                      <Link
                        className='hover:text-goldnes transition-all duration-500'
                        href={dataSubSub.path}
                      >
                        {dataSubSub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default HeaderSubMenu;

