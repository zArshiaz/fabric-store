import Link from "next/link";
import { IProduct } from "@/types/product";

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
                <h3 className="line-clamp-2">{product.name}</h3>

                {product.discount ? (
                    <div className="text-black flex justify-between mt-1">
                        <del className="text-gray-600 font-hamishe-bold">{product.pricePerMeter.toLocaleString('fa')}</del>
                        <p className="text-green-800 font-hamishe-bold">
                            <span className="px-2 me-2 text-white bg-green-700 rounded-xl text-sm">قیمت :</span>
                            {product.pricePerMeterWithDiscount?.toLocaleString('fa')}
                        </p>
                    </div>
                ) : (
                    <div className="text-black flex justify-end mt-1">
                        <p className="text-green-700 font-hamishe-bold">
                            <span className="px-2 me-2 text-white  bg-green-700 rounded-xl text-sm">قیمت :</span>
                            {product.pricePerMeter.toLocaleString('fa')}
                        </p>
                    </div>
                )}
            </div>

            {/* discount badge */}
            {product.discount && product.pricePerMeterWithDiscount && (
                <div className="absolute top-2 right-2 z-20 rounded-full backdrop-blur-sm bg-red-100 text-red-600 text-xs px-2 py-1 font-bold justify-center items-end" >
                    {Math.floor(100 - (100 * (product.pricePerMeterWithDiscount)) / product.pricePerMeter).toLocaleString('fa')}%
                </div>
            )}

            {/* overlay description  */}
            <div className="absolute top-full p-4 pt-6 h-full w-full flex justify-between items-center bg-black/50 backdrop-blur-sm rounded-xl transition-all ease-in-out duration-300 delay-150 group-hover:top-0 z-10 pointer-events-none">
                <h4 className="text-white text-center text-sm md:text-base">
                    {product.description}
                </h4>
            </div>
        </Link>
    );
}

export default ProductBox;
