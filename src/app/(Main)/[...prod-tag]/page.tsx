import BottomBar from '@/components/parts/BottomBar/BottomBar'
import Footer from '@/components/parts/Footer/Footer'
import Header from '@/components/parts/Header/Header'
import { BreadcrumbSection } from '@/components/modules/Breadcrumb/Breadcrumb'
import React from 'react'
import ProdTagAllProduct from '@/components/template/ProdTagAllProduct/ProdTagAllProduct'
import SideBarFilter from '@/components/parts/SideBarFilter/SideBarFilter'
import MainPages from '@/layouts/MainPages'

function ProudTag() {
    return (
        <MainPages>
            <BreadcrumbSection BreadcrumbPageTitle="محصولات" />
            <div className='container mt-6'>
                <div className='bg-veronese rounded-2xl py-8'>
                    <h2 className='text-center text-xl lg:text-3xl text-background'>محصولات خانگی</h2>
                </div>
            </div>
            {/* all product */}
            <div className='mt-10 mb-36 grid gap-4 grid-cols-6 container'>
                <div className='col-span-1'>
                    <SideBarFilter />
                </div>
                <div className='col-span-5'>
                    <ProdTagAllProduct />
                </div>
            </div>
        </MainPages>
    )
}

export default ProudTag