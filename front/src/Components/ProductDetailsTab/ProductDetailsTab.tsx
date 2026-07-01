import React from 'react'
import {IProduct} from "@/dtos/product";

function ProductDetailsTab({product}:{product:IProduct}) {
    return (
        <div>
            <h2 className={'text-2xl sm:text-3xl mb-3 sm:mb-5'}>مشخصات این محصول</h2>

            <table
                className="w-full border-collapse  text-gray-800  [&_td]:border [&_td]:border-gray-300  [&_td]:p-2 sm:[&_td]:p-3 [&_td]:text-right  [&_tr:nth-child(even)]:bg-gray-50  shadow">
                <tbody>
                <tr>
                    <td >جنس پارچه</td>
                    <td>{product.composition}</td>
                </tr>
                <tr>
                    <td>عرض</td>
                    <td>{product.widthCm.toLocaleString('fa')} سانتی‌متر</td>
                </tr>
                <tr>
                    <td>برند</td>
                    <td>{product.brand}</td>
                </tr>
                <tr>
                    <td>کد محصول</td>
                    <td>{product.slug}</td>
                </tr>
                <tr>
                    <td>طرح محصول</td>
                    <td>{product.pattern}</td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default ProductDetailsTab
