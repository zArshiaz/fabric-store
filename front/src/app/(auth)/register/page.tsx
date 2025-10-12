'use client'
import {Metadata} from "next";
import {useForm} from "react-hook-form";
import React from "react";
import {useAuthContext} from "@/Contexts/AuthContext";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {LuLoaderCircle} from "react-icons/lu";
import Regex from "@/Utilities/Regex";
import {FiEye, FiEyeOff} from "react-icons/fi";

type TFormValues = {
    name: string,
    email: string,
    password: string,
    repeatPassword: string
}


function Register() {
    const {register, getValues,reset, handleSubmit, formState: {errors}} = useForm<TFormValues>({
        mode: 'onBlur'
    })
    const router = useRouter();
    const {login} = useAuthContext();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const onSubmit = async (values: TFormValues) => {
        const {repeatPassword, ...newValues} = values
        try {
            setLoading(true);
            const data = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(newValues)
            }).then(res => res.json())
            login(data.user);
            await Swal.fire({text: 'ثبت نام با موفقیت انجام شد', timer: 1000});
            reset();
            router.back();
        } catch (error) {
            await Swal.fire({text: 'خطا در ثبت نام', icon: 'error', timer: 1000});

        } finally {
            setLoading(false);
        }
    }

    return (

        <div className={'text-zinc-700  flex flex-col '}>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-6'} noValidate={true}>
                <div className={'relative'}>
                    <input type="text"
                           {...register('name', {
                               required: 'نام الزامی',
                               minLength: {value: 3, message: 'نام باید حداقل سه کاراکتر باشد'}
                           })}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="نام کامل خود را وارد کنید"/>
                    {errors.name ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.name.message} </span>) : null}
                </div>
                <div className={'relative'}>
                    <input type="email"
                           {...register('email', {
                               required: "ایمیل الزمی",
                               pattern: {value: Regex.email, message: "ایمیل نامعتبر"},
                               validate: async (v) => {
                                   const e = {
                                       email: v
                                   }
                                   try {
                                       const data = await fetch('http://localhost:4000/api/auth/check-email', {
                                           method: "POST",
                                           headers: {
                                               "Content-Type": "application/json"
                                           },
                                           body: JSON.stringify(e)
                                       }).then(res => res.json())
                                       if (data.exist) {
                                           return 'این ایمیل قبلا در سایت ثبت نام شده است'
                                       }
                                       return true
                                   } catch (e) {
                                       console.log(e)
                                       return 'خطا در برقراری با سرور'
                                   }
                               }
                           })}
                           className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="ایمیل"/>
                    {errors.email ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.email.message} </span>) : null}
                </div>
                <div className={'relative'}>
                    <input type={showPassword?"text":"password"}
                           {...register('password', {
                               required: 'رمز عبور ضروری است',
                               pattern: {value: Regex.password, message: 'رمز عبور حداقل باید 8رقم باشد'}
                           })}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="رمز عبور"/>
                    {showPassword ? <FiEyeOff onClick={()=>{setShowPassword(false)}} className={'absolute top-0 bottom-0 left-2.5 my-auto text-lg cursor-pointer'} />
                        : < FiEye onClick={()=>{setShowPassword(true)}} className={'absolute top-0 bottom-0 left-2.5 my-auto text-lg cursor-pointer'} />}

                    {errors.password ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.password.message} </span>) : null}
                </div>
                <div className={'relative'}>
                    <input type={showRepeatPassword?"text":"password"}
                           {...register('repeatPassword', {
                               required: 'تکرار رمز عبور ضروری',
                               validate: (v) => {
                                   if (v !== getValues('password')) return 'تکرار رمز عبور همخانی ندارد'
                                   return true

                               }
                           })}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="تکرار رمز عبور"/>
                    {showRepeatPassword ? <FiEyeOff onClick={()=>{setShowRepeatPassword(false)}} className={'absolute top-0 bottom-0 left-2.5 my-auto text-lg cursor-pointer'} />
                        : < FiEye onClick={()=>{setShowRepeatPassword(true)}} className={'absolute top-0 bottom-0 left-2.5 my-auto text-lg cursor-pointer'} />}
                    {errors.repeatPassword ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.repeatPassword.message} </span>) : null}
                </div>
                <button type="submit"
                        className="w-full h-12 text-lg flex justify-center items-center bg-red-700 hover:bg-red-800 text-white rounded-lg  transition-all duration-300 ">
                    ثبت نام
                    {loading && (<LuLoaderCircle className={'ms-2 animate-spin'}/>)}
                </button>
            </form>

        </div>
    )
}

export default Register
