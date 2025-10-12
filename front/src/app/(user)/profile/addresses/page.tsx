'use client'
import {useEffect, useState} from "react";
import {IAddress} from "@/types/addtress";
import AddressItem from "@/Components/AddressItem/AddressItem";
import AddressModal from "@/Components/AddressModal/AddressModal";
import Alert from "@/Components/Alert/Alert";

 function AddressesPage() {
    const [addresses, setAddresses] = useState<IAddress[]>([])
     const [showAddAddressModal, setShowAddAddressModal] = useState<boolean>(false)

    const getData = async () => {
        const addresses = await fetch('http://localhost:4000/api/address', {credentials: 'include'})
            .then((res) => res.json())
            .then((data) => setAddresses(data))

    }

    useEffect(() => {
        getData();
    }, [showAddAddressModal])

    return (
        <div>
            <div className={'pb-2 mb-3 border-b-4 border-gray-200 flex items-center justify-between'}>
                <h4 className={'text-2xl'}>آدرس های شما</h4>
                <button
                    onClick={() => setShowAddAddressModal(true)}
                    className={'bg-red-600 cursor-pointer text-white py-1.5 px-2 rounded-lg  transition-colors hover:bg-red-700'}>
                    افزودن ادرس جدید +
                </button>
            </div>
            {addresses.length === 0 ?(<Alert  type={'warning'}> آدرسی برای شما وجود ندارد</Alert>):
                (<div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 '}>
                       {
                           addresses.map((address) => (
                               <div key={address._id}>
                                   <AddressItem getData={getData}   address={address}/>
                               </div>
                           ))
                       }
                   </div>)
            }
            {showAddAddressModal && (<AddressModal type={"add"} show={showAddAddressModal} setShow={setShowAddAddressModal} /> )}
        </div>
    )
}

export default AddressesPage
