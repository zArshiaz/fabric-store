'use client'
import React, {useEffect, useMemo, useState} from 'react'
import AddToCartBtn from "@/Components/AddToCartBtn/AddToCartBtn";
import { IProduct, ICartItem} from "@/dtos/product";
import {useCartContext} from "@/Contexts/CartContext";
import Link from "next/link";
import PrintStarts from "@/Utilities/PrintStarts";
import {FaTrashAlt} from "react-icons/fa";
import { LuLoaderCircle } from 'react-icons/lu';
import {getProductById, getProductBySlug} from "@/api/product";

const CartItem = React.memo(function ({cartItem}: { cartItem: ICartItem}) {
    const {changeMeter, deleteItem,cartItems,getStockInCart,productIndex} = useCartContext()
    const [product, setProduct] = useState<IProduct>();
    const [count, setCount] = useState<number>(cartItem.meters);
    const [loading ,setLoading]=useState(true);
    const countInCart=useMemo(()=>{
        return getStockInCart(cartItem._id);
    },[cartItems]);
    const max = useMemo(() => {
       let stock=productIndex.get(cartItem._id)?.stock??0;
       return  Math.round((stock+count - countInCart)*10)/10
    }, [product,cartItems])
    const stock=productIndex.get(cartItem._id)?.stock??0

    useEffect(() => {
       getData()
    }, []);

    useEffect(() => {
        changeMeter(cartItem, count)
    }, [count]);

    let countFetch=1
    const getData=()=>{
        setLoading(true);
        getProductById(cartItem._id)
            .then(data =>{
                setProduct(data)
                setLoading(false)
            } )
            .catch(err =>{
                if(countFetch<=3)getData()
                if(countFetch>3) deleteItem(cartItem);
                countFetch+=1
                setLoading(false)
            }  )

    }
    if(loading)
        return(
        <div
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-3">
            <div className="flex flex-col justify-between sm:flex-row gap-4 sm:gap-3">
                <div className="relative flex justify-center items-center">
                    <div className={'aspect-square flex items-center justify-center w-full sm:w-43 rounded-xl bg-gray-300'}>
                        <LuLoaderCircle className={'text-5xl text-white animate-spin'} />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center bg-gray-300 rounded-xl  w-full min-h-20">

                </div>
            </div>
        </div>
    )

    if (product && !loading) return (
        <div
            className=" relative bg-white rounded-xl shadow-lg border border-gray-100 p-3">
            <div className="flex flex-col justify-between sm:flex-row gap-4 sm:gap-3">
                <Link prefetch={true} href={`/products/${product.slug}`} className="relative flex justify-center items-center">
                    <img className={' object-cover aspect-square w-full sm:w-43 rounded-xl shadow-lg overflow-hidden '}
                         src={product.images[0].url || '/images/placeholder.jpg'}
                         alt={product.images[0].alt || product.name}/>
                </Link>
                <div className="flex-1 flex flex-col justify-between w-full">
                    <div className="flex flex-row items-start justify-between">
                        <div className="">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2"> {product.name}</h3>
                            <div className="flex items-center gap-2 ">
                                <PrintStarts count={product.ratingAvg}></PrintStarts>
                                <span
                                    className="text-sm text-gray-500">({product.ratingCount.toLocaleString('fa')} نظر)</span>
                            </div>
                        </div>
                        <div className="text-left">
                            {
                                product.discount.active &&
                                (<p className="text-sm text-gray-500 line-through mb-1">
                                    {product.pricePerMeter.toLocaleString('fa')}
                                    تومان
                                </p>)
                            }

                            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-700 to-rose-300 bg-clip-text text-transparent">
                                {product.price.toLocaleString('fa')}
                                تومان
                            </p>
                            {
                                product.discount.active && (
                                    <span
                                        className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                                       {product.discount.percent.toLocaleString('fa')}%
                                        تخفیف
                                     </span>
                                )
                            }
                        </div>
                    </div>
                    <p className={'mb-1'}>
                        قیمت مقدار انتخاب شده :
                        <span className={'ms-2 font-bold text-green-600 bg-green-50 px-3  rounded-full'}>
                                   {(product.price*cartItem.meters).toLocaleString('fa')}
                            </span>
                    </p>
                    <div className="flex items-center justify-between gap-4">
                        <AddToCartBtn className={"z-20"} max={max} min={0.5} count={count} setCountAction={setCount}/>
                        <button onClick={()=>deleteItem(cartItem)}
                            className="bg-red-50 z-20 hover:bg-red-100 text-red-500 p-3 rounded-2xl transition-all duration-200 hover:scale-110">
                            <FaTrashAlt className={'text-xl'} />
                        </button>
                    </div>
                </div>
            </div>
            {stock<countInCart&&(<div className={'absolute inset-0 z-10 bg-black/40 rounded-xl flex justify-center items-center'}><span className={'text-xl text-white'}>محصول ناموجود</span></div>)}
        </div>
    )
})

export default CartItem

