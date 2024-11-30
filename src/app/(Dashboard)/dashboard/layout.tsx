"use client";

import HeaderAdmin from '@/components/parts/HeaderAdmin/HeaderAdmin';
import SideBarAdmin from '@/components/parts/SideBarAdmin/SideBarAdmin'
import React, { useState } from 'react'

function LayOutDashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [showSidebarLeftMobile, setShowSidebarLeftMobile] = useState(false)

    return (
        <div className='bg-admin-black min-h-screen text-white'>
            <HeaderAdmin showSidebarLeftMobile={showSidebarLeftMobile} setShowSidebarLeftMobile={setShowSidebarLeftMobile} />
            <SideBarAdmin showSidebarLeftMobile={showSidebarLeftMobile} setShowSidebarLeftMobile={setShowSidebarLeftMobile} />
            <div className="md:mr-16 lg:mr-40 xl:mr-64 mt-12">
                <div className="flex gap-2 h-full w-full py-14 p-4 md:p-[74px]">
                    {children}
                </div>
            </div>
        </div>

    )
}

export default LayOutDashboard