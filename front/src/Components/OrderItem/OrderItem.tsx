'use client'
import {OrderDto} from "@/dtos/order.dto";
import {IoIosArrowBack} from "react-icons/io";
import Day from "@/Utilities/day";
import Link from "next/link";
import {useEffect, useState} from "react";

function OrderItem({order}: { order: OrderDto }) {
    const [timeLeft, setTimeLeft] = useState(Math.max(Math.floor((new Date(order.expiresAt).getTime() - Date.now()) / 1000)));
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                console.log(prev)

                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);
    useEffect(() => {
        console.log('r')

    });
    const minutes = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    if(order.status==="pending"&& timeLeft <=0) return null
    return (
        <div className={'p-3 rounded-lg bg-white'}>
            <div className={'flex justify-between'}>
                <div className={'flex gap-1 items-center'}>
                    <p className={'text-gray-600 '}>کد سفارش</p>
                    <p className={'text-sm'}>{order.orderNumber}</p>
                    <Day className={'text-xs ms-2 text-gray-500'} date={order.createdAt}></Day>
                </div>
                <div>
                    <p>
                        <span className={'me-1'}>{order.totalPrice.toLocaleString('fa')}</span>
                        <span>تومان</span>
                    </p>
                </div>
            </div>
            <div className={'mt-2 flex  justify-between items-end gap-3'}>

                <div className={'flex  max-h-24 h-fit flex-wrap  gap-2 flex-1'}>
                    {
                        order.items.map((item) => (
                            <div className={'text-xs w-17'}>
                                <img src={item.image} alt={item.name}
                                     className={'rounded-lg w-full aspect-square object-cover'}/>
                                <p className={'pt-1 px-1'}>{item.count.toLocaleString('fa')} متر</p>
                            </div>
                        ))
                    }
                </div>

                <Link href={`/ord/${order._id}`}
                      className={'flex items-center text-gray-500 transition rounded px-2 py-1 hover:bg-gray-100'}>
                    <span className={'text-sm ms-1'}>جزئیات</span>
                    <IoIosArrowBack className={'text-lg'}/>
                </Link>
            </div>
            {
                order.status === 'pending' && (
                    <div className={'flex justify-between items-end mt-2'}>
                        <div>
                            <h4 className={'text-red-500 text-lg'}>پرداخت نشده !</h4>
                            <div className="text-gray-600 text-sm sm:text-base">
                                <span dir="ltr" className="ml-2">{minutes.toLocaleString("fa")} : {secs.toLocaleString("fa").padStart(2, "۰")}</span>
                                <span className={'me-1 '}>تا حذف سفارش</span>
                            </div>
                        </div>
                        <div className={''}>
                            <Link href={`https://api.payping.ir/new/v2/pay/gotoipg/${order.paymentCode}`}
                                  className={' px-1 inline-block text-sm border rounded text-green-600 transition-all hover:bg-green-600 hover:text-white hover:scale-110  '}>پرداخت</Link>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default OrderItem
