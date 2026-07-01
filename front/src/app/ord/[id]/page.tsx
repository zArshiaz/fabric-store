'use client'
import HeaderPage from "@/Components/HeaderPage/Page";
import Header from "@/Components/Header/Header";
import {useEffect, useState} from "react";
import {OrderDto} from "@/dtos/order.dto";
import {useParams} from "next/navigation";
import {getOrderById} from "@/api/order";
import Alert from "@/Components/Alert/Alert";
import {persianTitle} from "@/Utilities/day";
import {BsCheckCircle} from "react-icons/bs";
import {FiTruck} from "react-icons/fi";
import {GiBoxUnpacking} from "react-icons/gi";
import Loading from "@/Components/Loading/Loading";
import Link from "next/link";
import {BiTimeFive} from "react-icons/bi";

function OrderDetailsPage() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [order, setOrder] = useState<OrderDto | null>(null)
    const [timeLeft, setTimeLeft] = useState<number | null>();


    const getProgress = (status: string) => {
        switch (status) {
            case 'pending':
                return 0;
            case 'paid':
                return 0;
            case 'confirmed':
                return 33; // 33%
            case 'shipped':
                return 66;    // 66%
            case 'delivered':
                return 100; // 100%
            default:
                return 100;
        }
    };


    useEffect(() => {
        getOrderById(params.id as string).then(data => {
            setOrder(data)
        }).catch(e => {
            setError('خطا در گرفتن اطلاعات سفارش')
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    useEffect(() => {
        if (!order || order.status !== "pending") return;

        const calculateTimeLeft = () =>
            Math.max(
                0,
                Math.floor(
                    (new Date(order.expiresAt).getTime() - Date.now()) / 1000
                )
            );

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (!prev || prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);

    }, [order]);


    return (
        <div>
            <Header/>
            <div className={'container mt-2 sm:mt-20'}>
                <HeaderPage></HeaderPage>
                {loading && (<Loading/>)}
                {error && (<Alert type={'danger'}>{error}</Alert>)}


                {order && (
                    <div className={'grid sm:grid-cols-2 gap-4'}>
                        <div>
                            <div className={'bg-white rounded-xl p-4'}>
                                <p className={'flex justify-between items-center'}>
                                    <span className={'text-lg text-black'}>شماره سفارش :</span>
                                    <span className={'text-gray-700'}>{order.orderNumber}</span>
                                </p>
                                <p className={'flex justify-between items-center'}>
                                    <span className={'text-lg tet-black'}>تاریخ ثبت سفارش :</span>
                                    <span className={'text-gray-700'}>{persianTitle(new Date(order.createdAt))}</span>
                                </p>
                                {
                                    order.status === 'paid' && order.refid && (
                                        <p className={'flex justify-between items-center'}>
                                            <span className={'text-lg tet-black'}>شماره پرداخت :</span>
                                            <span className={'text-gray-700'}>{order.refid}</span>
                                        </p>
                                    )
                                }
                                <div className={'border-b-2 text-gray-300 my-2'}></div>
                                <p className={'flex justify-between items-center'}>
                                    <span className={'text-lg tet-black'}>گیرنده :</span>
                                    <span className={'text-gray-700'}>{order.user.name}</span>
                                </p>
                                <p className={'flex justify-between items-center'}>
                                    <span className={'text-lg tet-black'}>شماره تماس :</span>
                                    <span
                                        className={'text-gray-700'}>{order.address.phone.replace(/(\d{4})(\d{3})(\d{4})/, "$3 $2 $1")}</span>
                                </p>
                                <p className={'flex justify-between items-center gap-2'}>
                                    <span className={'text-lg tet-black'}>آدرس :</span>
                                    <span
                                        className={'text-gray-700 flex-1'}>{order.address.province + "," + order.address.city + "," + order.address.address}.</span>
                                </p>
                            </div>
                        </div>
                        <div className={'bg-white rounded-xl p-4'}>
                            <div className={'bg-red-100 rounded-lg p-3'}>
                                <p className={'text-lg font-hamishe-bold text-red-500'}>
                                    {order.status === 'pending' && (
                                        <span
                                            className={'flex items-center gap-1'}><BiTimeFive/><span>در انتظار پرداخت</span></span>)}
                                    {order.status === 'paid' && (
                                        <span
                                            className={'flex items-center gap-1'}><BiTimeFive/><span>پرداخت شده</span></span>)}
                                    {order.status === 'confirmed' && (
                                        <span
                                            className={'flex items-center gap-1'}><BsCheckCircle/><span>درحال پردازش</span></span>)}
                                    {order.status === 'shipped' && (
                                        <span className={'flex items-center gap-1'}><FiTruck/><span>تحویل به پست</span></span>)}
                                    {order.status === 'delivered' && (
                                        <span className={'flex items-center gap-1'}><GiBoxUnpacking/><span>تحویل داده شده</span></span>)}
                                    {order.status === 'canceled' && (
                                        <span className={'flex items-center gap-1'}>لغو شده</span>)}
                                    {order.status === 'expired' && (
                                        <span className={'flex items-center gap-1'}>منقضی شده</span>)}
                                </p>
                                {
                                    order.status !== 'pending'&& order.status !== 'expired' && (
                                        <div className='my-4'>
                                            <div className="bg-gray-200 rounded-full h-2.5 w-full">
                                                <div className={`bg-red-500 h-2.5 rounded-full`}
                                                     style={{width: `${getProgress(order.status)}%`}}/>
                                            </div>
                                        </div>
                                    )
                                }
                                {order.status !== 'canceled' && order.status !== 'delivered' && order.status !== 'pending' &&order.status !== 'expired' && (
                                    <div className={'flex items-center gap-1 text-red-400'}>
                                        <span className={''}>مرحله بعد :</span>
                                        {order.status === 'paid' && (
                                            <span className={'text-sm'}>تایید سفارش</span>)}
                                        {order.status === 'confirmed' && (
                                            <span className={'text-sm'}>تحویل به پست</span>)}
                                        {order.status === 'shipped' && (
                                            <span className={'text-sm'}>تحویل به مشتری</span>)}
                                    </div>
                                )}

                                {order.status === 'pending' && (
                                    <>
                                        {(timeLeft  && timeLeft > 0) && (
                                            <div className="text-sm text-red-500 mt-2 flex items-center gap-1">
                                                <span dir={'ltr'}>{Math.floor(timeLeft / 60).toLocaleString('fa')} :{(timeLeft % 60).toLocaleString('fa').padStart(2, '۰')}</span>
                                                <span>تا انقضای پرداخت</span>
                                            </div>
                                        )}

                                        {timeLeft === 0 ? (
                                            <p className="mt-2 text-gray-500">زمان پرداخت به پایان رسید</p>
                                        ) : (
                                            <Link
                                                href={`https://api.payping.ir/new/v2/pay/gotoipg/${order.paymentCode}`}
                                                className="mt-2 py-1 font-hamishe-bold block border-3 text-center rounded-lg text-green-600 transition-all hover:bg-green-600 hover:text-white hover:border-green-600"
                                            >
                                                پرداخت
                                            </Link>
                                        )}
                                    </>
                                )}

                            </div>
                            <div className={'my-3'}>
                                <p className={'flex justify-between items-center'}>
                                    <span className={'text-lg tet-black'}>کد مرسوله :</span>
                                    <span className={'text-gray-700'}>{order.orderNumber}</span>
                                </p>
                                <p className={'flex justify-between items-center'}>
                                    <span className={'text-lg tet-black'}>هزینه ارسال :</span>
                                    <span
                                        className={'text-gray-700'}>{order.addressCost.toLocaleString('fa')} تومان</span>
                                </p>
                                <p className={'flex justify-between items-center'}>
                                    <span className={'text-lg tet-black'}>جمع کل محصولات سفارش :</span>
                                    <span
                                        className={'text-gray-700'}>{order.productsCost.toLocaleString('fa')} تومان</span>
                                </p>
                                <p className={'flex justify-between items-center'}>
                                    <span className={'text-lg tet-black'}>مبلغ پرداختی :</span>
                                    <span
                                        className={'text-gray-700'}>{order.totalPrice.toLocaleString('fa')} تومان</span>
                                </p>
                            </div>
                            <div className={'flex flex-col gap-2'}>
                                {order.items.map((item, i) =>
                                    <div className={'flex gap-3'} key={item.name + item.count + i}>
                                        <img className={'w-24 rounded'} src={item.image} alt={item.name}/>
                                        <div className={'flex-1 py- flex flex-col justify-between'}>
                                            <p className={'text-lg'}>{item.name}</p>
                                            {
                                                item.discountPrice > 0 && (
                                                    <div
                                                        className={'flex justify-between items-center text-sm text-gray-700'}>
                                                        <span>میزان تخفیف</span>
                                                        <span>{(item.discountPrice * item.count).toLocaleString('fa')} تومان</span>
                                                    </div>
                                                )
                                            }
                                            <p className={'flex justify-between items-center'}>
                                                <span>{item.count.toLocaleString('fa')} متر</span>
                                                <span>{(item.price * item.count).toLocaleString('fa')}تومان</span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>

    )
}

export default OrderDetailsPage

