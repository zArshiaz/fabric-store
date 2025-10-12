import React from 'react'
import Header from "@/Components/Header/Header";
import {IProduct} from "@/types/product";
import CartItem from "@/Components/CartItem/CartItem";
import ProductBox from "@/Components/ProductBox/ProductBox";
import Footer from "@/Components/Footer/Footer";

export default async function Products() {
    let products:IProduct[]= await fetch("http://localhost:4000/api/product/all")
        .then(response => response.json())
        .then(data => data);
    console.log(products);


    return (
        <div>
            <Header></Header>
            {/*product list*/}
            <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 sm:mt-24 ">
                {
                    products.map((product:IProduct) => <ProductBox key={product._id} product={product}/>)
                }
            </div>


            {/*<Footer></Footer>*/}
        </div>
    )
}
