"use client"; // اگر در Next.js 13+ با App Router هستی

import { usePathname } from "next/navigation";
import {FaShareNodes} from "react-icons/fa6";
import {toast} from "@/Utilities/toast";

export default function CopyRouteButton() {
    const pathname =window.location.href

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(pathname);
            toast.fire({
                icon: "success",
                text: `آدرس در کلیپبورد شما قرار دارد.`,
            })
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <button onClick={handleCopy}
            className={'col-span-2 ms-2 flex justify-center items-center rounded-xl text-lg cursor-pointer border-4  border-red-700 text-red-700 transition-all hover:bg-red-700 hover:text-white hover:shadow-lg'}><FaShareNodes className={'text-xl'}/></button>
    );
}