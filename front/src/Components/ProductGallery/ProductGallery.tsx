'use client'
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination,Navigation} from "swiper/modules";

function ProductGallery({images,className}:{images:{url:string,alt:string}[],className?:string}) {


   return (
       <div className={`rounded-xl shadow-myShadow shadow-gray-200 overflow-hidden ${className}`}>
           <Swiper
               modules={[Navigation, Pagination]}
               pagination={{clickable:true}}
               navigation
               slidesPerView={1}
               loop={true}
           >
               {
                   images.map(image=>(
                       <SwiperSlide className={'aspect-square'} key={image.url}>
                           <img loading={'lazy'}  className={'w-full h-full  object-cover'}  src={image.url} alt={image.alt}/>
                       </SwiperSlide>
                   ))
               }

           </Swiper>
       </div>
    )
}

export default ProductGallery
