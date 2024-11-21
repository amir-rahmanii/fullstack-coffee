'use client';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useCallback, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import MagazineBox from '@/components/modules/Magazine/MagazineBox/MagazineBox';

function MagazineSlider() {

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

    return (
        <div className='container'>
            <h3 className='text-2xl font-danaMedium mb-6'>مجله بن مانو</h3>

            <div className='w-auto'>
                <Swiper
                    onSwiper={(swiper) => (sliderRef.current = swiper)}
                    spaceBetween={10} // Adjust this if necessary
                    slidesPerView={1} // Allow automatic sizing of slides based on content
                    autoplay={{
                        delay: 500,
                        disableOnInteraction: false
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                        400: {
                            slidesPerView: 1,
                        },
                        530: {
                            slidesPerView: 1, // At smaller screen sizes, show 2 slides
                        },
                        768: {
                            slidesPerView: 1.5, // At smaller screen sizes, show 3 slides
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
                    <SwiperSlide>
                        <MagazineBox />
                    </SwiperSlide>
                    <SwiperSlide>
                        <MagazineBox />
                    </SwiperSlide>
                    <SwiperSlide>
                        <MagazineBox />
                    </SwiperSlide>
                    <SwiperSlide>
                        <MagazineBox />
                    </SwiperSlide>
                    <SwiperSlide>
                        <MagazineBox />
                    </SwiperSlide>

                </Swiper>



            </div>


            <div className='flex justify-between items-center mt-6'>
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
                <div className='flex justify-center'>
                    <Button variant="default" size="default">
                        مجله بن مانو
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MagazineSlider