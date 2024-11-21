import { bonManoIconFooter } from '@/components/icons/Svg/Svg'
import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { SiAparat } from "react-icons/si";
import { FaPinterest } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaPrint } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function Footer() {
    return (
        <footer className='bg-[#1D1D1B] pb-[100px] lg:pb-0 mt-[70px] lg:mt-[80px] text-background'>
            <div className='flex flex-col lg:flex-row justify-between items-center gap-5 container'>

                {/* logo ben mano */}
                <div className='-translate-y-14 lg:pl-16 col-span-1 flex justify-center items-center flex-col'>
                    {bonManoIconFooter}
                    <p className='text-sm my-[25px] text-center'>بن‌مانو، فروشگاه اینترنتی قهوه است که خرید آنلاین قهوه در دسته‌بندی‌‌های متفاوت را برای همه افراد در سراسر کشور امکان‌پذیر کرده است.</p>
                    <div className='flex w-full justify-evenly items-center text-2xl child:transition-all child:duration-500 child-hover:text-goldnes child:cursor-pointer'>
                        <FaInstagram />
                        <FaLinkedin />
                        <FaTelegram />
                        <FaFacebook />
                        <SiAparat />
                        <FaPinterest />
                    </div>
                    <div className='flex items-center gap-5 mt-[25px]'>
                        <Image height={80} width={80} alt='enamad' src="/images/enamad-logo.png" />
                        <Image height={80} width={80} alt='ecunion' src="/images/ecunion-logo.webp" />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* list 1  */}
                    <div >
                        <p className='text-goldnes font-danaMedium mb-5'>تماس با بن مانو</p>
                        <ul className='flex flex-col gap-5 child-hover:text-goldnes child:transition-all child:duration-500'>
                            <li className='flex gap-3'>
                                <FaLocationDot className='text-3xl' />
                                <Link href="/dfsfdsfds">
                                    تهران، بلوار میرداماد، خیابان البرز، کوچه قبادیان شرقی، پلاک ۳۳	</Link>
                            </li>
                            <li className='flex gap-3'>
                                <BsFillTelephoneFill className='text-xl' />
                                <Link href="/dfsfdsfds">
                                    02174881
                                </Link>
                            </li>
                            <li className='flex gap-3'>
                                <FaPrint className='text-xl' />
                                <Link href="/dfsfdsfds">
                                    02174881
                                </Link>
                            </li>
                            <li className='flex gap-3'>
                                <MdEmail className='text-xl' />
                                <Link href="/dfsfdsfds">
                                    info@bonmano.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* list 2  */}
                    <div >
                        <p className='text-goldnes font-danaMedium mb-5'>با بن مانو</p>
                        <ul className='flex flex-col gap-5 child-hover:text-goldnes child:transition-all child:duration-500'>
                            <li>
                                <Link href="/dfsfdsfds">
                                    درباره ما</Link>
                            </li>
                            <li>
                                <Link href="/dfsfdsfds">
                                    مجله بن مانو
                                </Link>
                            </li>
                            <li>
                                <Link href="/dfsfdsfds">
                                    فرصت های شغلی
                                </Link>
                            </li>
                            <li>
                                <Link href="/dfsfdsfds">
                                  ثبت درخواست نمایندگی
                                </Link>
                            </li>

                        </ul>
                    </div>
                    {/* list 3  */}
                    <div >
                        <p className='text-goldnes font-danaMedium mb-5'>خدمات مشتریان</p>
                        <ul className='flex flex-col gap-5 child-hover:text-goldnes child:transition-all child:duration-500'>
                            <li>
                                <Link href="/dfsfdsfds">
                                    سوالات متداول</Link>
                            </li>
                            <li>
                                <Link href="/dfsfdsfds">
                                    قوانین و مقررات
                                </Link>
                            </li>
                            <li>
                                <Link href="/dfsfdsfds">
                                    چگونه در بن‌مانو سفارش خود را ثبت کنم؟
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>



            </div>
        </footer>
    )
}

export default Footer