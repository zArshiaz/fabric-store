import React from 'react'
import Header from "@/Components/Header/Header";
import Link from "next/link";
import Footer from "@/Components/Footer/Footer";

function ContactUSPage() {
    return (
        <div className={'flex flex-col h-screen'}>
            <Header/>
            <div className="mt-6 sm:mt-24 flex-1">
                <div className="container">

                    <h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">
                        تماس با ما
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-8">
                        <div className="">
                            <div className="bg-white rounded-2xl shadow p-6">

                                <h5 className="text-lg font-semibold mb-6">
                                    اطلاعات تماس
                                </h5>

                                <div className="space-y-4 text-gray-700">

                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-map-marker-alt text-blue-500"></i>
                                         کردستان، کامیاران
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-phone text-blue-500"></i>
                                        0938-204-5830
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow p-6">

                            <h5 className="text-lg font-semibold mb-4">
                                ارتباط با ما در
                            </h5>

                            <div className="flex gap-4 text-gray-700">
                                <Link href={'/'} className={'flex flex-col items-center gap-1 group px-3 pt-3 pb-1 rounded-lg transition-all hover:bg-red-100 hover:scale-110'}>
                                    <img src="/images/bale.png" className={'w-18'} alt=""/>
                                    <span className={'group-hover:text-red-500'}>بله</span>
                                </Link>
                                <Link href={'/'} className={'flex flex-col items-center gap-1 group px-3 pt-3 pb-1 rounded-lg transition-all hover:bg-red-100 hover:scale-110'}>
                                    <img src="/images/rubika.png" className={'w-18'} alt=""/>
                                    <span className={'group-hover:text-red-500'}>روبیکا</span>
                                </Link>
                                <Link href={'/'} className={'flex flex-col items-center gap-1 group px-3 pt-3 pb-1 rounded-lg transition-all hover:bg-red-100 hover:scale-110'}>
                                    <img src="/images/telegram.png" className={'w-18 '} alt=""/>
                                    <span className={'group-hover:text-red-500'}>تلگرام</span>
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ContactUSPage
