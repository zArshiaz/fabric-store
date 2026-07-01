'use client';
import {useState} from "react";
import ProductAboutTab from "@/Components/ProductAboutTab/ProductAboutTab";
import ProductDetailsTab from "@/Components/ProductDetailsTab/ProductDetailsTab";
import ProductCommentsTab from "@/Components/ProductCommentsTab/ProductCommentsTab";
import {IComment} from "@/dtos/comment";
import {IProduct} from "@/dtos/product";

function ProductDetailsNavs({product}: {product:IProduct}    ) {
    const [tabActive, setTabActive] = useState<'about'|'comments'|'details'>('about')
    return (
        <div>
            <ul>
                <li className={'flex    [&>*]:py-3 [&>*]:flex-1 [&>*]:rounded-t-xl [&>*]:text-base  sm:[&>*]:text-lg [&>*]:cursor-pointer [&>*]:transition-all '}>
                    <button onClick={()=>setTabActive('about')} className={tabActive==='about'?'bg-red-500 text-white shadow-lg':'border-b-3 border-gray-300 text-zinc-600'}>درباره محصول</button>
                    <button onClick={()=>setTabActive('details')} className={tabActive==='details'?'bg-red-500 text-white shadow-lg':'border-b-3 border-gray-300 text-zinc-600'}>مشخصات فنی</button>
                    <button onClick={()=>setTabActive('comments')} className={tabActive==='comments'?'bg-red-500 text-white shadow-lg':'border-b-3 border-gray-300 text-zinc-600'}>نظر ها</button>
                </li>
            </ul>
            <div className={'mt-3 bg-white px-3 py-4 sm:px-6 sm:py-8 rounded-xl shadow-myShadow shadow-red-300/30'}>
                {tabActive==='about'&& <ProductAboutTab product={product}></ProductAboutTab>}
                {tabActive==='details'&& <ProductDetailsTab product={product}></ProductDetailsTab>}
                {tabActive==='comments'&& <ProductCommentsTab product={product}></ProductCommentsTab>}
            </div>
        </div>
    )
}

export default ProductDetailsNavs
