'use client'
import TitlePage from "@/Components/TitlePage/TitlePage";
import {useCartContext} from "@/Contexts/CartContext";
import {IoShieldCheckmarkSharp} from "react-icons/io5";
import {useEffect, useState} from "react";
import {toast} from "@/Utilities/toast";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {ICartItem} from "@/dtos/product";
import {orderApi} from "@/api/order";
import {createPayment} from "@/api/payment";

function Page() {
    const [loading, setLoading] = useState<boolean>(false);
    const {payable, shoppingCost, cartItems, cartAddress, productIndex, resetCart} = useCartContext()
    const router = useRouter()
    const [payMode, setPayMode] = useState('')
    useEffect(() => {
        if (!cartItems?.length) {
            router.push("/order/cart");
            toast.fire({
                icon: 'warning',
                text: 'سبد خرید خالی است.'
            })
            return;
        }
        if (!cartAddress) {
            router.push("/order/address");
            toast.fire({
                icon: 'warning',
                text: 'ابتدا ادرس خود را انتخاب کنید.'
            })
            return;
        }
    }, []);

    const payHandler = async () => {
        if (!cartAddress) return
        if (!payMode) {
            Swal.fire({
                icon: 'warning',
                title: 'توجه',
                text: 'لطفا ابتدا درگاه پرداخت مورد نظر خود را انتخاب کنید بعد اقدام به پرداخت کنید.',
                confirmButtonText: 'باشه'
            })
        }
        if (payMode === 'payping') {
            setLoading(true);
            createPayment({items: cartItems, addressId: cartAddress._id})
                .then(data => {
                    resetCart();
                    router.push(data.paymentUrl);
                })
                .finally(() => {
                    setLoading(false);
                })
                .catch(error => {
                    toast.fire({
                        icon: 'error',
                        text:'خطا در پرداخت'
                    })
                })
        }

    }

    if (loading) return (<div className={'fixed bg-black/50 text-7xl inset-0 flex justify-center items-center z-50'}>
        <AiOutlineLoading3Quarters className={'text-white animate-spin '}/></div>)
    return (
        <div className={'container'}>
            <TitlePage title={'نحوه پرداخت'}/>
            <div className={'grid grid-cols-1 lg:grid-cols-8 gap-3'}>
                <div className={'lg:col-span-5 mb-[160px] md:mb-2 space-y-4'}>
                    <div className={'p-3 rounded-xl bg-white text-stone-700 space-y-2'}>
                        <div className={'flex gap-2'}>
                            <h4 className={'text-lg text-red-600'}>آدرس انتخابی : </h4>
                            <div className={'flex-1 flex gap-3'}>
                                <span>{cartAddress?.title}</span>
                                <span>{cartAddress?.city}</span>
                                <span className={'line-clamp-1'}>{cartAddress?.address}</span>
                            </div>
                        </div>
                        <div>
                            <h4 className={'text-lg text-red-600'}><span>آیتم ها :</span> (<span
                                className={'text-sm'}>{cartItems.length.toLocaleString('fa')} عدد</span>) </h4>
                            <ol className={'list-disc ms-5'}>
                                {cartItems?.map((item: ICartItem) => {
                                    let productDetails = productIndex.get(item._id)
                                    if (!productDetails) return
                                    return (
                                        <li key={item.key}>
                                           <span className={'flex gap-3'}>
                                               <p>{productDetails.name}</p>
                                               <p><span>{item.meters}</span> <span>متر</span></p>
                                               <p><span>{(item.meters * productDetails.price).toLocaleString('fa')}</span> <span>تومان</span></p>
                                           </span>
                                        </li>
                                    )
                                })}
                            </ol>
                        </div>
                    </div>
                    <button
                        onClick={() => setPayMode('payping')}
                        className={`p-3 text-xl flex w-full  gap-2  items-center rounded-xl bg-white border-2 ${payMode === 'payping' ? 'border-red-500 text-red-500 ' : ''}  shadow`}>
                        <IoShieldCheckmarkSharp className={'text-4xl'}/>
                        <span>پرداخت با پی پینگ</span>
                    </button>
                </div>

                <div className={'lg:col-span-3 fixed bottom-0 inset-x-0  md:relative'}>
                    <div
                        className={'p-3  items-center rounded-xl bg-white lg:sticky top-18'}>
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
                            onClick={payHandler}
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
