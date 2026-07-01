'use client'
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import {IProduct, ICartItem} from "@/dtos/product";
import {nanoid} from "nanoid";
import {IAddress} from "@/dtos/addtress";
import {getAllProducts} from "@/api/product";
import {getShoppingCost} from "@/api/setting";
import {toast} from "@/Utilities/toast";

interface ICartContext {
    addToCart: (productCart: { _id: string; meters: number }) => void;
    cartItems: ICartItem[];
    resetCart: () => void;
    cartAddress: IAddress | null;
    setCartAddress: (addr: IAddress) => void;
    deleteItem: (item: ICartItem) => void;
    cartLength: () => number;
    changeMeter: (item: ICartItem, value: number) => void;

    subtotalBeforeDiscount: number;
    totalDiscount: number;
    payable: number;

    shoppingCost: number;

    getStockInCart: (id: string) => number;
    productIndex: Map<string, { price: number; priceBeforeDiscount: number; stock: number, name: string }>

    notAvailableItem: ICartItem | undefined;
}

const CartContext = createContext<ICartContext | null>(null);

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCartContext must be used inside CartProvider");
    return context;
};

function CartProvider({children}: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [cartAddress, setCartAddress] = useState<IAddress | null>(null);
    const [productsData, setProductsData] = useState<IProduct[]>([]);
    const [shoppingCost, setShoppingCost] = useState<number>(0);

    const productIndex = useMemo<
        Map<string, { price: number; priceBeforeDiscount: number; stock: number, name: string }>
    >(
        () =>
            new Map(
                productsData.map((p) => [
                    p._id,
                    {
                        name: p.name,
                        price: p.price,
                        priceBeforeDiscount: p.pricePerMeter,
                        stock: p.stockMeters
                    }
                ])
            ),
        [productsData]
    );

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) setCartItems(JSON.parse(cartItems));

        getShoppingCost()
            .then(data => {
                setShoppingCost(data)
                console.log(data)

            })
            .catch(e=>{
                toast.fire({
                    icon: "error",
                    text:e.response.data.message,
                })
            })
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }, 500);
        return () => clearTimeout(timeout);
    }, [cartItems]);


    useEffect(() => {

        let isMounted = true;
        (async () => {
            try {
                const d = await getAllProducts()
                if (isMounted) setProductsData(Array.isArray(d) ? d : []);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [cartItems]);

    const stockMap = useMemo(() => {
        const map = new Map<string, number>();
        for (const item of cartItems) {
            map.set(item._id, (map.get(item._id) ?? 0) + item.meters);
        }
        return map;
    }, [cartItems]);

    const getStockInCart = (id: string) => stockMap.get(id) ?? 0;


    const resetCart = () => {
        setCartItems([]);
    }

    const addToCart = useCallback(
        (p: { _id: string; meters: number }) => {
            setCartItems((prev) => [
                ...prev,
                {...p, key: nanoid()}
            ]);
        },
        [productIndex]
    );

    const deleteItem = useCallback((p: ICartItem) => {
        setCartItems((prev) => {
            const i = prev.findIndex((item) => item.key === p.key);
            if (i === -1) return prev;
            return [...prev.slice(0, i), ...prev.slice(i + 1)];
        });
    }, []);

    const changeMeter = useCallback(
        (p: ICartItem, value: number) => {
            setCartItems((prev) => {
                const i = prev.findIndex((item) => item.key === p.key);
                if (i === -1) return prev;
                if (value <= 0) return [...prev.slice(0, i), ...prev.slice(i + 1)];
                const newArr = [...prev];
                newArr[i] = {...newArr[i], meters: value};
                return newArr;
            });
        },
        [productIndex]
    );

    const cartLength = () => {
        return cartItems.length;
    };

    const {subtotalBeforeDiscount, totalDiscount, payable} = useMemo(() => {
        let subtotalBeforeDiscount = 0;
        let totalDiscount = 0;
        let payable = 0;

        for (const item of cartItems) {

            const pid = item._id;
            const meters = item.meters;

            const itemPrice = productIndex.get(pid)?.price;
            const itemBefore = productIndex.get(pid)?.priceBeforeDiscount;

            const lineBefore = meters * (itemBefore ?? 0);
            const lineNow = meters * (itemPrice ?? 0);
            const lineDiscount = Math.max(0, lineBefore - lineNow);

            subtotalBeforeDiscount += lineBefore;
            totalDiscount += lineDiscount;
            payable += lineNow;
        }

        return {subtotalBeforeDiscount, totalDiscount, payable};
    }, [cartItems, productIndex]);

    const notAvailableItem = useMemo(() => {
        return cartItems.find(cart => {
            const count = getStockInCart(cart._id);
            const stock = productIndex.get(cart._id)?.stock ?? 0;
            return count > stock; // آیتمی که موجودی کافی نداره
        });
    }, [cartItems, productIndex]);
    return (
        <CartContext.Provider
            value={{
                addToCart,
                cartItems,
                resetCart,
                cartAddress,
                setCartAddress,
                deleteItem,
                cartLength,
                changeMeter,
                subtotalBeforeDiscount,
                totalDiscount,
                payable,
                shoppingCost,
                getStockInCart,
                productIndex,
                notAvailableItem
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;