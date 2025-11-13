'use client';
import Link from "next/link";
import {BsCart4} from "react-icons/bs";
import {HiMiniArrowLeftEndOnRectangle} from "react-icons/hi2";
import {usePathname} from "next/navigation";
import {IoIosArrowDown} from "react-icons/io";
import {HiOutlineMenu} from "react-icons/hi";
import SidebarMenu from "@/Components/SidebarMenu/SidebarMenu";
import React, {memo, useEffect, useState} from "react";
import {useAuthContext} from "@/Contexts/AuthContext";
import {CgProfile} from "react-icons/cg";
import {useCartContext} from "@/Contexts/CartContext";




export type TNav = {
    _id: string;
    title: string,
    href: string,
    dropdownItems: { title: string, href: string ,_id: string }[]
}


const Header =memo( function () {
    const pathname = usePathname()
    const {isLoggedIn}=useAuthContext()
    const {cartLength}=useCartContext()

    const [navItems, setNavItems] = React.useState<TNav[]>([]);
    const [showSidebarMenu,setShowSidebarMenu] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:4000/api/navbar',{cache:'force-cache'}).then(res=>res.json()).then(d=>setNavItems(d));
    },[])

    return (
        <>
            <header>
                {/*for desktop*/}
                <div className="hidden  sm:block container fixed z-50 top-3 left-1/2 -translate-x-1/2 ">
                    <div className="flex items-center justify-between px-4 py-3 rounded-2xl text-white bg-rose-900/30 backdrop-blur-xs">
                        {/* right-header */}
                        <div className="flex items-center gap-5 md:gap-9 justify-start">
                            {/* logo */}
                            <h1  className="font-titr-zebr text-xl text-red-700">Fabric</h1>
                            {/* navbar */}
                            <nav className="flex text-lg items-center gap-2 sm:gap-4 md:gap-6">
                                {navItems.map((nav) => (
                                    <div className={'h-8 relative group'} key={nav.href}>
                                        <Link
                                            className={`flex items-center leading-8 mb-1 hover:text-red-500 transition-all tracking-tighter duration-300 ${nav.href === pathname ? 'text-red-600' : ''}`}
                                            href={nav.href}>
                                            {nav.title}

                                            {nav.dropdownItems.length > 0? (< IoIosArrowDown   className={'w-3 ms-1 group-hover:rotate-180 transition-all duration-300'} />):''}
                                        </Link>
                                        {/*dropdown-menu*/}
                                        { nav.dropdownItems.length > 0 && (
                                            <ul className={'absolute top-full right-0  text-sm text-zinc-600 bg-white  min-w-40  p-3 space-y-2 border-t-4 border-red-600   backdrop-blur-xs rounded-lg  invisible opacity-0  group-hover:visible group-hover:opacity-100'}>
                                                {nav.dropdownItems.map((item) => (
                                                    <li  key={item.href}>
                                                        <Link href={item.href} className={`hover:text-red-500 transition-colors cursor-pointer`}>{item.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                        {/* left-header */}
                        <div className={'flex items-center justify-between'}>
                            {/*cart icon*/}
                            <Link href={'/order/cart'} className={'group cursor-pointer  transition-all relative'}>
                                <BsCart4 className={'text-2xl group-hover:hover:text-red-500'}/>
                                {
                                    cartLength()>0 &&(
                                        <span className={'group-hover:opacity-0 transition-all absolute -top-1.5 -right-1 bg-red-700 text-sm text-white aspect-square h-4 rounded-full animate-bounce flex justify-center items-center pt-1 '}>{cartLength()}</span>
                                    )
                                }

                            </Link>
                            <div className="w-[1px] h-6 bg-red-400 mx-2 md:mx-5"></div>
                            {/*auth icon*/}
                            {
                                isLoggedIn ?(<Link href={'/profile'} className={' cursor-pointer flex gap-2 hover:text-red-500 transition-all'}>
                                    <CgProfile  className={'text-2xl '}/>
                                    <span className={'hidden lg:inline-block'}>حساب کاربری</span>
                                </Link>):(<Link href={'/register'} className={' cursor-pointer flex gap-2 hover:text-red-500 transition-all'}>
                                    <HiMiniArrowLeftEndOnRectangle className={'text-2xl '}/>
                                    <span className={'hidden lg:inline-block'}>ورود / ثبت نام</span>
                                </Link>)
                            }
                        </div>
                    </div>
                </div>
                <SidebarMenu show={showSidebarMenu} setShow={setShowSidebarMenu} sidebarList={navItems}/>
                <div className=" sm:hidden w-full h-16 px-5 bg-white flex justify-between items-center">
                    {/*menu icon*/}
                    <div onClick={()=>setShowSidebarMenu(p=>!p)}>
                        <HiOutlineMenu  className={'text-2xl accent-zinc-800 font-bold'} />
                    </div>
                    {/*logo*/}
                    <div>
                        <h1 className="font-titr-zebr text-2xl text-red-700">Fabric</h1>
                    </div>
                    {/*cart icon*/}
                    <Link href={'/order/cart'} className={'relative'}>
                        <BsCart4 className={'text-2xl accent-zinc-800 '}/>
                        {
                            cartLength()>0 && (
                                <span className={' absolute -top-1.5 -right-1 bg-red-700 text-sm text-white aspect-square h-4 rounded-full animate-bounce flex justify-center items-center pt-1 '}>{cartLength()}</span>
                            )
                        }
                    </Link>
                </div>
            </header>
        </>
    );
})


export default Header;
