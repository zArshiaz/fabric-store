'use client'
import {useEffect, useState} from "react";
import {IAddress} from "@/dtos/addtress";
import AddressItem from "@/Components/AddressItem/AddressItem";
import AddressModal from "@/Components/AddressModal/AddressModal";
import Alert from "@/Components/Alert/Alert";
import {getAddressesApi} from "@/api/address";
import Loading from "@/Components/Loading/Loading";

 function AddressesPage() {
    const [addresses, setAddresses] = useState<IAddress[]>([])
     const [showAddAddressModal, setShowAddAddressModal] = useState<boolean>(false)
     const [loading, setLoading] = useState<boolean>(true)
     const [error, setError] = useState<boolean>(false)

    const getData = async () => {
        const addresses = await getAddressesApi()
            .then((data) => setAddresses(data))
            .catch((error) => setError(true))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getData();
    }, [showAddAddressModal])

     if(loading){
         return <Loading className={'py-5'}></Loading>
     }
     if(error){
         return <Alert type={"danger"}>خطا در گرفتن اطلاعات</Alert>
     }
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
