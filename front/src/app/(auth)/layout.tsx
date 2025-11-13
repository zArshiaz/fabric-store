'use client'
import React from 'react'
import './css.css'
import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";


function AuthLayout({children}: { children: React.ReactNode }) {
    const pathname=usePathname()
    const searchParams=useSearchParams()
    const redirect=searchParams.get("redirect")

    return (
        <div className={'w-screen h-screen flex items-center justify-center overscroll-y-auto  '}>
            <div className={' bg-white rounded-2xl shadow-2xl overflow-hidden w-[380px]'}>
                {/*header*/}
                <div className="bg-red-700 text-white p-5 text-center">
                    <h1 className="text-2xl font-bold mb-2">خوش آمدید</h1>
                    <p className="opacity-90">به حساب کاربری خود وارد شوید یا ثبت نام کنید</p>
                </div>
                <div className="flex bg-gray-50">
                    <Link href={`/login${!!redirect&&('?redirect='+redirect)}`} className={`flex-1 py-4 px-6 text-center text-gray-500  hover:text-gray-700 transition-all duration-300
                            ${pathname==='/login'&& 'text-red-700 border-b-2 border-red-700 bg-white'}`}
                    >
                    ورود
                    </Link>
                    <Link href={`/register${!!redirect&&('?redirect='+redirect)}`} className={`flex-1 py-4 px-6 text-center text-gray-500hover:text-gray-700 transition-all duration-300
                            ${pathname==='/register' ? 'text-red-700 border-b-2 border-red-700 bg-white':''}`}
                    >                        ثبت نام
                    </Link>
                </div>
                <div className={'p-4'}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
