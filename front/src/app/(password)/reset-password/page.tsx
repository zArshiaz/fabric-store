'use client'
import Regex from "@/Utilities/Regex";
import {useForm} from "react-hook-form";
import {handleMutable} from "next/dist/client/components/router-reducer/handle-mutable";
import {resetPassword} from "@/api/auth";
import {useRouter, useSearchParams} from "next/navigation";
import Swal from "sweetalert2";
import {useEffect} from "react";

function ResetPasswordPage() {
    const {register, reset, handleSubmit, formState: {errors}} = useForm<{ password: string }>({
        mode: "onBlur"
    })
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    useEffect(() => {
        if (!email || !token) router.replace("/forgot-password/email");
    }, [])

    function submit(v: { password: string }) {
        if (!email || !token) router.replace("/forgot-password/email");
        if (token) resetPassword(email!, token, v.password)
            .then(data => {
                Swal.fire({
                    icon: "success",
                    title:'موفق',
                    text: data.message,
                    showCloseButton: true,
                    showConfirmButton: false,
                }).then(() => {
                    router.push("/login")
                })
            }).catch(err => {
                Swal.fire({
                    icon: "error",
                    title: 'ناموق',
                    text: err.response.data.message,
                    showCloseButton: true,
                    showConfirmButton: false,
                })
            })
    }

    return (
        <div className={'flex h-screen w-screen items-center justify-center'}>
            <div className={' bg-white rounded-2xl shadow-2xl overflow-hidden w-[380px]'}>
                {/*header*/}
                <div className="bg-red-700 text-white p-5 text-center">
                    <h1 className="text-2xl font-bold mb-2">بازیابی رمز عبور</h1>
                    <p className="opacity-90">رمز عبور جدید خود را وارد کنید</p>
                </div>
                <form onSubmit={handleSubmit(submit)} className={'p-4'}>
                    <div className={'relative'}>
                        <input type="text"
                               {...register('password', {
                                   required: "فیلد الزامی",
                                   pattern: {value: Regex.password, message: "رمز نامعتبر حداقل 8 رقم شامل عدد و حروف"},
                               })}
                               className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                               placeholder="رمز جدید"/>
                        {errors.password ? (
                            <span
                                className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.password.message} </span>) : null}
                    </div>
                    <div className={'mt-6'}>
                        <button
                            className={'bg-red-700 w-full p-2 rounded-lg text-white'}>تایید
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ResetPasswordPage
