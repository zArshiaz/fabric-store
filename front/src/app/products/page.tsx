import React from 'react'
import {IProduct} from "@/types/product";
import ProductBox from "@/Components/ProductBox/ProductBox";
import {IPagination} from "@/types/pagination";
import Pagination from "@/Components/Pagination/Pagination";
import SearchProductsBox from "@/Components/SearchProductsBox/SearchProductsBox";
import Alert from "@/Components/Alert/Alert";


interface Props {
    searchParams: Promise<{ category: string ,search:string,page:string,limit:string}>
}


export default async function ProductsPage({searchParams}: Props) {
    const query = await searchParams
    let {category = 'all',page='1',limit='1',search=''} = query;
    let queryString=new URLSearchParams();
    queryString.set('limit',limit);
    queryString.set("page",page);
    if (Array.isArray(category)) {
        category.forEach((cat) => {
            queryString.append('category', cat);
        });
    } else queryString.set("category", category);

    if(search.trim()!=='')  queryString.set('search',search);


    const url = `http://localhost:4000/api/product?${queryString.toString()}`;
    console.log(url)


    let res: { products: IProduct[], pagination: IPagination } = await fetch(url)
        .then(response => response.json())

    const products = res.products;
    const pagination = res.pagination;


    return (
        <div>
            <div className={'container mt-5 sm:mt-20'}>
                <div
                    className="bg-white rounded-xl shadow p-3 mb-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                                {category === 'all' ? 'کل محصولات' : `محصولات پیدا شده`}
                            </h1>
                        </div>
                        <SearchProductsBox></SearchProductsBox>
                    </div>
                </div>
                {/*product list*/}
                {
                    products.length > 0 ?(
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                             {
                            products.map((product: IProduct) => <ProductBox key={product._id} product={product}/>)
                        }
                        </div>):(<Alert type={'warning'} >محصولی یافت نشد </Alert>)
                }
                <Pagination pagination={pagination} queryString={queryString} />
            </div>





            {/*<Footer></Footer>*/}
        </div>
    )
}


