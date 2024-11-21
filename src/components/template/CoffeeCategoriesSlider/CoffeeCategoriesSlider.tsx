"use client";

import { greenSperso } from '@/components/icons/Svg/Svg';
import BoxProduct from '@/components/modules/Product/BoxProduct/BoxProduct';
import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Button } from '@/components/ui/button';
import CategoryIcons from '@/components/modules/Icons/CategoryIcons/CategoryIcons';
import WhyHorkaIcons from '@/components/modules/Icons/WhyHorkaIcons/WhyHorkaIcons';


type CoffeeCategoriesProps = {
    isAboutBonMano: boolean
}

function CoffeeCategoriesSlider({ isAboutBonMano }: CoffeeCategoriesProps) {
    //َState to manage Active Svg Category
    const [isActiveCategory, setIsActiveCategory] = useState(false);

    // State to manage the disabled state of navigation buttons
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const sliderRef = useRef<SwiperType | null>(null);

    // Handler to navigate to the previous slide
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.slidePrev();
    }, []);

    // Handler to navigate to the next slide
    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.slideNext();
    }, []);

    const changeCategoryHandler = () => {
        setIsActiveCategory(true);
    };

    return (
        <div className="py-[60px] lg:py-[80px] container flex flex-col gap-[60px] lg:gap-0 lg:justify-between lg:flex-row lg:flex lg:items-center">
            {isAboutBonMano ? (
                <div>
                    <h3 className='text-2xl text-veronese mb-[30px] font-danaMedium'>چرا هورکا بن‌مانو؟</h3>
                    <div className='flex flex-col gap-6'>
                        <WhyHorkaIcons />
                        <WhyHorkaIcons />
                        <WhyHorkaIcons />
                    </div>
                </div>
            ) : (
                <div className="hidden lg:block">
                    <Image
                        width="533"
                        height="623"
                        src="/images/categories/coffee-bean-main-page.jpg"
                        alt="coffee-bean-main-page"
                    />
                </div>
            )}

            {/* Products section */}
            <div className=''>
                <div className="flex items-center flex-col xl:flex-row xl:justify-between">
                    {/* Categories */}
                    <div className="flex flex-col items-center">
                        <p className="text-darknes">محصولات هورکا</p>
                        <p className="text-[18px]/[34px] font-danaMedium lg:text-2xl/[48px]">
                            قهوه ترکیبی
                        </p>
                    </div>
                    {/* Icons for category selection */}

                    <div className="py-5 flex gap-3 justify-center">
                        {[...Array(3)].map((_, index) => (
                           <CategoryIcons key={index} isActiveCategory={isActiveCategory} changeCategoryHandler={changeCategoryHandler} />
                        ))}
                    </div>
                </div>
                {/* Product container */}
                <div className="relative w-auto lg:w-[550px] xl:w-[800px]">
                    <Swiper
                        onSwiper={(swiper) => (sliderRef.current = swiper)}
                        spaceBetween={10} // Adjust this if necessary
                        slidesPerView={1} // Allow automatic sizing of slides based on content
                        modules={[Navigation]}
                        breakpoints={{
                            400: {
                                slidesPerView: 1.5,
                            },
                            530: {
                                slidesPerView: 2, // At smaller screen sizes, show 2 slides
                            },
                            768: {
                                slidesPerView: 2.5, // At smaller screen sizes, show 3 slides
                            },
                            1024: {
                                slidesPerView: 2, // show 2.5 slides
                            },
                            1280: {
                                slidesPerView: 3, // Show 3 slides on larger screens
                            },
                        }}
                        onReachBeginning={() => setIsPrevDisabled(true)} // Disable the previous button
                        onReachEnd={() => setIsNextDisabled(true)} // Disable the next button
                        onFromEdge={() => {
                            // Re-enable buttons when the swiper leaves the edge
                            setIsPrevDisabled(false);
                            setIsNextDisabled(false);
                        }}
                    >
                        {[...Array(5)].map((_, index) => (
                            <SwiperSlide key={index} className="w-auto min-w-[200px]">
                                <BoxProduct />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between my-6 px-3">
                        <div className='flex items-center gap-4'>
                            <button
                                onClick={handlePrev}
                                disabled={isPrevDisabled}
                                className={`text-[#1D1B1B] flex justify-center items-center p-2 rounded-full transition-colors ${isPrevDisabled
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ' hover:bg-goldnes '
                                    }`}
                            >
                                <MdKeyboardArrowRight className='text-2xl' />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={isNextDisabled}
                                className={` text-[#1D1B1B] flex justify-center items-center p-2 rounded-full transition-colors ${isNextDisabled
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ' hover:bg-goldnes'
                                    }`}
                            >
                                <MdKeyboardArrowLeft className='text-2xl' />
                            </button>
                        </div>
                        <div>
                            <Button size="default" variant="default">
                                خرید دانه قهوه اسپرسو
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoffeeCategoriesSlider;
