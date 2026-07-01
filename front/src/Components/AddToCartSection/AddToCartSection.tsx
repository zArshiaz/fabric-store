'use client'
import React, {useMemo} from "react";
import AddToCartBtn from "@/Components/AddToCartBtn/AddToCartBtn";
import {FaRegCircleCheck, FaRegTrashCan, FaShareNodes} from "react-icons/fa6";
import {IProduct} from "@/dtos/product";
import {useCartContext} from "@/Contexts/CartContext";
import {nanoid} from "nanoid";
import {toast} from "@/Utilities/toast";
import CopyRouteButton from '@/Components/CopyRouteButton/CopyRouteButton';


function AddToCartSection({product}: { product: IProduct }) {
    const [count, setCount] = React.useState<number>(0);
    const {addToCart, cartItems, deleteItem} = useCartContext();
    const max = useMemo(() => {
        let countInCart = 0;
        cartItems.forEach(cartItem => {
            if (cartItem._id === product._id) {
                countInCart += cartItem.meters
            }
        })

        return Math.round((product.stockMeters - countInCart)*10)/10
    }, [cartItems])
    const inCart = () => {
        return cartItems.filter((item) => {
            return item._id === product._id
        });
    }
    const addTOCartHandler = () => {
        if (count === 0) {
            toast.fire({
                icon: 'warning',
                text: 'لطفا مقدار محصول را به متر وارد کنید'
            })
            return
        }
        if (count > max) {
            toast.fire({
                icon: 'warning',
                text: 'این مقدار از محصول موجود نیست.'
            })
            return;
        }
        addToCart({
            _id: product._id,
            meters: count
        })
        setCount(0.5)
    }
    return (
        <>
            <div className={'grid grid-cols-1 xl:grid-cols-3 gap-5'}>
                <div className={'xl:col-span-2 flex gap-2 items-center'}>
                    <span>تعداد (متر):</span>
                    <AddToCartBtn max={max} count={count} setCountAction={setCount}></AddToCartBtn>
                </div>
                <div className={' flex items-center justify-around gap-6 '}>
                    <p className={'text-green-600 flex '}>
                        <FaRegCircleCheck className={'me-2'}/>
                        <span>  {product.stockMeters?.toLocaleString('fa')} متر موجود</span>
                    </p>
                    {!!count &&
                        <p>
                            <span className={'text-red-700'}>قیمت نهایی: </span>
                            <span className={'text-gray-500 ms-1'}>{(count * product.price).toLocaleString('fa')}</span>
                        </p>
                    }
                </div>
            </div>
            <div className={'grid grid-cols-12 my-5 h-13'}>
                <button onClick={addTOCartHandler}
                        className={'col-span-10 flex justify-center items-center rounded-xl text-lg cursor-pointer bg-red-700 text-white transition-all hover:shadow-lg'}>افزودن
                    به سبد خرید
                </button>
                <CopyRouteButton></CopyRouteButton>
            </div>
            {
                inCart().length !== 0 && <div className={'p-5'}>
                    <h5 className={'text-lg mb-2'}>در سبد خرید</h5>
                    <div className={'border-t-2 border-gray-200'}>
                        {
                            inCart().map((item, i) => (
                                <div key={nanoid()} className={'flex justify-between gap-9 my-3 '}>
                                    <div className={'flex items-center justify-between w-24 '}>
                                        <span>{item.meters.toLocaleString('fa')} متر </span>
                                        <button onClick={() => deleteItem(item)}
                                                className={'text-red-400 border-2 border-red-400  hover:bg-red-400 hover:text-white rounded-full w-7 aspect-square flex items-center justify-center'}>
                                            <FaRegTrashCan/>
                                        </button>
                                    </div>
                                    <span>
                                        {(item.meters * product.price).toLocaleString('fa')}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default AddToCartSection
