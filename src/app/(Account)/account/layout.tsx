
import HeaderPannel from '@/components/parts/HeaderPannel/HeaderPannel';
import SideBarPannel from '@/components/parts/SideBarPannel/SideBarPannel';
import React from 'react'

function LayOutAccount({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='bg-admin-black min-h-screen text-white'>
            <HeaderPannel />
            <SideBarPannel />
            <div className="md:mr-16 lg:mr-40 xl:mr-64 mt-12">
                <div className="flex gap-2 h-full w-full py-14 p-4 md:p-[74px]">
                    {children}
                </div>
            </div>
        </div>

    )
}

export default LayOutAccount