'use client'
import React, {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {IProduct, IProductCart} from "@/types/product";
import {nanoid} from "nanoid";
import {IAddress} from "@/types/addtress";

interface ICartContext {
    addToCart: (productCart: IProductCart) => void;
    cartItems: IProductCart[];
    cartAddress:string|null;
    setCartAddress: (addr: string) => void;
    deleteItem: (item: IProductCart) => void;
    cartLength: () => number;
    changeMeter: (item:IProductCart,value:number) => void;

    subtotalBeforeDiscount:number
    totalDiscount:number
    payable:number

    shoppingCost:number;
}


const CartContext = createContext<ICartContext | null>(null)

export const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCartContext must be used inside CartProvider");
    return context
}

function CartProvider({children}: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<IProductCart[]>([]);
    const [cartAddress, setCartAddress] = useState<string | null>(null);
    const [productsData, setProductsData] = useState<IProduct[]>([]);
    const shoppingCost=60000;
    const priceIndex = useMemo<Map<string, { price: number, priceBeforeDiscount: number }>>(
        () =>
            new Map(
                productsData.map((p) => [
                    p._id,
                    {
                        price: p.discount && p.pricePerMeterWithDiscount ? p.pricePerMeterWithDiscount : p.pricePerMeter,
                        priceBeforeDiscount: p.pricePerMeter
                    },
                ])
            ),
        [productsData]
    );

    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) setCartItems(JSON.parse(cartItems));

    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const r = await fetch("http://localhost:4000/api/product/all");
                const d = await r.json();
                if (isMounted) setProductsData(Array.isArray(d) ? d : []);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [cartItems]);

    const addToCart = useCallback((p: IProductCart) => {
        setCartItems((prev) => [...prev, {...p,key:nanoid()}])
    }, [])
    const deleteItem = useCallback((p: IProductCart) => {
        setCartItems(prev => {
            const i = prev.findIndex(item => item.key===p.key);
            if (i === -1) return prev;
            return [...prev.slice(0, i), ...prev.slice(i + 1)];
        });
    }, [])

    const changeMeter = useCallback((p: IProductCart,value:number) => {
        setCartItems(prev => {
            const i = prev.findIndex(item => item.key===p.key);
            if (i === -1) return prev;
            const prevValue=prev[i].meters;
            if (prevValue === value) return prev;
            if(value<=0)   return [...prev.slice(0, i), ...prev.slice(i + 1)];
            const newArr = [...prev];
            newArr[i] = { ...newArr[i], meters: value };
            return newArr;
        });
    }, [])

    const cartLength=()=>{
        return cartItems.length
    }


    const {subtotalBeforeDiscount, totalDiscount, payable} = useMemo(() => {
        let subtotalBeforeDiscount = 0; // کل قبل از تخفیف
        let totalDiscount = 0;          // جمع تخفیف
        let payable = 0;                // مبلغ پرداختی

        for (const item of cartItems) {
            const pid = item._id;

            const meters = item.meters;

            const itemPrice = priceIndex.get(pid)?.price;

            const itemBefore = priceIndex.get(pid)?.priceBeforeDiscount;

            const lineBefore = meters * (itemBefore ?? 0);
            const lineNow = meters * (itemPrice ?? 0);
            const lineDiscount = Math.max(0, lineBefore - lineNow);

            subtotalBeforeDiscount += lineBefore;
            totalDiscount += lineDiscount;
            payable += lineNow;
        }

        return {subtotalBeforeDiscount, totalDiscount, payable};
    }, [cartItems, priceIndex]);

    return (
        <CartContext.Provider value={{
            addToCart,
            cartItems,
            cartAddress,
            setCartAddress,
            deleteItem,
            cartLength,
            changeMeter,
            subtotalBeforeDiscount,
            totalDiscount,
            payable,
            shoppingCost
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
