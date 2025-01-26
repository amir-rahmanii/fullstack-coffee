"use client";

import React, { useState } from 'react';
// Import Swiper React components
import { SwiperSlide } from 'swiper/react';
import { Swiper as SwiperComponent } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';


function SliderProductGallary({ images }: { images: string[] }) {

  const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperCore>(null);


  return (
    <>
      <SwiperComponent
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={true}
        modules={[FreeMode, Thumbs, Navigation]}
        className="mySwiper2"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className='border-2 border-goldnes rounded-xl overflow-hidden'>
            <Image alt='1' width={1024} height={1024} src={img} />
          </SwiperSlide>
        ))}

      </SwiperComponent>
      <SwiperComponent
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper mt-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className='border-2 border-goldnes rounded-xl'>
            <Image alt='1' width={1024} height={1024} src={img} />
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </>
  )
}

export default SliderProductGallary