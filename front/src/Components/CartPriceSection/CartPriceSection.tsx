'use client'

import {useCartContext} from "@/Contexts/CartContext";
import {useEffect, useMemo, useState} from "react";
import {IProduct} from "@/types/product";

function CartPriceSection() {
    const {cartItems} = useCartContext();

    const [productsData, setProductsData] = useState<IProduct[]>([]);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const r = await fetch("http://localhost:4000/api/product/all");
                const d = await r.json();
                if (isMounted) setProductsData(Array.isArray(d) ? d : []);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, []);


    const priceIndex = useMemo<Map<string, { price: number, priceBeforeDiscount: number }>>(
        () =>
            new Map(
                productsData.map((p) => [
                    p._id,
                    {
                        price: p.discount && p.pricePerMeterWithDiscount ? p.pricePerMeterWithDiscount : p.pricePerMeter,
                        priceBeforeDiscount: p.pricePerMeter
                    },
                ])
            ),
        [productsData]
    );

    console.log(priceIndex);

    // توابع کمکی
    const fmt = (n: number) => n.toLocaleString("fa-IR");

    // محاسبه‌ی مبالغ
    const {subtotalBeforeDiscount, totalDiscount, payable} = useMemo(() => {
        let subtotalBeforeDiscount = 0; // کل قبل از تخفیف
        let totalDiscount = 0;          // جمع تخفیف
        let payable = 0;                // مبلغ پرداختی

        for (const item of cartItems) {
            const pid = item._id;

            const meters = item.meters;

            const itemPrice = priceIndex.get(pid)?.price;

            const itemBefore = priceIndex.get(pid)?.priceBeforeDiscount;

            const lineBefore = meters * (itemBefore ?? 0);
            const lineNow = meters * (itemPrice ?? 0);
            const lineDiscount = Math.max(0, lineBefore - lineNow);

            subtotalBeforeDiscount += lineBefore;
            totalDiscount += lineDiscount;
            payable += lineNow;
        }

        return {subtotalBeforeDiscount, totalDiscount, payable};
    }, [cartItems, priceIndex]);

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


            {/*/!*for mobile*!/*/}
            {/*<div className={'md:hidden w-2/3 text-[12px] flex flex-col px-2'}>*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*        <span>کل سبد خرید (بدون تخفیف):</span>*/}
            {/*        <span className={'font-hamishe-bold'}>{subtotalBeforeDiscount.toLocaleString('fa')}</span>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*        <span>سود شما از این خرید:</span>*/}
            {/*        <span className={'font-hamishe-bold'}>{totalDiscount.toLocaleString('fa')}</span>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*        <span>مبلغ لازم به پرداخت:</span>*/}
            {/*        <span className={'font-hamishe-bold'}>{payable.toLocaleString('fa')}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default CartPriceSection;
