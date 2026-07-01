'use client'
import React, {useEffect, useMemo} from 'react'
import {getAllOrders} from "@/api/order";
import {OrdersDto} from "@/dtos/order.dto";
import Alert from "@/Components/Alert/Alert";
import Loading from "@/Components/Loading/Loading";
import OrderItem from "@/Components/OrderItem/OrderItem";

function OrdersPage() {
    const [orders, setOrders] = React.useState<OrdersDto>([])
    const [activeTab, setActiveTab] = React.useState<'processing'|'canceled'|'delivered'>('processing');
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);
    const orderFiltered=useMemo<OrdersDto>(()=>{
        if(activeTab === 'processing'){
          return  orders.filter(order => (order.status!=='delivered'&&order.status!=='canceled'))
        }
        if(activeTab === 'canceled'){
            return orders.filter(order => order.status==='canceled');
        }
        if(activeTab === 'delivered'){
            return orders.filter(order => order.status==='delivered');
        }
        return orders
    },[orders,activeTab])

    const getOrders = () => {
        getAllOrders()
            .then((orders) => setOrders(orders))
            .finally(() => setLoading(false))
            .catch(error => setError(error))
    }
    useEffect(() => {
        getOrders();
    }, [])

    if (loading) return <Loading className={'py-5'}></Loading>
    if(error) return <Alert type={'danger'}><p>خطا در گرفتن سفارش ها .</p></Alert>

    return (
        <div>
            <div className={'pb-2 mb-1  flex items-center justify-between'}>
                <h4 className={'text-2xl'}>سفارش ها</h4>
            </div>
            <div className={'flex overflow-hidden text-sm border-b-3 border-gray-200'}>
                <button onClick={()=>setActiveTab('processing')} className={`flex-1 transition-all   py-3 rounded-t-xl ${activeTab==='processing'?'bg-red-500 text-white':''}`}>درحال پردازش</button>
                <button onClick={()=>setActiveTab('delivered')} className={`flex-1 transition-all   py-3 rounded-t-xl ${activeTab==='delivered'?'bg-red-500 text-white':''}`}>تحویل شده</button>
                <button onClick={()=>setActiveTab('canceled')} className={`flex-1 transition-all   py-3 rounded-t-xl ${activeTab==='canceled'?'bg-red-500 text-white':''}`}>لغو شده</button>
            </div>
           <div className={'flex flex-col gap-3 mt-3'}>
               {
                   orderFiltered.map((order) => (
                       <OrderItem key={order._id} order={order}></OrderItem>
                   ))
               }
               {orderFiltered.length === 0 &&(
                   <div className={''}>
                       <Alert  type={"warning"}><p>سفارشی یافت نشد</p></Alert>
                   </div>
                   )}
           </div>
        </div>

    )
}

export default OrdersPage
