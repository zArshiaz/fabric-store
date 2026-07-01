'use client'
import React from 'react'
import './Hero.css'
import {Typewriter} from "react-simple-typewriter";
import {FaArrowLeft} from "react-icons/fa";
import Link from "next/link";




export default function Hero() {
    return (
        <div className={'hero-section h-[400px]  sm:h-[600px] lg:h-[650px]  xl:h-[680px]  '}>
            <div className={'container  h-full flex items-center justify-center sm:justify-start'}>
                <div className=" text-white flex flex-col items-center sm:items-start lg:mt-20 ">
                    <div className={'text-red-400 text-2xl  sm:text-3xl md:text-4xl lg:text-5xl  leading-9  h-20 mb-3 md:ms-0 font-hamishe-bold'}>
                      <Typewriter
                          words={[
                          'زیبایی دوخت از انتخاب پارچه شروع می‌شود.',
                          'پارچه‌های لباس باکیفیت برای استایل خاص شما.',
                          'تنوعی بی‌نظیر از پارچه‌های مجلسی و روزمره.']
                      }
                          loop={true}
                          delaySpeed={2000}
                          deleteSpeed={30}
                          typeSpeed={110}
                          cursor={true}

                      >

                      </Typewriter>

                    </div>

                    {/*<h2 className={'text-5xl mb-10 font-hamishe-bold'}>زیبایی هر دوخت از پارچه خوب آغاز می‌شود.</h2>*/}
                    <h2 className={' text-center sm:text-right text-xl md:text-xl lg:text-2xl mx-3 md:ms-1 w-auto sm:w-[350px] lg:w-[650px]'}>
                        انواع پارچه‌های باکیفیت، متنوع و به‌روز را یکجا پیدا کنید؛ از پوشاک تا دکوراسیون، مناسب برای هر سلیقه و هر طرحی.
                    </h2>
                    <Link href={'/products'} className={'group flex justify-center items-center text-lg md:text-xl mt-13 text-red-400 w-44 h-12 md:w-56 md:h-14 shadow-2xll backdrop-blur-xs  bg-red-900/30 rounded-xl transition-colors transition-discrete hover:bg-red-800/30'}>
                        فروشگاه
                        <FaArrowLeft className={'transition-all ms-2 text-base group-hover:-translate-x-2'}/>
                    </Link>
                </div>
            </div>

        </div>
    )
}
