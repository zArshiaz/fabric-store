'use client';

import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {validate} from "json-schema";
import Swal from "sweetalert2";
import {IAddress} from "@/types/addtress";


const provinces: Record<string, string[]> = {
    'تهران': ['تهران', 'ری', 'اسلام‌شهر', 'شهریار'],
    'اصفهان': ['اصفهان', 'کاشان', 'نجف‌آباد'],
    'کرمانشاه': ['کرمانشاه', 'سنقر', 'اسلام‌آباد غرب'],
};

type FormValues = {
    title: string,
    province: string;
    city: string;
    address: string;
    zipCode: string; // در ارسال تبدیل به Number می‌کنیم
};

interface addressModalProps {
    type: ('edit' | 'add');
    show: boolean;
    setShow: (show: boolean) => void;
    data?: IAddress;
}

export default function AddressModal({type,show,setShow,data}: addressModalProps) {
    const {
        register,
        reset,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isSubmitting,isDirty},
    } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: {title:data?.title ||'' ,province: data?.province.trim()||'', city: data?.city.trim()||'', address: data?.address||'', zipCode: data?.zipCode.toString()||''},
    });

    const selectedProvince = watch('province');
    const cityOptions = selectedProvince ? provinces[selectedProvince] ?? [] : [];

    useEffect(() => {
        if (selectedProvince!==data?.province){
            setValue('city', '');
        }
    }, [selectedProvince, setValue]);
    //
    const onSubmit = async (values: FormValues) => {
        const payload = { ...values, zipCode: Number(values.zipCode) };

        if (type === 'add') {
            const res = await fetch('http://localhost:4000/api/address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                console.error('Failed:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'خظا در ثبت آدرس',
                    width:'auto'
                })
                return;
            }
            reset();
            setShow(false);
        }
        else {
            const res = await fetch(`http://localhost:4000/api/address/${data?._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                console.error('Failed:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'خظا در تغییر آدرس',
                    width:'auto'
                })
                return;
            }
            reset();
            setShow(false);
        }

    };

    return (
        <div onClick={()=>setShow(false)} className={`${show?'flex':'hidden'} fixed inset-0  m-auto bg-black/50 z-50 justify-center items-center` }>
            <form onClick={(e:React.MouseEvent<HTMLFormElement>)=>e.stopPropagation()} onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-5 rounded-xl ">
                <div className={'relative'}>
                    <input type={'text'}
                           placeholder={'عنوان ادرس'}
                           className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           {...register('title', {required: 'غنوان آدرس ضروری'})}
                    />
                    {errors.title ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.title.message} </span>) : null}
                </div>
                <div className={'relative'}>
                    <select
                        className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                        {...register('province', {required: 'استان را انتخاب کنید'})}
                    >
                        <option value="">— انتخاب استان —</option>
                        {Object.keys(provinces).map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    {errors.province ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.province.message} </span>) : null}
                </div>

                <div className={'relative'}>
                    <select
                        className={`${selectedProvince?'':'text-gray-400'} w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300`}
                        disabled={!selectedProvince}
                        {...register('city', {
                            required: 'شهر را انتخاب کنید',
                        })}
                    >
                        <option value="">{selectedProvince ? '— انتخاب شهر —' : 'ابتدا استان را انتخاب کنید'}</option>
                        {cityOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {errors.city ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.city.message} </span>) : null}
                </div>

                <div className={'relative'}>
                    <textarea
                        placeholder={'آدرس دقیق'}
                        className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                        rows={5}
                        cols={50}
                        {...register('address', {
                            required: 'نشانی را وارد کنید',
                            minLength: {value: 5, message: 'نشانی خیلی کوتاه است'}
                        })}
                    />
                    {errors.address ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.address.message} </span>) : null}
                </div>

                <div className={'relative'}>
                    <input
                        placeholder={'کد پستی'}
                        className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                        inputMode="numeric"
                        {...register('zipCode', {
                            required: 'کد پستی الزامی است',
                            pattern: {value: /^\d{10}$/, message: 'کد پستی باید ۱۰ رقم باشد'},
                        })}
                    />
                    {errors.zipCode ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.zipCode.message} </span>) : null}
                </div>
                <div className={'mt-2'}>
                    <button
                        type="submit"
                        disabled={isSubmitting || !isDirty}
                        className=" bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'در حال ثبت…' : type==='add'?'ثبت ادرس':'ثبت تغییرات'}
                    </button>
                    <button
                        onClick={()=>setShow(false)}
                        className="ms-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        لغو
                    </button>
                </div>


            </form>
        </div>
    );
}
