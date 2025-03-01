"use client";

import Link from 'next/link'
import { bonManoIcon } from '@/components/icons/Svg/Svg'
import { MenuItemDashboard } from '@/utils/pathDahboard';
import { usePathname } from 'next/navigation';
import { useShowSideBarMobilePannel } from '@/store/useShowSideBarMobilePannel';






function SideBarPannel({pathMenu} : {pathMenu : MenuItemDashboard[]}) {

    const pathname = usePathname();
    const { isShowSideBarMobilePannel } = useShowSideBarMobilePannel();


    return (
        <>
            <div className='font-sans hidden md:block md:w-[100px] lg:w-[200px] xl:w-[290px] fixed  z-20 right-0 top-0 bottom-0 bg-admin-navy py-4 px-6 overflow-auto'>
                {/* header */}
                <div className='flex justify-center bg-white/5 rounded-2xl  items-center pt-2'>
                    <Link className='w-24 h-24' href="/">
                        {bonManoIcon}
                    </Link>
                </div>
                {/* menu */}
                <div className='mt-9'>
                    <p className='text-admin-High text-center lg:text-start lg:px-6 mb-2 text-sm'>فهرست</p>
                    <ul className='flex flex-col gap-3'>
                        {pathMenu.map(menu => (
                            <li key={menu.path}>
                                <Link href={menu.path} className={`
                                flex items-center  gap-2 py-2 px-4 text-admin-low rounded transition-all duration-300 hover:bg-[#313D4A]
                                ${pathname === menu.path && "bg-[#313D4A] "}`}
                                >
                                    <div className='w-6 h-6'>
                                        {menu.img}
                                    </div>
                                    <span className='text-base font-danaMedium hidden lg:block'>{menu.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {isShowSideBarMobilePannel && (
                <div className={`transition-all md:hidden z-50 bg-admin-black font-medium duration-300 fixed top-0 bottom-0 w-[280px] p-5 overflow-y-auto ${isShowSideBarMobilePannel ? 'left-0' : '-left-[280px]'}`}>
                    <div className='flex bg-white/5 rounded-2xl justify-center items-center pt-2'>
                        <Link className='w-24 h-24' href="/">
                            {bonManoIcon}
                        </Link>
                    </div>

                    <ul className='flex flex-col gap-5'>
                        {pathMenu.map(menu => (
                            <li key={menu.path}>
                                <Link href='panel' className={`
                                  flex items-center  gap-2 py-2 px-4 text-admin-low rounded transition-all duration-300 hover:bg-[#313D4A]
                                  ${pathname === menu.path && "bg-[#313D4A] "}`}
                                >
                                    <div className='w-6 h-6'>
                                        {menu.img}
                                    </div>
                                    <span className='text-base font-danaMedium'>{menu.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            )}
        </>
    )
}

export default SideBarPannel