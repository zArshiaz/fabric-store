'use client'
import React from 'react'
import { LuArrowRight} from "react-icons/lu";
import {useRouter} from "next/navigation";

function HeaderPage() {
    const router = useRouter();
    return (
        <div className={'flex justify-between items-center h-14 '}>
            <div className={'flex justify-between items-center gap-1 '}>
                    <LuArrowRight onClick={()=>{router.back()}} className={'text-red-700 rounded-full transition-all hover:scale-110 hover:translate-x-1 hover:bg-red-200 w-8 h-8 p-1 cursor-pointer '} ></LuArrowRight >
                <h3 className={'text-xl bg-gradient-to-l from-red-700 from-20% to-red-400 bg-clip-text text-transparent font-hamishe-bold '}>جزئیات سفارش</h3>
            </div>
        </div>
    )
}

export default HeaderPage
