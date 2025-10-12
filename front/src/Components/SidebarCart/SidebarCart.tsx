'use client'
import {IoClose} from "react-icons/io5";
import {useCartContext} from "@/Contexts/CartContext";
import CartItem from "@/Components/CartItem/CartItem";
import CartPriceSection from "@/Components/CartPriceSection/CartPriceSection";

export default function SidebarCart({ show, setShow }: { show: boolean; setShow: any }) {
    const { cartItems } = useCartContext();

    return (
        <>
            <div
                className={`fixed z-30 inset-y-0 w-80 bg-white border-l border-red-700
                    transition-[left] duration-300 ease-in-out
                    ${show ? 'left-0' : '-left-80'}
                    flex flex-col h-screen`}  // ← ستون + پرکردن ارتفاع
            >
                {/* header */}
                <div className="h-16 mx-1 flex items-center justify-between border-b border-gray-300">
                    <IoClose onClick={() => setShow((p: any) => !p)} className="text-3xl cursor-pointer" />
                    <h2 className="text-lg">سبد خرید</h2>
                </div>

                {/* body*/}
                <div className="flex-1 overflow-y-auto py-2 mx-3 space-y-2 hide-scrollbar">
                    {cartItems?.map((item: any, i: number) => (
                        <CartItem key={i} cartItem={item} />
                    ))}
                </div>

                {/* footer  */}
                <div className="border-t border-gray-200 p-3 bg-white">
                    <CartPriceSection />
                </div>
            </div>

            {/* backdrop */}
            <div
                onClick={() => setShow((p: any) => !p)}
                className={`fixed inset-0 bg-black/40 z-20 transition-[top] duration-300
                    ${show ? 'top-0' : 'top-full'}`}
            />
        </>
    );
}
