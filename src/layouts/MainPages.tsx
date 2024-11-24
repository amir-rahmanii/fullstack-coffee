import BottomBar from '@/components/parts/BottomBar/BottomBar'
import Footer from '@/components/parts/Footer/Footer'
import Header from '@/components/parts/Header/Header'
import React from 'react'

type MainPagesProps = {
    children: React.ReactNode
}

function MainPages({ children }: MainPagesProps) {
    return (
        <>
            <Header />
            <BottomBar />
            {children}
            <Footer />
        </>
    )
}

export default MainPages