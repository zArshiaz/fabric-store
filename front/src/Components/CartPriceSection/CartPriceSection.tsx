'use client'

import {useCartContext} from "@/Contexts/CartContext";
import {useEffect, useMemo, useState} from "react";
import {IProduct} from "@/types/product";

function CartPriceSection() {
    const {subtotalBeforeDiscount,totalDiscount,payable} = useCartContext();
    const fmt = (n: number) => n.toLocaleString("fa-IR");

    return (
        <>
            {/*for desktop*/}
            <div className="text-base bg-rose-50 rounded-lg p-3 space-y-2">

                <div className="flex items-center justify-between">
                    <span> جمع کل محصولات</span>
                    <span className={'flex-1 mx-1 border-b-2 border-dashed border-gray-300'}></span>
                    <span className={'font-hamishe-bold'}>
                        <span className={'font-hamishe me-1'}>(تومان)</span> {payable.toLocaleString('fa')}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span>تخفیف</span>
                    <span className={'flex-1 mx-1 border-b-2 border-dashed border-gray-300'}></span>
                    <span className={'font-hamishe-bold'}>
                     <span className={'font-hamishe me-1'}>(تومان)</span> {totalDiscount.toLocaleString('fa')}
                    </span>
                </div>
            </div>
        </>
    );
}

export default CartPriceSection;
