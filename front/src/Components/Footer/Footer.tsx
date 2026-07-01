import React from 'react'
import './Footer.css'
import Link from "next/link";

export default function Footer({className}: { className?: string }) {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <footer className="gradient-background mt-8 py-4 pt-8 text-white w-full">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="md:col-span-1">
                        <div className="flex items-center mb-4">
                            <h1 className="font-titr-zebr text-xl text-red-700 bg-red-100 p-2 rounded-lg">Nakhshin</h1>
                        </div>
                        <p className="leading-relaxed mb-6">
                            مرجع تخصصی پارچه‌های با کیفیت و مدرن. از سنتی تا مدرن، همه چیز اینجاست.
                        </p>

                    </div>


                    <div className="md:col-span-2">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                            {/*<div>*/}
                            {/*    <h4 className="  mb-4 flex items-center">*/}
                            {/*        <span className="0 ml-2">🏪</span>*/}
                            {/*        محصولات*/}
                            {/*    </h4>*/}
                            {/*    <ul className="space-y-2">*/}
                            {/*        <li><a href="#" className=" footer-link">پارچه*/}
                            {/*            ابریشم</a></li>*/}
                            {/*        <li><a href="#" className=" footer-link">پارچه*/}
                            {/*            کتان</a></li>*/}
                            {/*        <li><a href="#" className=" footer-link">پارچه*/}
                            {/*            ساتن</a></li>*/}
                            {/*        <li><a href="#" className=" footer-link">پارچه*/}
                            {/*            چرم</a></li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}

                            {/*<div>*/}
                            {/*    <h4 className="  mb-4 flex items-center">*/}
                            {/*        <span className="ml-2">🛍️</span>*/}
                            {/*        خرید*/}
                            {/*    </h4>*/}
                            {/*    <ul className="space-y-2">*/}
                            {/*        <li><a href="#" className=" footer-link">راهنمای*/}
                            {/*            خرید</a></li>*/}
                            {/*        <li><a href="#" className=" footer-link">روش‌های*/}
                            {/*            پرداخت</a></li>*/}
                            {/*        <li><a href="#" className=" footer-link">ارسال*/}
                            {/*            و تحویل</a></li>*/}
                            {/*        <li><a href="#" className=" footer-link">ضمانت*/}
                            {/*            کیفیت</a></li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}

                            <div>
                                <h4 className="  mb-4 flex items-center">
                                    <span className=" ml-2">📞</span>
                                    پشتیبانی
                                </h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/contact-us" className="footer-link">تماس با ما</Link>
                                    </li>
                                    <li>
                                        <Link href="/aboutus" className=" footer-link">درباره ما</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <a referrerPolicy='origin' target='_blank'
                                   href='https://trustseal.enamad.ir/?id=718913&Code=VE3zz1l2SzRNIBqnY8XjGa9KuKi4c7Wz'>
                                    <img
                                        referrerPolicy='origin'
                                        src='https://trustseal.enamad.ir/logo.aspx?id=718913&Code=VE3zz1l2SzRNIBqnY8XjGa9KuKi4c7Wz'
                                        alt='' className={'cursor-pointer'} data-code='VE3zz1l2SzRNIBqnY8XjGa9KuKi4c7Wz'/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="border-t border-gray-200 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-6 space-x-reverse mb-4 md:mb-0">
                            <span className="">📍 کردستان، کامیاران</span>
                            <span className="">📞 0938-204-5830</span>
                        </div>

                    </div>
                </div>
            </div>
        </footer>

    )
}
