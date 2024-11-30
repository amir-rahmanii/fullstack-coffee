import BottomBar from '@/components/parts/BottomBar/BottomBar';
import Footer from '@/components/parts/Footer/Footer';
import Header from '@/components/parts/Header/Header';
import React from 'react'

function LayoutMain({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <BottomBar />
            {children}
            <Footer />
        </>
    )
}

export default LayoutMain