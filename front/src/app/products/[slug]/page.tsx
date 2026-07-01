import React from 'react'
import ProductDetails from "@/Components/ProductDetails/ProductDetails";
import ProductGallery from "@/Components/ProductGallery/ProductGallery";
import {IProduct} from "@/dtos/product";
import ProductDetailsNavs from "@/Components/ProductDetailsNavs/ProductDetailsNavs";
import {IComment} from "@/dtos/comment";
import {getProductBySlug} from "@/api/product";

type props = {
    params: Promise<{ slug: string }>,
}

async function ProductPage({params}: props) {
    const {slug} = await params;
    const product:IProduct = await getProductBySlug(slug)
    const comments:IComment[]=product.comments

    if (product) return (
        <>
            <div className="container mb-5">
                <div className={'mt-2 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6  mb-3 relative'}>
                    <div >
                        <ProductGallery images={product.images} className={'md:sticky top-20 '}></ProductGallery>
                    </div>
                    <div>
                        <ProductDetails product={product}></ProductDetails>
                    </div>
                </div>
                <div className={''}>
                    <ProductDetailsNavs product={product}></ProductDetailsNavs>
                </div>
            </div>

        </>
    )
}

export default ProductPage
