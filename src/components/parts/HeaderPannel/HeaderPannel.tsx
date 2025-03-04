"use client";

import Image from 'next/image'
import { MenuIcon, messageOutline } from '@/components/icons/Svg/Svg'
import { useShowSideBarMobilePannel } from '@/store/useShowSideBarMobilePannel';


type HeaderPannelType = {
    username : string;
    isAdminPannel : boolean
}

function HeaderPannel({ username , isAdminPannel }: HeaderPannelType) {

    const { isShowSideBarMobilePannel, updateIsShowSideBarMobilePannel } = useShowSideBarMobilePannel();


    return (
        <>
            <div className='font-sans z-40 fixed top-0 right-0 w-full md:w-[calc(100%-100px)]  lg:w-[calc(100%-200px)] xl:w-[calc(100%-290px)] left-0 md:right-[100px] lg:right-[200px] xl:right-[290px] px-4 md:px-11 py-2 md:py-4 flex items-center bg-admin-navy'>
                <div className='flex w-full items-center justify-between'>
                    <p className='hidden md:block'>
                        {username}
                        {" "}
                        به 
                        {" "}
                        {isAdminPannel ? " ادمین پنل" : " پنل کاربری"}
                        {" "}
                         خوش آمدید
                    </p>
                    <button onClick={() => updateIsShowSideBarMobilePannel(!isShowSideBarMobilePannel)} className='bg-[#313D4A] block md:hidden p-2 rounded'>
                        <div className='w-5 h-5 text-white'>
                            {MenuIcon}
                        </div>
                    </button>

                    {/* profile */}
                    <div className='flex items-center gap-5'>
                        <div className='bg-[#313D4A] relative flex justify-center items-center w-[34px] h-[34px] rounded-full'>
                            <div className='w-5 h-5 text-white'>
                                {messageOutline}
                            </div>
                            <div className='absolute top-0 right-0'>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-red opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-error-red"></span>
                                </span>
                            </div>
                        </div>

                        <div className='flex items-center gap-3'>
                            <div className='flex flex-col'>
                                <p className='text-white font-bold text-sm'>Amirreza Rahmani</p>
                                <p className='text-admin-low font-light text-xs'>Frontend developer</p>
                            </div>
                            <Image width={80} height={80} alt="Profile" className='rounded-full object-cover' src={`/images/404.webp`} />
                        </div>
                    </div>
                </div>
            </div>

            {/*black side for menu mobile */}
            <div onClick={() => updateIsShowSideBarMobilePannel(false)} className={`bg-black/40 md:hidden fixed inset-0 w-full h-full z-[41] transition-all ${isShowSideBarMobilePannel ? 'visible opacity-100' : 'invisible opacity-0'}`}></div>

        </>
    )
}

export default HeaderPannel