import React from 'react'
import { CiSearch } from "react-icons/ci";
import { SideBarMobile } from '../../template/SideBarMobile/SideBarMobile';
import { GiHamburgerMenu } from 'react-icons/gi';
import { bonManoIcon } from '@/components/icons/Svg/Svg';
import { SearchBar } from '@/components/template/SearchBar/SearchBar';
import CartSlide from '@/components/template/CartSlide/CartSlide';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { FaRegHeart, FaRegUser } from 'react-icons/fa6';
import HeaderIcons from '@/components/modules/HeaderIcons/HeaderIcons';
import { pathMenu } from '@/utils/pathMenu'
import HeaderSubMenu from '@/components/modules/HeaderSubMenu/HeaderSubMenu';


function Header() {
  return (
    <div className='fixed top-0 z-[9999] bg-background w-full pt-2.5 shadow-md rounded-md'>
      <div className='grid grid-cols-3 xl:grid-cols-5 items-center container'>
        {/* icon hamburger mobile */}
        <div className='flex items-center gap-2.5'>
          <div className='xl:hidden'>
            <SideBarMobile side="right">
              <HeaderIcons>
                <GiHamburgerMenu className='text-darknes text-lg' />
              </HeaderIcons>
            </SideBarMobile>
          </div>
          {/* search bar desktop */}
          <div className='hidden sm:flex justify-end items-center gap-1'>
            <SearchBar side="bottom">
              <HeaderIcons>
                <CiSearch className='text-darknes text-lg' />
              </HeaderIcons>
            </SearchBar>
          </div>
        </div>

        {/* navbar 1 */}
        <div className='hidden xl:block'>
          <ul className='flex items-center text-sm gap-8'>
            {/* show two items from pathMenu */}
            {pathMenu.slice(0, 2).map((menu , index) => (
              <HeaderSubMenu key={index} {...menu} />
            ))}
          </ul>
        </div>
        {/* icon bonMano */}
        <div className='flex flex-col justify-center items-center gap-3 '>
          <div className='w-[100px] h-[71px] '>
            {bonManoIcon}
          </div>
          <div className='bg-veronese h-[2px] w-[50%] rounded-full'></div>
        </div>
        {/* navbar 2 */}
        <div className='hidden xl:block'>
          <ul className='flex items-center text-sm gap-6'>
            {/* show two items from pathMenu */}
            {pathMenu.slice(2, 5).map((menu , index) => (
              <HeaderSubMenu key={index} {...menu} />
            ))}
          </ul>
        </div>
        {/* search-bar */}
        <div className=' flex sm:hidden justify-end items-center gap-1'>
          <SearchBar side="bottom">
            <button className='rounded-full cursor-pointer overflow-hidden flex justify-center items-center w-[32px] h-[32px] border-2 border-darknes bg-background p-0.5 hover:border-veronese transition-all duration-500'>
              <div className='bg-goldnes w-full h-full rounded-full flex justify-center items-center'>
                <CiSearch className='text-darknes text-lg' />
              </div>
            </button>
          </SearchBar>
        </div>

        <div className='hidden sm:flex items-center justify-end gap-2.5'>
          {/* login  */}
          <div className='hidden sm:block'>
            <HeaderIcons>
              <FaRegUser className='text-darknes text-lg' />
            </HeaderIcons>
          </div>

          {/* basket-card */}
          <div className='hidden sm:block'>
            <CartSlide side="left">
              <HeaderIcons>
                <RiShoppingBag3Line className='text-darknes text-lg' />
              </HeaderIcons>
            </CartSlide>
          </div>

          {/* populate product  */}
          <div className='hidden sm:block'>
            <HeaderIcons>
              <FaRegHeart className='text-darknes text-lg' />
            </HeaderIcons>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Header