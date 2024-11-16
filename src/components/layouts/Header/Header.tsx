import React from 'react'
import { CiSearch } from "react-icons/ci";
import { SideBarMobile } from '../../template/SideBarMobile/SideBarMobile';
import { GiHamburgerMenu } from 'react-icons/gi';
import { bonManoIcon } from '@/components/icons/Svg/Svg';
import { SearchBar } from '@/components/template/SearchBar/SearchBar';





function Header() {
  return (
    <div className='fixed top-0 w-full pt-2.5 shadow-md rounded-md '>
      <div className='flex items-center justify-between container'>
        {/* icon hamburger mobile */}
        <SideBarMobile side="right">
          <button className='rounded-full cursor-pointer overflow-hidden flex justify-center items-center w-[32px] h-[32px] border-2 border-darknes bg-background p-0.5 hover:border-veronese transition-all duration-500'>
            <div className="bg-goldnes w-full h-full rounded-full flex justify-center items-center">
              <GiHamburgerMenu className='text-darknes text-lg' />
            </div>
          </button>
        </SideBarMobile>
        {/* icon bonMano */}
        <div className='flex flex-col gap-3'>
          <div className='w-[100px] h-[71px]'>
            {bonManoIcon}
          </div>
          <div className='bg-veronese h-[2px] w-full rounded-full'></div>
        </div>
        {/* search-bar */}
        <SearchBar side="bottom">
          <button className='rounded-full cursor-pointer overflow-hidden flex justify-center items-center w-[32px] h-[32px] border-2 border-darknes bg-background p-0.5 hover:border-veronese transition-all duration-500'>
            <div className='bg-goldnes w-full h-full rounded-full flex justify-center items-center'>
              <CiSearch className='text-darknes text-lg' />
            </div>
          </button>
        </SearchBar>

      </div>
    </div>

  )
}

export default Header