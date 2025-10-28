import React from 'react'
import Header from "@/Components/Header/Header";
import ProductDetails from "@/Components/ProductDetails/ProductDetails";
import ProductGallery from "@/Components/ProductGallery/ProductGallery";
import {IProduct} from "@/types/product";
import ProductDetailsNavs from "@/Components/ProductDetailsNavs/ProductDetailsNavs";
import {IComment} from "@/types/comment";

type props = {
    params: Promise<{ slug: string }>,
}

async function ProductPage({params}: props) {
    const {slug} = await params;
    const product:IProduct = await fetch(`http://localhost:4000/api/product/${slug}`).then(res => res.json());
    const comments:IComment[]=await fetch(`http://localhost:4000/api/comment/${product._id}`).then(res => res.json())||[];

    if (product) return (
        <>
            <Header></Header>
            <div className="container">
                <div className={'mt-2 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6 mb-6  relative'}>
                    <div >
                        <ProductGallery images={product.images} className={'md:sticky top-20 '}></ProductGallery>
                    </div>
                    <div>
                        <ProductDetails comments={comments} product={product}></ProductDetails>
                    </div>
                </div>
                <div className={'mb-44'}>
                    <ProductDetailsNavs comments={comments} productId={product._id}></ProductDetailsNavs>
                </div>
            </div>

        </>
    )
}

export default ProductPage
