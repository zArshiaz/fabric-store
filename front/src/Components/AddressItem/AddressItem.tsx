'use client'
import React, {useEffect, useState} from 'react'
import {IAddress} from "@/types/addtress";
import Swal from "sweetalert2";
import {Tooltip} from "react-tooltip";
import AddressModal from "@/Components/AddressModal/AddressModal";

function AddressItem({address,getData}: { address: IAddress ,getData:()=>void }) {
    const [showEditAddressModal, setShowEditAddressModal] = useState<boolean>(false)

    useEffect(()=>{
        getData()
    },[showEditAddressModal])


    const deleteAddress = async () => {
       const res= await Swal.fire({
            icon: "warning",
            text:'آیا از حذف این ادرس مطعن هستید؟',
            showCancelButton: true,
            width:'auto',
            confirmButtonText:'بله',
            cancelButtonText:'لغو'
        })
        if (res.isConfirmed) {
            await fetch(`http://localhost:4000/api/address/${address._id}`,{
                method:'DELETE',
            }).then(()=>{
                getData();
            })
        }
    }

    return (
        <div className="rounded-xl p-4 border-1 border-gray-200 bg-white shadow-myShadow shadow-gray-200">
            <h4 className={'text-lg'}>{address.title}</h4>
            <div className={'text-black'}>
                <div>
                    استان:
                    <span className={'text-stone-700 ms-2'}>{address.province}</span>
                </div>
                <div>
                    شهر:
                    <span className={'text-stone-700 ms-2'}>{address.city}</span>
                </div>
                <div>
                    کد پستی:
                    <span className={'text-stone-700 ms-2'}>{address.zipCode}</span>
                </div>
                <div data-tooltip-id={address._id} className={'sm:line-clamp-1'}>
                     آدرس:
                    <span  className={'text-stone-700 ms-2'}>{address.address}</span>
                    <Tooltip id={address._id} content={address.address}></Tooltip>
                </div>
            </div>
            <div className={'border-t border-gray-700 mt-2 pt-2 grid grid-cols-2 gap-2'}>
                <button onClick={()=>setShowEditAddressModal(true)} className={'rounded-lg bg-gray-400 text-white py-1 cursor-pointer transition-colors hover:bg-gray-500 hover:shadow-lg'}>ویرایش</button>
                <button onClick={deleteAddress} className={'rounded-lg bg-red-600 text-white py-1 cursor-pointer transition-all hover:bg-red-700 hover:shadow-lg  '}>حذف</button>
            </div>
            {showEditAddressModal&&(<AddressModal data={address} type={"edit"} show={showEditAddressModal} setShow={setShowEditAddressModal} /> )}

        </div>
    )
}

export default AddressItem
