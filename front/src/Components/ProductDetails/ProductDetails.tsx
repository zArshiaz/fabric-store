'use client'
import React, {useMemo} from 'react'
import AddToCartSection from "@/Components/AddToCartSection/AddToCartSection";
import {FaShippingFast} from "react-icons/fa";
import {IProduct} from "@/types/product";
import PrintStarts from "@/Utilities/PrintStarts";
import {IComment} from "@/types/comment";

function ProductDetails({product,comments, className}: { product: IProduct,comments:IComment[], className?: string }) {
    const averageStars = () => {
        if (comments.length === 0) return 0;
        const sum = comments.reduce((s, c) => s + (Number(c?.stars) || 0), 0);
        return Math.round((sum / comments.length) * 10) / 10;
    };
    return (
        <div className={`p-5 lg:p-8 bg-white rounded-xl shadow-myShadow shadow-gray-200 ${className}`}>
            <h3 className={'text-3xl mb-4'}>{product.name}</h3>
            <div className={'flex gap-2 mb-2 items-center'}>
                {/*stars*/}
                <PrintStarts count={averageStars()}></PrintStarts>
                {/*comments*/}
                <div className={'flex gap-5 items-center text-sm lg:text-base'}>
                    <span className={'text-gray-600'}>({comments.length} نظر مشتری)</span>
                    {/*<a href="" className={'text-blue-500 hover:text-blue-700 cursor-pointer transition-colors'}>*/}
                    {/*    مشاهده نظرات*/}
                    {/*</a>*/}
                </div>
            </div>
            {/*price  */}
            {product.discount && product.pricePerMeterWithDiscount ?
                (<div className={' bg-red-50 rounded-xl p-4'}>
                    <div className={'text-3xl lg:text-[40px]  text-green-600'}>
                            <span className={'font-hamishe-bold me-2'}>
                                 {product.pricePerMeterWithDiscount.toLocaleString('fa-IR')}
                            </span>
                        <span> تومان</span>
                    </div>
                    <div className={'flex items-center justify-between gap-5 '}>
                        <del className={'text-gray-600 text-xl'}>
                            {product.pricePerMeter.toLocaleString('fa')}
                            تومان
                        </del>
                        {/*badge*/}
                        <div className={'bg-red-500 rounded-full px-2 py-1 text-white'}>
                                <span
                                    className={'me-1'}> {Math.floor(100 - (100 * (product.pricePerMeterWithDiscount)) / product.pricePerMeter).toLocaleString('fa')}</span>
                            درصد تخفیف
                        </div>
                    </div>
                </div>) :
                (<div className={'text-3xl lg:text-[40px] p-6 text-green-600 bg-red-50 rounded-xl'}>
                    <div>
                        <span className={'font-hamishe-bold me-2'}>
                                {product.pricePerMeter.toLocaleString('fa-IR')}
                        </span>
                        <span>
                            تومان
                        </span>
                    </div>
                </div>)
            }

            <div className={'my-3 space-y-2'}>
                {/*color*/}
                <div>
                    رنگ محصول :
                    <span className={'text-gray-600 ms-2 '}>{product.colorName}</span>
                </div>
                {/*width*/}
                <div>
                    عرض محصول :
                    <span className={'text-gray-600 ms-2 '}> (cm) {product.widthCm?.toLocaleString('fa')} </span>
                </div>
            </div>
            {/*add to cart*/}
            <AddToCartSection product={product}></AddToCartSection>

            {/*product  property*/}
            <div className={'p-5 rounded-xl bg-red-50'}>
                <h3 className={'text-lg'}>ویژگی ها محصول</h3>
                <div className={'mt-4 border-spacing-1'}>
                    <div className={'h-[60px] flex gap-3'}>
                        {/*icon*/}
                        <div
                            className={' h-10 aspect-square rounded-full bg-red-800 text-white flex items-center justify-center'}>
                            <FaShippingFast className={'text-xl'}/>
                        </div>
                        <div className={'text-sm'}>
                            <p className={'font-hamishe-bold'}>ارسال رایگان </p>
                            <p className={'text-gray-700'}>برای خرید های بالای 500 هزارتومان</p>
                        </div>
                    </div>
                    <div className={'h-[60px] flex gap-3'}>
                        {/*icon*/}
                        <div
                            className={' h-10 aspect-square rounded-full bg-red-800 text-white flex items-center justify-center'}>
                            <FaShippingFast className={'text-xl'}/>
                        </div>
                        <div className={'text-sm'}>
                            <p className={'font-hamishe-bold'}>ارسال رایگان </p>
                            <p className={'text-gray-700'}>برای خرید های بالای 500 هزارتومان</p>
                        </div>
                    </div>
                    <div className={'h-[60px] flex gap-3'}>
                        {/*icon*/}
                        <div
                            className={' h-10 aspect-square rounded-full bg-red-800 text-white flex items-center justify-center'}>
                            <FaShippingFast className={'text-xl'}/>
                        </div>
                        <div className={'text-sm'}>
                            <p className={'font-hamishe-bold'}>ارسال رایگان </p>
                            <p className={'text-gray-700'}>برای خرید های بالای 500 هزارتومان</p>
                        </div>
                    </div>
                    <div className={'h-[60px] flex gap-3'}>
                        {/*icon*/}
                        <div
                            className={' h-10 aspect-square rounded-full bg-red-800 text-white flex items-center justify-center'}>
                            <FaShippingFast className={'text-xl'}/>
                        </div>
                        <div className={'text-sm'}>
                            <p className={'font-hamishe-bold'}>ارسال رایگان </p>
                            <p className={'text-gray-700'}>برای خرید های بالای 500 هزارتومان</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
