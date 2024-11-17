import { MenuItem } from '@/utils/pathMenu'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from 'react-icons/md'

function HeaderSubMenu(props: MenuItem) {
  return (
    <li className='flex items-center gap-[2px] py-8 group relative hover:cursor-pointer'>
      {/* name and path main menu */}
      <Link href={props.path} className='group-hover:text-veronese '>{props.name}</Link>

      {/* if dataSub have a some subMenu show MdKeyboardArrowDown */}
      {props.subMenu && <MdKeyboardArrowDown className='group-hover:text-veronese group-hover:rotate-180 duration-500 transition-all' />}

      {/* First level menu */}
      {/* if subMenu have a some subMenu show them */}
      {props.subMenu && (
        <ul className='bg-[#FAF3EA]  custom-shadow p-8 divide-y-2 w-[260px] divide-[#E6C498]  rounded-b-2xl absolute top-[84px] hidden group-hover:flex flex-col child:py-[14px] transition-all duration-500'>
          {/* show submenu first level  */}
          {props.subMenu?.map((dataSub , index) => (
            <li key={index} className='text-darknes  flex justify-between relative'>
              {/* name and path first level menu */}
              <Link className='hover:text-goldnes flex items-center gap-2 transition-all duration-500' href={dataSub.path}>
                {/* if subMenu have a img show them */}
                {dataSub.img && (
                  <div className='w-5 h-5'>
                    {dataSub.img}
                  </div>
                )}
                {dataSub.name}
              </Link>

              {/* if dataSub have a some subMenu show MdKeyboardArrowLeft */}
              {dataSub?.subMenu && <MdKeyboardArrowLeft className='text-xl' />}

              {/* if dataSub have a some subMenu show them */}
              {/* Second level menu */}
              {dataSub?.subMenu && (
                <ul className='absolute right-[226px] border-r border-darknes hidden group-hover:flex bg-[#FAF3EA]  divide-y-2 w-[160px] divide-[#E6C498] p-3 rounded-2xl flex-col child:py-[14px] transition-all duration-500 '>
                  {dataSub.subMenu?.map((dataSubSub , indexSubSub) => (
                    <li key={indexSubSub}>
                      {/* name and path second level menu */}
                      <Link className='hover:text-goldnes transition-all duration-500' href={dataSubSub.path}>
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
  )
}

export default HeaderSubMenu