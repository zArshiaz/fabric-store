'use client'
import React, {useEffect} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

function SearchProductsBox() {
    const [value, setValue] = React.useState('');
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(()=>{
        setValue(searchParams.get('search')||'');
    },[])

    const searchHandler = () => {
        const trimmed = value.trim();
        if(!trimmed) {
            router.push(pathname);
            return;
        }
        const params = new URLSearchParams();
        params.set('search', trimmed);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="rounded-lg overflow-hidden border-2 border-red-500 flex">
            <input
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') searchHandler();
                }}
                className="outline-0 px-2 py-1 flex-grow text-red-400"
                type="text"
                placeholder="متن خود را بنویسید"
            />
            <button
                onClick={searchHandler}
                className="px-4 py-1 bg-gradient-to-r from-red-500 to-red-900 transition-colors hover:from-red-600 text-white cursor-pointer"
            >جست‌وجو
            </button>
        </div>
    );
}

export default SearchProductsBox;