'use client'
import Header from "@/Components/Header/Header";
import Alert from "@/Components/Alert/Alert";
import {useCartContext} from "@/Contexts/CartContext";
import Link from "next/link";
import CartItem from "@/Components/CartItem/CartItem";
import {nanoid} from "nanoid";
import CartPriceSection from "@/Components/CartPriceSection/CartPriceSection";
import ScrollToBottomButton from "@/Components/ScrollToBottomButton/ScrollToBottomButton";
import CartListItems from "@/Components/CartListItems/CartListItems";
import ShoppingProgressBar from "@/Components/ShoppingProgressBar/ShoppingProgressBar";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/Contexts/AuthContext";
import TitlePage from "@/Components/TitlePage/TitlePage";

export default function CartPage() {
    const {cartLength} = useCartContext()
    const {isLoggedIn} = useAuthContext();
    const router = useRouter()

    const changeRouteHandler=()=>{
        if(isLoggedIn){
            router.push("/order/address");
        }else {
            router.push("/login?redirect=order/cart");
        }
    }

    return (
        <div>
            <div className="container pb-3 md:pb-5">
                <TitlePage title={'سبد خرید'}/>

                {cartLength() === 0 ? (
                    <div className={'flex justify-center'}>
                        <Alert className={' p-8 flex flex-col  items-center '} type={'warning'}>
                            <div> سبد خرید شما خالی است .</div>
                            <Link href="/products" className={'font-bold ms-2 mt-4'}> رفتن به فروشگاه </Link>
                        </Alert>
                    </div>
                ) : (
                    <div className={'grid grid-cols-1 lg:grid-cols-8 gap-3'}>
                        <div className={'lg:col-span-5'}>

                            <CartListItems/>
                        </div>
                        <div className={'lg:col-span-3'}>
                            <div
                                className={'p-3  items-center rounded-xl bg-white'}>
                                <CartPriceSection></CartPriceSection>
                                <button
                                    onClick={changeRouteHandler}
                                    className={'mt-3 py-3 w-full text-sm md:text-base rounded-lg text-white bg-linear-to-r from-red-800 to-red-500 shadow shadow-black/20 cursor-pointer'}>
                                    ادامه فرایند خرید
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
