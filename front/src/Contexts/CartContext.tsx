'use client'
import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {IProductCart} from "@/types/product";
import {nanoid} from "nanoid";

interface ICartContext {
    addToCart: (productCart: IProductCart) => void;
    cartItems: IProductCart[];
    deleteItem: (item: IProductCart) => void;
    cartLength: () => number;
    changeMeter: (item:IProductCart,value:number) => void;
}


const CartContext = createContext<ICartContext | null>(null)

export const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCartContext must be used inside CartProvider");
    return context
}

function CartProvider({children}: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<IProductCart[]>([]);

    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) setCartItems(JSON.parse(cartItems));

    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])


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

    return (
        <CartContext.Provider value={{
            addToCart,
            cartItems,
            deleteItem,
            cartLength,
            changeMeter
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
