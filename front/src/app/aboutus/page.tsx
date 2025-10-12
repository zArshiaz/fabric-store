import React from 'react'
import Header from "@/Components/Header/Header";
import {FaHeadset, FaShippingFast} from "react-icons/fa";
import {FaShield} from "react-icons/fa6";

function AboutPage() {
    return (
        <div>
            <Header> </Header>
            <div className="container mt-10 sm:mt-20">
                <div className={' text-center max-w-[850px] mx-auto sm:mt-32'}>
                    <h2 className={'text-4xl font-hamishe-bold leading-10 mb-5'}>درباره پارچه سرای فبریک</h2>
                    <p className={'text-xl text-gray-500 leading-7'}>ما در پارچه سرای فبریک با بیش از ۱۵ سال تجربه در زمینه فروش پارچه و منسوجات، بهترین پارچه‌ها را با کیفیت عالی و قیمت مناسب به شما ارائه می‌دهیم.</p>
                </div>
                <div className={'grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20'}>
                    <div className={'flex flex-col items-center'}>
                        <FaShippingFast className={'text-red-500 text-7xl mb-3'} />
                        <h3 className={'text-[20px] leading-6 font-hamishe-bold mb-3'}>ارسال سریع</h3>
                        <p className={'text-gray-600 text-center leading-6'}>ارسال رایگان برای خرید های بالای 500 هزار تومن</p>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <FaShield  className={'text-red-500 text-7xl mb-3'} />
                        <h3 className={'text-[20px] leading-6 font-hamishe-bold mb-3'}>ضمانت کیفیت</h3>
                        <p className={'text-gray-600 text-center leading-6'}>تمامی محصولات داری ضمانت و گارانتی معتبر</p>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <FaHeadset  className={'text-red-500 text-7xl mb-3'}/>
                        <h3 className={'text-[20px] leading-6 font-hamishe-bold mb-3'}>پشتیبانی {24.7.toLocaleString('fa')}</h3>
                        <p className={'text-gray-600 text-center leading-6'}>تیم پشتیبانی ما همیشه در اختیار شما هستند</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutPage
