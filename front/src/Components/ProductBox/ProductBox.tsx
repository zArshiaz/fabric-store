import Link from "next/link";
import { IProduct } from "@/dtos/product";

function ProductBox({ product }: { product: IProduct }) {
    if (!product) return null;

    const cover = product.images?.[0];

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group relative isolate block overflow-hidden rounded-xl aspect-[7/8] border-1 shadow-myShadow shadow-red-100  border-red-700"
            aria-label={product.name}
        >
            <img
                className="w-full h-full object-cover"
                src={cover?.url ?? "/images/placeholder.png"}
                alt={cover?.alt ?? product.name}
            />

            {/* محتوای روی عکس */}
            <div className="absolute right-3 left-3 bottom-3 z-10 flex flex-col p-2 text-stone-900 bg-rose-200/20 backdrop-blur-sm rounded-xl">
                <h3 className="line-clamp-2 text-sm sm:text-base
                ">{product.name}</h3>
                    <div className="text-black flex justify-between items-center mt-1">
                        {product.discount.active&&(<del className="text-red -600 font-hamishe-bold text-sm sm:text-base">{product.pricePerMeter.toLocaleString('fa')}</del>)}
                        <p className="text-green-700 font-hamishe-bold text-sm sm:text-lg">
                            <span className="px-2 me-1 sm:me-2 text-white text-[8px] sm:text-xs bg-green-700 rounded-xl ">قیمت :</span>
                            {product.pricePerMeter.toLocaleString('fa')}
                        </p>
                    </div>
            </div>

            {/* discount badge */}
            {product.discount.active  && (
                <div className="absolute top-2 right-2 z-20 rounded-full backdrop-blur-sm bg-red-100 text-red-600 text-xs px-2 py-1 font-bold justify-center items-end" >
                    {product.discount.percent.toLocaleString('fa')}%
                </div>
            )}

            {/* overlay description  */}
            <div className="absolute top-full p-4 pt-6 hidden sm:flex h-full w-full  justify-between items-center bg-black/50 backdrop-blur-sm rounded-xl transition-all ease-in-out duration-300 delay-150 group-hover:top-0 z-10 pointer-events-none">
                <h4 className="text-white text-center text-sm md:text-base">
                    {product.description}
                </h4>
            </div>

            {/*overlay not exist*/}
            {product.stockMeters<0.5 &&(
                <div className="absolute text-white text-xl p-4 inset-0  flex   justify-center items-center bg-black/50 backdrop-blur-sm rounded-xl  z-30 ">
                    <span>ناموجود</span>
                </div>
            )}
        </Link>
    );
}

export default ProductBox;
