'use client'
import { useCartContext } from "@/Contexts/CartContext";
import { useEffect, useState } from "react";
import { ICartItem, IProduct } from "@/types/product";
import CartItem from "@/Components/CartItem/CartItem";
import {nanoid} from "nanoid";

 function CartListItems() {
    const { cartItems } = useCartContext();

    const [productCache, setProductCache] = useState<Record<string, IProduct>>({});

    useEffect(() => {
        const missingIds = cartItems
            .map(c => c._id)
            .filter(id => !productCache[id]);

        if (missingIds.length === 0) return;

        Promise.all(
            missingIds.map((id) =>
                fetch(`http://localhost:4000/api/product/${id}`, { cache: 'force-cache' })
                    .then(res => res.json())
            )
        ).then((data: IProduct[]) => {
            const newCache = { ...productCache };
            data.forEach(p => {
                newCache[p._id] = p;
            });
            setProductCache(newCache);
        });
    }, [cartItems, productCache]);

    const items = cartItems.map(c => {
            const p = productCache[c._id];
            if (!p) return null;
            return { meters: c.meters,key:c.key, ...p };
        })
        .filter(Boolean) as ICartItem[];

    return (
        <div className={'space-y-2'}>
            {items.map(item => (
                <CartItem key={item.key} cartItem={item} />
            ))}
        </div>
    );
}

export default CartListItems;
