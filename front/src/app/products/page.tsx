import React from 'react'
import Header from "@/Components/Header/Header";
import {IProduct} from "@/types/product";
import ProductBox from "@/Components/ProductBox/ProductBox";

interface Props {
    searchParams:Promise<{category:string}>
}


export default async function ProductsPage({searchParams}: Props) {
    const query=await searchParams
    let {category='all'}=query;
    let queryString ;

    if (Array.isArray(category)) {
        queryString = category.map(cat => `category=${encodeURIComponent(cat)}`).join('&');
    } else {
        queryString = `category=${encodeURIComponent(category)}`;

    }
    const url = `http://localhost:4000/api/product/all?${queryString}`;


    let products:IProduct[]= await fetch(url)
        .then(response => response.json())
        .then(data => data);



    return (
        <div>
            <Header></Header>

            <div className={'container mt-5 sm:mt-20'}>
                <div
                    className="bg-white rounded-xl shadow p-3 mb-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="">
                            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                                {category==='all'? 'کل محوصلات':`محصولات پیدا شده`}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        products.map((product:IProduct) => <ProductBox key={product._id} product={product}/>)
                    }
                </div>
            </div>
            {/*product list*/}



            {/*<Footer></Footer>*/}
        </div>
    )
}
