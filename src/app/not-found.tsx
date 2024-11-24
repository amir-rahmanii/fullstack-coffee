'use client';
import BottomBar from '@/components/parts/BottomBar/BottomBar'
import Footer from '@/components/parts/Footer/Footer'
import Header from '@/components/parts/Header/Header';
import { BreadcrumbSection } from '@/components/modules/Breadcrumb/Breadcrumb';
import { Button } from '@/components/ui/button';
import MainPages from '@/layouts/MainPages';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function NotFound() {
    return (
        <MainPages>
            <BreadcrumbSection BreadcrumbPageTitle="صفحه 404" />
            <div className='container pt-8'>
                <Image width={1500} height={500} src="/images/404.webp" alt='404' />
                <div>
                    <h2 className='text-goldnes text-2xl lg:text-5xl text-center mt-5'>خطای 404</h2>
                    <p className='lg:text-2xl text-center mt-5'>متاسفانه صفحه موردنظر یافت نشد</p>
                    <div className='flex justify-center mt-5'>
                        <Link href="/">
                            <Button variant="default" size="default">
                                بازگشت به صفحه اصلی
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </MainPages>
    )
}

export default NotFound