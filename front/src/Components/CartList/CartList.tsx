'use client'
import { useCartContext } from "@/Contexts/CartContext";
import CartItem from "@/Components/CartItem/CartItem";

 function CartList() {
    const { cartItems,deleteItem } = useCartContext();
    return (
        <div className={'space-y-2'}>
            {cartItems.map(item => (
                <CartItem key={item.key} cartItem={item} />
            ))}
        </div>
    );
}

export default CartList;
