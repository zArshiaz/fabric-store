import React from 'react'
import {IProduct} from "@/dtos/product";

function ProductAboutTab({product}: {product: IProduct}) {
    return (
        <div>
            <h2 className={'text-2xl sm:text-3xl mb-1 sm:mb-3'}>درباره این محصول</h2>
            <p className={'text-justify sm:text-[17px] text-gray-700'}>{product.description}</p>
            {
                product.finish && product.finish.length>0 &&(
                    <div className={'mt-4 sm:mt-8'}>
                        <h3 className={'text-xl sm:text-2xl mb-2 '}>ویژگی های این پارچه  :</h3>
                        <ul className={'ms-8 list-disc '}>
                            {
                                product.finish.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }

        </div>
    )
}

export default ProductAboutTab
