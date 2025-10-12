'use client'
import {usePathname} from "next/navigation";
import Link from "next/link";
import {CgProfile} from "react-icons/cg";
import {useAuthContext} from "@/Contexts/AuthContext";
import {RxExit} from "react-icons/rx";
import React from "react";


export default function ProfileTabs() {
    const pathname = usePathname();
    const {userInfo,logout}=useAuthContext()

    return (
        < div className={'border-gray-200 pb-5 bg-white p-6 rounded-xl overflow-hidden shadow-myShadow shadow-gray-200'}>
            <div className={'flex flex-col items-center border-b-2 border-gray-300'}>
                <CgProfile className={'text-7xl text-red-400 mb-2'}/>
                <div className={'text-1xl mb-1 font-hamishe-bold'}>
                    {userInfo?.name}
                </div>
            </div>
            <div className={'my-3'}>
                <Link
                    className={`block p-2 pl-4 transition-all rounded-xl mb-1  ${pathname === '/profile' ? 'bg-linear-to-l from-red-800 to-red-500 text-white' : 'hover:text-red-700'}`}
                    href={'/profile'}>اطلاعات شخصی</Link>
                <Link
                    className={`block p-2 pl-4 transition-all rounded-xl  ${pathname === '/profile/addresses' ? 'bg-linear-to-l from-red-800 to-red-500 text-white' : 'hover:text-red-700'}`}
                    href={'/profile/addresses'}>آدرس ها</Link>
            </div>
            <div className={' border-t-2 border-gray-300 pt-2'}>
                <button onClick={logout} className={'group flex gap-0.5 items-center  px-2.5 py-1 cursor-pointer outline-2 outline-red-600 rounded-xl text-red-600 transition-all hover:bg-red-600 hover:text-white'}>
                    <RxExit  className="text-lg transition-all group-hover:translate-x-1.5"/>
                    <span>خروج</span>
                </button>
            </div>
        </div>
    )
}
