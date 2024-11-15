import React from 'react'
import { CiSearch } from "react-icons/ci";
import { bonManoIcon } from '../Svg/Svg';
import { SheetSide } from '../SheetSide/SheetSide';
import { GiHamburgerMenu } from 'react-icons/gi';





function Header() {
  return (
    <div className='fixed w-full pt-2.5 shadow-md rounded-md '>
      <div className='flex items-center justify-between container'>
        {/* icon hamburger mobile */}
        <SheetSide side="right">
          <button className='rounded-full cursor-pointer overflow-hidden flex justify-center items-center w-[32px] h-[32px] border-2 border-darknes bg-background p-0.5 hover:border-veronese transition-all duration-500'>
            <div className="bg-goldnes w-full h-full rounded-full flex justify-center items-center">
              <GiHamburgerMenu className='text-darknes text-lg' />
            </div>
          </button>
        </SheetSide>
        {/* icon bonMano */}
        <div className='flex flex-col gap-3'>
          {bonManoIcon}
          <div className='bg-veronese h-[2px] w-full rounded-full'></div>
        </div>
        {/* search-bar */}
        <button className='rounded-full cursor-pointer overflow-hidden flex justify-center items-center w-[32px] h-[32px] border-2 border-darknes bg-background p-0.5 hover:border-veronese transition-all duration-500'>
          <div className='bg-goldnes w-full h-full rounded-full flex justify-center items-center'>
            <CiSearch className='text-darknes text-lg' />
          </div>
        </button>

      </div>
    </div>

  )
}

export default Header