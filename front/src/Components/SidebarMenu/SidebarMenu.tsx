'use client'
import React, {memo, useRef, useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {IoClose} from 'react-icons/io5'
import {MdKeyboardArrowDown} from 'react-icons/md'
import {HiOutlineLogin} from 'react-icons/hi'
import {BsCart4} from 'react-icons/bs'
import {TNav} from '@/Components/Header/Header'
import {useAuthContext} from "@/Contexts/AuthContext";
import {CgProfile} from "react-icons/cg";
import {RxExit} from "react-icons/rx";

const SidebarMenu=memo(  function ({sidebarList, show, setShow}: {
    sidebarList: TNav[];
    show: boolean;
    setShow: any
}) {
    const pathname = usePathname()
    const {isLoggedIn,logout} = useAuthContext()
    const [openIdx, setOpenIdx] = useState<number | null>(null)

    return (
        <>
            <div
                className={`fixed z-30 inset-y-0 w-64 bg-white h-screen border-l border-red-700 overflow-y-auto transition-[right] duration-300 ease-in-out ${show ? 'right-0' : '-right-64'}`}>
                {/* header */}
                <div className="h-16 mx-1 flex items-center border-b border-gray-300">
                    <IoClose onClick={() => setShow((p: any) => !p)} className="text-3xl"/>
                </div>

                {/* body */}
                <div className="flex flex-col text-zinc-900 px-3 py-4 gap-1">
                    {sidebarList.map((item: TNav, idx: number) => {
                        const isActive = pathname === item.href
                        const isOpen = openIdx === idx
                        return (
                            <div key={item.href ?? idx}>
                                <div
                                    className={`flex items-center justify-between rounded-lg ${isActive ? 'text-red-600 bg-red-300/30 shadow shadow-red-200' : ''}`}
                                >
                                    <Link className="block px-3 py-2" href={item.href}>
                                        <span>{item.title}</span>
                                    </Link>

                                    {item.dropdownItems && (
                                        <button
                                            onClick={() => setOpenIdx(isOpen ? null : idx)}
                                            aria-expanded={isOpen}
                                            aria-controls={`dd-${idx}`}
                                            className="px-2 py-2"
                                        >
                                            <MdKeyboardArrowDown
                                                className={`${isOpen ? 'rotate-180' : ''} text-xl transition-transform`}
                                            />
                                        </button>
                                    )}
                                </div>

                                {item.dropdownItems.length>0 && (
                                    <div
                                        id={`dd-${idx}`}
                                        className={`header-dropdown flex flex-col mr-6 text-sm text-zinc-600 overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                                        style={{maxHeight: isOpen ? 600 : 0}}
                                    >
                                        {item.dropdownItems.map((sub) => (
                                            <Link
                                                key={sub._id}
                                                className={`pt-1 ${pathname === sub.href ? 'text-red-600' : ''}`}
                                                href={sub.href}
                                                onClick={()=>setShow(false)}
                                            >
                                                {sub.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* footer */}
                <div className="mx-1 px-3 py-4 border-t border-gray-300 text-base space-y-4">
                    <Link className="flex items-center gap-2 text-red-600 cursor-pointer " href="/order/cart">
                        <BsCart4 className="text-xl"/>
                        <span>سبد خرید</span>
                    </Link>
                    {
                        isLoggedIn ? (
                            <Link className="flex items-center gap-2 text-red-600 cursor-pointer" href="/profile">
                                <CgProfile className="text-xl"/>
                                <span>حساب کاربری</span>
                            </Link>
                        ) : (
                            <Link className="flex items-center gap-2 text-red-600 cursor-pointer" href="/register">
                                <HiOutlineLogin className="text-xl"/>
                                <span>ثبت نام | ورود</span>
                            </Link>
                        )
                    }
                    {
                        isLoggedIn && (
                            <button onClick={logout} className="flex items-center gap-2 text-red-600 cursor-pointer">
                                <RxExit  className="text-xl"/>
                                <span>خروج</span>
                            </button>)
                    }
                </div>
            </div>

            <div onClick={() => setShow((p: any) => !p)}
                 className={`transition-all duration-300 ${show ? 'bottom-0' : '-bottom-full'} fixed w-screen h-full bg-black/40 z-20`}/>
        </>
    )
})

export default SidebarMenu;
