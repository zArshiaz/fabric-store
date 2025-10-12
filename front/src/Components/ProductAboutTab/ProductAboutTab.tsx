import React from 'react'

function ProductAboutTab() {
    return (
        <div>
            <h2 className={'text-2xl sm:text-3xl mb-1 sm:mb-3'}>درباره این محصول</h2>
            <p className={'text-justify sm:text-[17px] text-gray-700'}>این پارچه با استفاده از بهترین الیاف ابریشمی و با تکنولوژی روز دنیا تولید شده است. براقی طبیعی و نرمی فوق‌العاده آن، این پارچه را به گزینه‌ای ایده‌آل برای طراحان مد و خیاطان حرفه‌ای تبدیل کرده است.</p>

            <div className={'mt-4 sm:mt-8'}>
                <h3 className={'text-xl sm:text-2xl mb-2 '}>کاربرد های این پارچه  :</h3>
                <ul className={'ms-8 list-disc '}>
                    <li>لباس‌های مجلسی و شب</li>
                    <li>پیراهن‌های رسمی</li>
                    <li>روسری و شال</li>
                    <li>آستر لباس</li>
                    <li>تزیینات داخلی</li>
                </ul>
            </div>

        </div>
    )
}

export default ProductAboutTab
