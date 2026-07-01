'use client'
import TitlePage from "@/Components/TitlePage/TitlePage";
import {useAuthContext} from "@/Contexts/AuthContext";
import {useEffect, useMemo, useState} from "react";
import {IAddress} from "@/dtos/addtress";
import Alert from "@/Components/Alert/Alert";
import CartPriceSection from "@/Components/CartPriceSection/CartPriceSection";
import AddressModal from "@/Components/AddressModal/AddressModal";
import {GrEdit} from "react-icons/gr";
import {useCartContext} from "@/Contexts/CartContext";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {toast} from "@/Utilities/toast";
import {getAddressesApi} from "@/api/address";

function Page() {
    const {userInfo} = useAuthContext();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const {setCartAddress,cartAddress,cartItems,getStockInCart,productIndex,notAvailableItem}=useCartContext();
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [showAddAddressModal, setShowAddAddressModal] = useState(false);
    const [showEditAddressModal, setShowEditAddressModal] = useState(false);


    useEffect(() => {
        if (notAvailableItem){
            router.push("/order/cart");
        }
        if(!cartItems?.length){
            router.push("/order/cart");
            toast.fire({
                icon:'warning',
                text:'سبد خرید خالی است.'
            })
        }
    }, []);
    useEffect(() => {
        if (userInfo) {
            getAddressesApi()
                .then((data) => setAddresses(data))
                .catch((err) => console.error("Failed to load addresses:", err)).finally(() => setLoading(false));
        }
    }, [showAddAddressModal,userInfo,showEditAddressModal]);


    const changeRoutHandler=()=>{
        if(userInfo&&cartAddress) router.push('/order/shipment')
        if(!cartAddress) Swal.fire({
            icon:'warning',
            text:'لطفا یک آدرس انتخاب کنید'
        })
    }

    return (
        <div className="container space-y-6">
            <TitlePage title="انتخاب آدرس">
                    <button
                        onClick={() => setShowAddAddressModal(true)}
                        className={'bg-red-600 cursor-pointer text-white py-1.5 px-2 rounded-lg  transition-colors hover:bg-red-700'}>
                        افزودن ادرس جدید +
                    </button>
                    {showAddAddressModal && (<AddressModal type={"add"} show={showAddAddressModal} setShow={setShowAddAddressModal} /> )}
            </TitlePage>



            <div className={'grid grid-cols-1 lg:grid-cols-8 gap-3'}>
                <div className={'lg:col-span-5 mb-[160px] md:mb-2'}>
                    {loading&&(
                        <div className={'flex items-center justify-center h-20'}>
                        <AiOutlineLoading3Quarters className={'animate-spin text-4xl'}/>
                    </div>)}
                    {addresses.length === 0&&!loading && (
                        <Alert type="warning">آدرسی برای شما وجود ندارد</Alert>
                    )}
                    {addresses.length > 0&&!loading && (
                        <div className="flex flex-col gap-3">
                            {addresses.map((item: IAddress) => (
                                <label
                                    key={item._id}
                                    className={`relative flex items-center gap-3 p-2 border rounded-lg cursor-pointer transition-all duration-200 shadow-sm ${
                                        cartAddress?._id == item._id ? "border-red-600  bg-white " : "border-gray-300"
                                    }`}
                                >
                                    <GrEdit
                                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCartAddress(item);
                                            setShowEditAddressModal(true);
                                        }}
                                    />

                                    {showEditAddressModal && cartAddress?._id === item._id && (
                                        <AddressModal
                                            type={'edit'}
                                            show={showEditAddressModal}
                                            setShow={setShowEditAddressModal}
                                            data={item}
                                        />
                                    )}

                                    <input
                                        type="radio"
                                        name="address"
                                        value={item._id}
                                        checked={cartAddress?._id === item._id}
                                        onChange={() => setCartAddress(item)}
                                        className="accent-red-600 w-5 h-5"
                                    />

                                    <div className="flex flex-col text-gray-700">
                                        <span className="font-hamishe-bold mb-1">{item.title}</span>
                                        <span className="text-sm text-gray-500">{item.address}</span>
                                        <span className="text-sm text-gray-500">{item.city}، {item.province}</span>
                                        <span className="text-sm text-gray-500">کدپستی: {item.zipCode}</span>
                                    </div>
                                </label>

                            ))}
                        </div>
                    )}
                </div>

                <div className={'lg:col-span-3 fixed bottom-0 inset-x-0  md:relative'}>
                    <div
                        className={'p-3  items-center rounded-xl bg-white lg:sticky top-18'}>
                        <CartPriceSection></CartPriceSection>
                        <button
                            onClick={changeRoutHandler}
                            className={'mt-3 py-3 w-full text-sm md:text-base rounded-lg text-white bg-linear-to-r from-red-800 to-red-500 shadow shadow-black/20 cursor-pointer disabled:cursor-not-allowed'}>
                            ادامه فرایند و انتخاب روش ارسال
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
