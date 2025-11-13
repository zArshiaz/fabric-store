'use client'
import TitlePage from "@/Components/TitlePage/TitlePage";
import {useCartContext} from "@/Contexts/CartContext";
import {IoShieldCheckmarkSharp} from "react-icons/io5";

function Page() {
    const {payable, totalDiscount, cartLength, shoppingCost} = useCartContext()

    return (
        <div className={'container'}>
            <TitlePage title={'نحوه پرداخت'}/>
            <div className={'grid grid-cols-1 lg:grid-cols-8 gap-3'}>
                <div className={'lg:col-span-5'}>
                    <div className={'p-3 text-xl flex  gap-2  items-center rounded-xl bg-white border-2 border-red-500 text-red-500 shadow'}>
                        <IoShieldCheckmarkSharp className={'text-4xl'}/>
                        <span>پرداخت توسط آسان پرداخت</span>
                    </div>
                </div>

                <div className={'lg:col-span-3'}>
                    <div
                        className={'p-3  items-center rounded-xl bg-white'}>
                        <div className={' bg-rose-50 rounded-lg p-3 space-y-2'}>
                            <div className={'flex justify-between'}><span>جمع کل محصولات :</span><span
                                className={'font-hamishe-bold'}>تومان {payable.toLocaleString('fa')} </span></div>
                            <div className={'flex justify-between'}><span> هزینه ارسال :</span><span
                                className={'font-hamishe-bold'}>تومان {shoppingCost.toLocaleString('fa')} </span></div>
                        </div>
                        <div className={'text-lg flex justify-between mt-2'}>
                            <span>مبلغ لازم به پرداخت :</span>
                            <span> تومان {(payable + shoppingCost).toLocaleString('fa')}</span>
                        </div>
                        <button
                            className={'mt-3 py-3 w-full text-sm md:text-base rounded-lg text-white bg-linear-to-r from-red-800 to-red-500 shadow shadow-black/20 cursor-pointer'}>
                            پرداخت
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Page
