'use client'
import React, {useEffect} from 'react'
import ProductBox from "@/Components/ProductBox/ProductBox";
import {IoCaretBackOutline} from "react-icons/io5";
import {IProduct} from "@/types/product";
import {Swiper,SwiperSlide} from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";



function LastProducts() {
    const [products,setProducts] = React.useState<IProduct[]>([]);
    useEffect(()=>{
           fetch("http://localhost:4000/api/product/all").then(res=>res.json()).then(d=>setProducts(d.products));
    },[])


    return (
        <div className={'container mt-18 mb-9'}>
            <h3 className={'text-3xl mb-9  flex'}>
                <IoCaretBackOutline className={'text-red-600'}/>
                آخرین محصول ها
            </h3>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={2}
                navigation={{ enabled: false }}
                loop={true}
                pagination={{ clickable: true }}
                className="w-full"
                breakpoints={
                    {
                        640:{
                            slidesPerView: 2,
                            spaceBetween:40,
                            navigation:{
                                enabled:true
                            }
                        },
                        768:{
                            slidesPerView:3,
                            spaceBetween:10,
                        },
                        1024:{
                            slidesPerView:4,
                            spaceBetween:20,
                        }
                    }
                }
            >
                {products.map((p, i) => (
                    <SwiperSlide  key={p._id}>
                            <ProductBox product={p} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default LastProducts
