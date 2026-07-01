'use client'
import Alert from "@/Components/Alert/Alert";
import {useCartContext} from "@/Contexts/CartContext";
import Link from "next/link";
import CartPriceSection from "@/Components/CartPriceSection/CartPriceSection";
import CartList from "@/Components/CartList/CartList";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/Contexts/AuthContext";
import TitlePage from "@/Components/TitlePage/TitlePage";
import {useEffect, useMemo} from "react";
import Swal from "sweetalert2";

export default function CartPage() {
    const {cartLength,getStockInCart,productIndex,notAvailableItem} = useCartContext()
    const {isLoggedIn} = useAuthContext();
    const router = useRouter()


    useEffect(() => {
        showWarning()
    },[])

    const showWarning=()=>{
        if (notAvailableItem){
            let stockInCart= getStockInCart(notAvailableItem._id)
            let stockOutCart= productIndex.get(notAvailableItem._id)?.stock??0
            const message=" از محصول "+productIndex.get(notAvailableItem._id)?.name+" "+ stockInCart.toLocaleString('fa')+
                " متر در سبد خرید شما وجود دارد اما تنها "+stockOutCart.toLocaleString('fa')+" متر موجود است."+"\n"+
                (stockInCart-stockOutCart).toLocaleString('fa')+" متر از یکی از آیتم ها حذف کن ."

            Swal.fire({
                icon: "warning",
                text:message,
                showConfirmButton: false,
                showCloseButton: true,
            })
        }
    }

    const changeRouteHandler=()=>{
        if(isLoggedIn && !notAvailableItem){
            router.push("/order/address");
        }else if(notAvailableItem) {
            showWarning()
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
                    <div className={' grid grid-cols-1 lg:grid-cols-8 gap-3'}>
                        <div className={'lg:col-span-5 mb-[160px] md:mb-2'}>
                            <CartList/>
                        </div>
                        <div className={'lg:col-span-3 fixed bottom-0 inset-x-0  md:relative z-[30] '}>
                            <div
                                className={'p-3  items-center rounded-xl bg-white lg:sticky top-18'}>
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
