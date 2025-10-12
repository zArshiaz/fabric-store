import React from 'react'
import './Footer.css'
export default function Footer() {
    return (
        <footer className="gradient-background mt-5 py-4 pt-8 text-white w-full">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="md:col-span-1">
                        <div className="flex items-center mb-4">
                            <div
                                className="bg-white rounded-xl p-3 ml-3">
                                <span className="text-2xl">🧵</span>
                            </div>
                            <h3 className="text-2xl font-bold gradient-text">پارچه‌لند</h3>
                        </div>
                        <p className="leading-relaxed mb-6">
                            مرجع تخصصی پارچه‌های با کیفیت و مدرن. از سنتی تا مدرن، همه چیز اینجاست.
                        </p>

                    </div>


                    <div className="md:col-span-2">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                            <div>
                                <h4 className="  mb-4 flex items-center">
                                    <span className="0 ml-2">🏪</span>
                                    محصولات
                                </h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className=" transition-colors">پارچه
                                        ابریشم</a></li>
                                    <li><a href="#" className=" transition-colors">پارچه
                                        کتان</a></li>
                                    <li><a href="#" className=" transition-colors">پارچه
                                        ساتن</a></li>
                                    <li><a href="#" className=" transition-colors">پارچه
                                        چرم</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="  mb-4 flex items-center">
                                    <span className="ml-2">🛍️</span>
                                    خرید
                                </h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className=" transition-colors">راهنمای
                                        خرید</a></li>
                                    <li><a href="#" className=" transition-colors">روش‌های
                                        پرداخت</a></li>
                                    <li><a href="#" className=" transition-colors">ارسال
                                        و تحویل</a></li>
                                    <li><a href="#" className=" transition-colors">ضمانت
                                        کیفیت</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="  mb-4 flex items-center">
                                    <span className=" ml-2">📞</span>
                                    پشتیبانی
                                </h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className=" transition-colors">تماس
                                        با ما</a></li>
                                    <li><a href="#" className=" transition-colors">سوالات
                                        متداول</a></li>
                                    <li><a href="#" className=" transition-colors">مشاوره
                                        رایگان</a></li>
                                    <li><a href="#" className=" transition-colors">درباره
                                        ما</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="border-t border-gray-200 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-6 space-x-reverse mb-4 md:mb-0">
                            <span className="">📍 تهران، خیابان ولیعصر</span>
                            <span className="">📞 021-88776655</span>
                        </div>
                        <div className="flex space-x-4 space-x-reverse">
                            <a href="#"
                               className=" p-2 rounded-full">
                                <span>📱</span>
                            </a>
                            <a href="#"
                               className=" p-2 rounded-full">
                                <span>💬</span>
                            </a>
                            <a href="#"
                               className=" p-2 rounded-full">
                                <span>🌐</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
