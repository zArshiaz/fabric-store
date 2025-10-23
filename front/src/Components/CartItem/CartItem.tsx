'use client'
import React, {useEffect, useState} from 'react'
import AddToCartBtn from "@/Components/AddToCartBtn/AddToCartBtn";
import {ICartItem, IProduct, IProductCart} from "@/types/product";
import {useCartContext} from "@/Contexts/CartContext";
import {MdOutlineDeleteForever} from "react-icons/md";
import Link from "next/link";
import PrintStarts from "@/Utilities/PrintStarts";
import {FaTrashAlt} from "react-icons/fa";

const CartItem = React.memo(function ({cartItem}: { cartItem: ICartItem}) {
    const {changeMeter, deleteItem} = useCartContext()
    const [product, setProduct] = useState<IProduct>();
    const [count, setCount] = useState<number>(cartItem.meters);

    useEffect(() => {
        fetch(`http://localhost:4000/api/product/${cartItem._id}`,{cache:'force-cache'}).then(res => res.json()).then(data => setProduct(data));
        console.log('fetch cart item')

    }, [cartItem]);

    useEffect(() => {
        changeMeter(cartItem, count)
    }, [count]);

    if (product) return (
        <div
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-3">
            <div className="flex flex-col justify-between sm:flex-row gap-4 sm:gap-3">
                <Link href={`/products/${product.slug}`} className="relative flex justify-center items-center">
                    <img className={' object-cover aspect-square w-full sm:w-43 rounded-xl shadow-lg overflow-hidden '}
                         src={product.images[0].url || '/images/placeholder.jpg'}
                         alt={product.images[0].alt || product.name}/>
                </Link>
                <div className="flex-1 flex flex-col justify-between w-full">
                    <div className="flex flex-row items-start justify-between">
                        <div className="">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2"> {product.name}</h3>
                            <div className="flex items-center gap-2 ">
                                <PrintStarts count={product.ratingCount}></PrintStarts>
                                <span
                                    className="text-sm text-gray-500">({product.ratingAvg?.toLocaleString('fa')} نظر)</span>
                            </div>
                        </div>
                        <div className="text-left">
                            {
                                product.discount && product.pricePerMeterWithDiscount &&
                                (<p className="text-sm text-gray-500 line-through mb-1">
                                    {product.pricePerMeter.toLocaleString('fa')}
                                    تومان
                                </p>)
                            }

                            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-700 to-rose-300 bg-clip-text text-transparent">
                                {(product.discount ? product.pricePerMeterWithDiscount : product.pricePerMeter)?.toLocaleString('fa')}
                                تومان
                            </p>
                            {
                                product.discount &&product.pricePerMeterWithDiscount && (
                                    <span
                                        className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                                       {Math.floor(100 - (100 * (product.pricePerMeterWithDiscount)) / product.pricePerMeter).toLocaleString('fa')}%
                                        تخفیف
                                     </span>
                                )
                            }
                        </div>
                    </div>
                    <p className={'mb-1'}>
                        قیمت مقدار انتخاب شده :
                        <span className={'ms-2 font-bold text-green-600 bg-green-50 px-3  rounded-full'}>
                                   {product.discount && product.pricePerMeterWithDiscount?(product.pricePerMeterWithDiscount*cartItem.meters).toLocaleString('fa'):(product.pricePerMeter*cartItem.meters).toLocaleString('fa')}
                            </span>
                    </p>
                    <div className="flex items-center justify-between gap-4">
                        <AddToCartBtn count={count} setCountAction={setCount}/>
                        <button onClick={()=>deleteItem(cartItem)}
                            className="bg-red-50 hover:bg-red-100 text-red-500 p-3 rounded-2xl transition-all duration-200 hover:scale-110">
                            <FaTrashAlt className={'text-xl'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default CartItem


// <div
// className={'relative overflow-hidden grid grid-cols-1 sm:grid-cols-12  sm:gap-5 border-2 rounded-xl p-3 bg-white border-gray-200 shadow-myShadow shadow-gray-200'}>
//     <Link className={'sm:col-span-5 md:col-span-4 lg:col-span-3 flex items-center  cursor-pointer'} href={`/products/${product.slug}`}>
// <img className={' object-cover aspect-square w-full  rounded-lg overflow-hidden '}
// src={product.images[0].url || '/images/placeholder.jpg'}
// alt={product.images[0].alt || product.name}/>
// </Link>
// <div className={'sm:col-span-7 md:col-span-8 lg:col-span-9 sm:py-2 flex flex-col justify-between items-start '}>
//     <div>
//         <h3 className={'mt-2 sm:mt-0 text-xl lg:text-2xl'}>{product.name}</h3>
//         {/*<p className={'mt-1 lg:mt-2 text-sm lg:text-base text-stone-600 line-clamp-2'}>{product.description}</p>*/}
//         <p className={'mt-1'}>
//
//             <span>قیمت(هر متر) :</span>
//             {product.discount && product.pricePerMeterWithDiscount &&
//                 <del className={'mx-2 text-red-300'}>
//                     {product.pricePerMeter.toLocaleString('fa')}
//                 </del>
//             }
//
//             <span className={'ms-2 font-hamishe-bold text-stone-600'}>
//                                 {product.discount ? product.pricePerMeterWithDiscount?.toLocaleString('fa') : product.pricePerMeter.toLocaleString('fa')}
//                             </span>
//         </p>
//     </div>
//     <div className={'grid grid-cols-1 sm:grid-cols-3 w-full'}>
//         <div className={' sm:col-span-1 flex items-end space-y-1'}>
//             <p className={'text-lg lg:text-xl'}>
//                             <span>
//                                 کل :
//                             </span>
//                 <span className={'ms-2 font-hamishe-bold text-green-600'}>
//                                 {product.discount && product.pricePerMeterWithDiscount?(product.pricePerMeterWithDiscount*cartItem.meters).toLocaleString('fa'):(product.pricePerMeter*cartItem.meters).toLocaleString('fa')}
//                             </span>
//             </p>
//         </div>
//         <div className={'sm:col-span-2 flex justify-center sm:justify-end'}>
//             <AddToCartBtn count={count} setCountAction={setCount}></AddToCartBtn>
//         </div>
//     </div>
//
//     {/*btn delete product*/}
//     <button className={'absolute top-3 right-3 text-3xl sm:text-2xl text-gray-500 cursor-pointer p-1 hover:text-red-500'}>
//         <MdOutlineDeleteForever onClick={() => deleteItem(cartItem)} />
//     </button>
// </div>
// </div>