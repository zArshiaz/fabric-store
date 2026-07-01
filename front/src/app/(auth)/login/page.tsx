'use client'
import React, {useState} from 'react'
import {Metadata} from "next";
import Regex from "@/Utilities/Regex";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {useForm} from "react-hook-form";
import {LuLoaderCircle} from "react-icons/lu";
import {useAuthContext} from "@/Contexts/AuthContext";
import {useRouter, useSearchParams} from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import {loginApi} from "@/api/auth";


type TFormValues = {
    email: string,
    password: string,
}

function Login() {
    const {register, reset, handleSubmit, formState: {errors}} = useForm<TFormValues>({
        mode: "onBlur"
    })
    const {login} = useAuthContext()
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectParam = searchParams.get("redirect");
    const redirect = redirectParam ? redirectParam : "/";
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const submit = async (d: TFormValues) => {
        setLoading(true);
        try {
            const data = await loginApi({email: d.email, password: d.password})

            setLoading(false);
            login(data.user);
            await Swal.fire({
                text: 'ورود  با موفقیت انجام شد',
            });
            reset();
            router.replace(redirect);

        } catch (e) {
            setLoading(false);
            await Swal.fire({text: 'خطا در  ورود', icon: 'error', timer: 2000,});
        }
    }


    return (
        <div className={'text-zinc-700  flex flex-col '}>
            <form onSubmit={handleSubmit(submit)} className={'space-y-6'} noValidate={true}>
                <div className={'relative'}>
                    <input type="email"
                           {...register('email', {
                               required: "ایمیل الزمی",
                               pattern: {value: Regex.email, message: "ایمیل نامعتبر"},
                           })}
                           className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="ایمیل"/>
                    {errors.email ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.email.message} </span>) : null}
                </div>
                <div className={'relative'}>
                    <input type={showPassword ? "text" : "password"}
                           {...register('password', {
                               required: 'رمز عبور ضروری است',
                               pattern: {value: Regex.password, message: 'رمز عبور حداقل باید 8رقم باشد'}
                           })}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="رمز عبور"/>
                    {showPassword ? <FiEyeOff onClick={() => {
                            setShowPassword(false)
                        }} className={'absolute top-0 bottom-0 left-2.5 my-auto text-lg cursor-pointer'}/>
                        : < FiEye onClick={() => {
                            setShowPassword(true)
                        }} className={'absolute top-0 bottom-0 left-2.5 my-auto text-lg cursor-pointer'}/>}

                    {errors.password ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.password.message} </span>) : null}
                </div>
                <button type="submit"
                        className="w-full h-12 text-lg flex justify-center items-center bg-red-700 hover:bg-red-800 text-white rounded-lg  transition-all duration-300 ">
                    ورود
                    {loading && (<LuLoaderCircle className={'ms-2 animate-spin'}/>)}
                </button>
            </form>
            <div className={'mt-3'}>
                <Link className={'ms-1 text-gray-500 text-sm hover:text-blue-600 hover:border-b'}
                      href="/forgot-password/email"> رمز عبور خود را فراموش کرده اید؟</Link>
            </div>
        </div>
    )
}

export default Login
