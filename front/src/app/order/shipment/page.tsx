'use client'
import TitlePage from "@/Components/TitlePage/TitlePage";
import  {useCartContext} from "@/Contexts/CartContext";
import {useRouter} from "next/navigation";


function Page() {
    const {payable,totalDiscount,cartLength,shoppingCost}=useCartContext()
    const length=cartLength();
    const router = useRouter();
    const changeRoutHandler=()=>{
        router.push("/order/payment");
    }
    return (
        <div className={'container'}>
            <TitlePage title={'شیوه ارسال'}/>
            <div className={'grid grid-cols-1 lg:grid-cols-8 gap-3'}>
                <div className={'lg:col-span-5'}>
                    <div className={'p-3  items-center rounded-xl bg-white'}>
                        <p className={'text-lg'}>محصول با پست پیشتاز ارسال میشود</p>
                    </div>
                </div>

                <div className={'lg:col-span-3'}>
                    <div
                        className={'p-3  items-center rounded-xl bg-white'}>
                        <div className={' bg-rose-50 rounded-lg p-3 space-y-2'}>
                            <div className={'flex justify-between'}><span>تعداد کل محصولات :</span><span className={'font-hamishe-bold'}> عدد  {length.toLocaleString('fa')} </span></div>

                            <div className={'flex justify-between'}><span>جمع کل محصولات :</span><span className={'font-hamishe-bold'}>تومان {payable.toLocaleString('fa')} </span></div>
                            <div className={'flex justify-between'}><span> هزینه ارسال :</span><span className={'font-hamishe-bold'}>تومان {shoppingCost.toLocaleString('fa')} </span></div>
                        </div>
                        <button
                            onClick={changeRoutHandler}
                            className={'mt-3 py-3 w-full text-sm md:text-base rounded-lg text-white bg-linear-to-r from-red-800 to-red-500 shadow shadow-black/20 cursor-pointer'}>
                              انتخاب شیوه پرداخت
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Page
