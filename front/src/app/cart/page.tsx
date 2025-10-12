'use client'
import Header from "@/Components/Header/Header";
import Alert from "@/Components/Alert/Alert";
import {useCartContext} from "@/Contexts/CartContext";
import Link from "next/link";
import CartItem from "@/Components/CartItem/CartItem";
import {nanoid} from "nanoid";
import CartPriceSection from "@/Components/CartPriceSection/CartPriceSection";
import ScrollToBottomButton from "@/Components/ScrollToBottomButton/ScrollToBottomButton";

export default function CartPage() {
    const {cartItems, cartLength} = useCartContext()

    return (
        <div>
            <Header/>
            <div className="container mt-2 sm:mt-20 pb-3 md:pb-5">
                <div
                    className="bg-white rounded-xl shadow p-3 mb-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="">
                                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                                    سبد خرید شما
                                </h1>
                        </div>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className={'flex justify-center'}>
                        <Alert className={' p-8 flex flex-col  items-center '} type={'warning'}>
                            <div> سبد خرید شما خالی است .</div>
                            <Link href="/products" className={'font-bold ms-2 mt-4'}> رفتن به فروشگاه </Link>
                        </Alert>
                    </div>
                ) : (
                    <div className={'grid grid-cols-1 lg:grid-cols-8 gap-3'}>
                        <div className={'lg:col-span-5 space-y-2'}>
                            {
                                cartItems.map((item, i) =>
                                    <CartItem key={nanoid()} cartItem={item}/>
                                )
                            }
                        </div>
                        <div className={'lg:col-span-3'}>
                            <div
                                className={'p-3  items-center rounded-xl bg-white'}>
                                <CartPriceSection></CartPriceSection>
                                <button
                                    className={'mt-3 py-3 w-full text-sm md:text-base rounded-lg text-white bg-linear-to-r from-red-800 to-red-500 shadow shadow-black/20'}>
                                    ادامه فرایند خرید
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ScrollToBottomButton className={''}></ScrollToBottomButton>
        </div>
    )
}
