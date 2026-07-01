import React from 'react'
import Link from "next/link";
import {FaCheckCircle} from "react-icons/fa";

function PaymentSuccessfulPage({searchParams}: {searchParams?:({redirect?:string})}) {
    const redirect = searchParams?.redirect;
    return (
        <div className={'h-screen w-screen flex justify-center items-center'}>
            <div className={'p-4 rounded-xl bg-white outline-green-600 outline-4'}>
                <div className={'flex flex-col  items-center'}>
                    <FaCheckCircle  className={'text-green-600 text-8xl'}></FaCheckCircle >
                </div>
                <div className={'mt-2'}>
                    <p className={'text-center text-2xl'}>پرداخت موفق</p>
                </div>
                <div className={'mt-1'}>
                    {redirect?(<Link href={redirect} className={'block text-center  text-gray-500 hover:text-green-500'}>دیدن جزئیات سفارش</Link>):
                        (<Link href={'/'} className={'block text-center  text-gray-500 hover:text-green-500'}>بازگشت به صفحه اصلی</Link>)}
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccessfulPage
