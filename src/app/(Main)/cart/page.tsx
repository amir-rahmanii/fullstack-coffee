import { BreadcrumbSection } from '@/components/modules/Breadcrumb/Breadcrumb'
import CartDetails from '@/components/template/CartDetails/CartDetails'
import React from 'react'

function page() {
    return (
        <>
              <BreadcrumbSection BreadcrumbPageTitle="سبد خرید" />
              <CartDetails /> 
        </>
    )
}

export default page