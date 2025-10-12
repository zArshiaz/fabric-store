'use client';
import {useState} from "react";
import ProductAboutTab from "@/Components/ProductAboutTab/ProductAboutTab";
import ProductDetailsTab from "@/Components/ProductDetailsTab/ProductDetailsTab";
import ProductCommentsTab from "@/Components/ProductCommentsTab/ProductCommentsTab";
import {IComment} from "@/types/comment";

function ProductDetailsNavs({productId,comments}: {productId: string,comments: IComment[]}    ) {
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
                {tabActive==='about'&& <ProductAboutTab></ProductAboutTab>}
                {tabActive==='details'&& <ProductDetailsTab></ProductDetailsTab>}
                {tabActive==='comments'&& <ProductCommentsTab productId={productId}></ProductCommentsTab>}
            </div>
        </div>
    )
}

export default ProductDetailsNavs
