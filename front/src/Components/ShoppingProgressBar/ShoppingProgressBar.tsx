'use client'
import {BsCart2} from "react-icons/bs";
import {CiLocationOn} from "react-icons/ci";
import {VscSend} from "react-icons/vsc";
import {MdPayment} from "react-icons/md";
import {usePathname} from "next/navigation";

const steps = [
    {id: 'cart', path: '/order/cart', icon: <BsCart2/>},
    {id: 'address', path: '/order/address', icon: <CiLocationOn/>},
    {id: 'shipment', path: '/order/shipment', icon: <VscSend/>},
    {id: 'payment', path: '/order/payment', icon: <MdPayment/>},
];

function ShoppingProgressBar() {
    const pathname = usePathname();
    const activeIndex = steps.findIndex(step => step.path === pathname);

    return (
        <div className="container text-gray-500 flex  items-center justify-center text-xl py-5 !px-20">
            {steps.map((step, index) => {
                const isActive = index == activeIndex;

                return (
                    <>
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`border-2 rounded-full p-2 transition-all duration-300 ${isActive ? ' border-red-500 text-red-500' : (index < activeIndex ? 'border-red-500 text-white bg-red-500' : 'border-gray-400')}`}
                            >
                                {step.icon}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div key={step.path}
                                className={`flex-1 h-[1px] border border-dashed mx-2 transition-all duration-300 ${index < activeIndex ? 'border-red-500 border-solid' : 'border-gray-400'}`}
                            />
                        )}
                    </>

                );
            })}
        </div>
    );
}

export default ShoppingProgressBar;
