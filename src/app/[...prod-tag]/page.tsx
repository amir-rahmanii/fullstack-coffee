import BottomBar from '@/components/layouts/BottomBar/BottomBar'
import Footer from '@/components/layouts/Footer/Footer'
import Header from '@/components/layouts/Header/Header'
import { BreadcrumbSection } from '@/components/modules/Breadcrumb/Breadcrumb'
import React from 'react'
import ProdTagAllProduct from '@/components/template/ProdTagAllProduct/ProdTagAllProduct'
import SideBarFilter from '@/components/layouts/SideBarFilter/SideBarFilter'

function ProudTag() {
    return (
        <>
            <Header />
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
            <BottomBar />
            <Footer />
        </>
    )
}

export default ProudTag