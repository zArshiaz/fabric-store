import React from 'react'
import {PiSealWarningDuotone} from "react-icons/pi";
import Link from "next/link";

function PaymentFailedPage() {
    return (
        <div className={'h-screen w-screen flex justify-center items-center'}>
            <div className={'p-4 rounded-xl bg-white outline-4 outline-red-500'}>
                <div className={'flex flex-col  items-center'}>
                    <PiSealWarningDuotone className={'text-red-500 text-8xl'}></PiSealWarningDuotone>
                </div>
                <div className={'mt-2 text-2xl'}>
                    <p>خطا در پرداخت سفارش</p>
                </div>
                <div className={'mt-1'}>
                    <Link href={'/'} className={'block text-center text-red-300 hover:text-red-500'}>بازگشت یه صفحه اصلی</Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentFailedPage
