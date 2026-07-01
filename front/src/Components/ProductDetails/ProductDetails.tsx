import React from 'react'
import AddToCartSection from "@/Components/AddToCartSection/AddToCartSection";
import {FaShippingFast} from "react-icons/fa";
import {IProduct} from "@/dtos/product";
import PrintStarts from "@/Utilities/PrintStarts";
import {FaShareNodes} from "react-icons/fa6";
import CopyRouteButton from "@/Components/CopyRouteButton/CopyRouteButton";


function ProductDetails({product, className}: { product: IProduct,className?: string }) {

    return (
        <div className={`p-5 lg:p-8 bg-white rounded-xl shadow-myShadow shadow-gray-200 ${className}`}>
            <h3 className={'text-3xl mb-4'}>{product.name}</h3>
            <div className={'flex gap-2 mb-2 items-center'}>
                {/*stars*/}
                <PrintStarts count={product.ratingAvg}></PrintStarts>
                {/*comments*/}
                <div className={'flex gap-5 items-center text-sm lg:text-base'}>
                    <span className={'text-gray-600'}>({product.comments.length} نظر مشتری)</span>
                    {/*<a href="" className={'text-blue-500 hover:text-blue-700 cursor-pointer transition-colors'}>*/}
                    {/*    مشاهده نظرات*/}
                    {/*</a>*/}
                </div>
            </div>
            {/*price  */}

                <div className={' bg-red-50 rounded-xl p-4'}>
                    <div className={'text-3xl lg:text-[40px]  text-green-600'}>
                            <span className={'font-hamishe-bold me-2'}>
                                 {product.price.toLocaleString('fa-IR')}
                            </span>
                        <span> تومان</span>
                    </div>
                    <div className={'flex items-center justify-between gap-5 '}>
                        {
                            product.discount.active&&(
                                <del className={'text-gray-600 text-xl'}>
                                    {product.pricePerMeter.toLocaleString('fa')}
                                    تومان
                                </del>
                            )
                        }

                        {
                            /*badge*/
                            product.discount.active?(
                                <div className={'bg-red-500 rounded-full px-2 py-1 text-white'}>
                                    <span className={'me-1'}> {product.discount.percent.toLocaleString('fa')}</span>
                                    درصد تخفیف
                                </div>
                            ):(null)
                        }

                    </div>
                </div>

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

            {product.stockMeters>=0.5?(<AddToCartSection product={product}></AddToCartSection>):(<div>
                <div className={'grid grid-cols-12 my-5 h-13'}>
                    <div className={'col-span-10 flex justify-start text-red-600 items-center text-xl  '}>
                        محصول نام موجود
                    </div>
                    <CopyRouteButton></CopyRouteButton>
                </div>
            </div>)}


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
