'use client'
import Regex from "@/Utilities/Regex";
import React from "react";
import {useForm} from "react-hook-form";
import {forgotPassword} from "@/api/auth";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/Contexts/AuthContext";

function ForgotPasswordPage() {
    const {register, reset, handleSubmit, formState: {errors}} = useForm<{ email: string }>({
        mode: "onBlur"
    })
    const router=useRouter();
    const [loading , setLoading] = React.useState(false);

    const submit = (v: { email: string }) => {
        setLoading(true);
        forgotPassword(v.email)
            .then((data) => {
                Swal.fire({
                    icon: "info",
                    text: data.message,
                    showCloseButton: true,
                    showCancelButton: false,
                    confirmButtonText:'باشه'
                })
                let searchParams = new URLSearchParams({email: v.email});
                router.push(`/forgot-password/code?${searchParams.toString()}`);
            }).catch((err) => {
            Swal.fire({
                icon: "error",
                text: err.response.data.message,
                showCloseButton: true,
                showCancelButton: false
            })
        }).finally(()=>{
            setLoading(false);
        });
    }
    return (

                <form onSubmit={handleSubmit(submit)}>
                    <div className={'relative'}>
                        <input type="email"
                               {...register('email', {
                                   required: "ایمیل الزمی",
                                   pattern: {value: Regex.email, message: "ایمیل نامعتبر"},
                               })}
                               className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                               placeholder="ایمیل بازیابی"/>
                        {errors.email ? (
                            <span
                                className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.email.message} </span>) : null}
                    </div>
                    <div className={'mt-6'}>
                        <button
                            className={'bg-red-700 w-full p-2 rounded-lg text-white'}>{loading ? '...' : 'تایید'}</button>
                    </div>
                </form>

    )
}

export default ForgotPasswordPage;