import React from 'react'

function ProductDetailsTab() {
    return (
        <div>
            <h2 className={'text-2xl sm:text-3xl mb-3 sm:mb-5'}>مشخصات این محصول</h2>

            <table
                className="w-full border-collapse  text-gray-800  [&_td]:border [&_td]:border-gray-300  [&_td]:p-2 sm:[&_td]:p-3 [&_td]:text-right  [&_tr:nth-child(even)]:bg-gray-50  shadow">
                <tbody>
                <tr>
                    <td >جنس پارچه</td>
                    <td>۱۰۰٪ ابریشم طبیعی</td>
                </tr>
                <tr>
                    <td>وزن</td>
                    <td>۱۲۰ گرم بر متر مربع</td>
                </tr>
                <tr>
                    <td>عرض</td>
                    <td>۱۵۰، ۲۰۰، ۲۵۰ سانتی‌متر</td>
                </tr>
                <tr>
                    <td>نوع بافت</td>
                    <td>ساتن ۸ تار</td>
                </tr>
                <tr>
                    <td>کشور تولید</td>
                    <td>ایران</td>
                </tr>
                <tr>
                    <td>مقاومت رنگ</td>
                    <td>درجه ۴ (عالی)</td>
                </tr>
                <tr>
                    <td>قابلیت شستشو</td>
                    <td>خشکشویی توصیه می‌شود</td>
                </tr>
                <tr>
                    <td>مقاومت در برابر چروک</td>
                    <td>متوسط</td>
                </tr>
                <tr>
                    <td>کد محصول</td>
                    <td>SAT-LUX-001</td>
                </tr>
                <tr>
                    <td>برند</td>
                    <td>پریمیوم تکسچر</td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default ProductDetailsTab
