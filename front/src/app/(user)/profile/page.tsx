'use client'
import React, {useEffect} from 'react'
import Regex from "@/Utilities/Regex";
import {useForm} from "react-hook-form";
import {useAuthContext} from "@/Contexts/AuthContext";
import Swal from "sweetalert2";

type TForm = {
    name: string,
    email: string,
    phone: string,
}

function ProfilePage() {
    const {userInfo,setUserInfo} = useAuthContext()
    const {register,reset, handleSubmit,formState: {errors,isSubmitting,isDirty}} = useForm<TForm>({
        mode: "onChange",
        defaultValues:{
            name:userInfo?.name,
            email:userInfo?.email,
            phone:userInfo?.phone
        }
    })
    useEffect(() => {
        reset({name:userInfo?.name,email:userInfo?.email,phone:userInfo?.phone})
    }, [userInfo]);

    const submit =async (d:TForm) => {
         await fetch(`http://localhost:4000/api/auth/${userInfo?.id}`,{
          method: "PUT",
          headers: {
              "content-Type": "application/json",
          },
          body: JSON.stringify(d)
      }).then(res => res.json())
          .then(data => {
              Swal.fire({
                  text: 'تغییرات با موفقیت اعمال شد',
                  icon: "success",
                  width:400,
                  timer: 1500,
              })
                setUserInfo(data);
          })
          .catch(err => console.log(err))
    }

    if (userInfo) return (
        <form onSubmit={handleSubmit(submit)}  noValidate={true} className={'flex flex-col justify-between h-full'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
                <div className={'relative'}>
                    <input type="name"
                           {...register('name',{
                               required:'نام ضروری',
                               minLength:{value:3,message:'نام باید حداقل سه کاراکتر باشد'}
                           })}
                           className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="نام"/>
                    {errors.name ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.name.message} </span>) : null}
                </div>
                <div className={'relative'}>
                    <input type="email"
                           {...register('email',{
                               required:'ایمیل ضروری',
                               pattern:{value:Regex.email,message:'ایمیل نامعتبر'},
                               validate:async (v)=>{
                                   if(v===userInfo.email) return true
                                  const result= await fetch('http://localhost:4000/api/auth/check-email',{
                                      method:'POST',
                                      headers:{
                                            "content-type":"application/json"
                                      },
                                      body:JSON.stringify({email:v})
                                  }).then(res=>res.json())

                                   if(result.exist) return 'ایمیل تکرای'
                                   return true
                               }
                           })}
                           dir={'ltr'}

                           className="text-left w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="ایمیل"/>
                    {errors.email ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.email.message} </span>) : null}
                </div>
                <div className={'relative'}>
                    <input type="phone"
                           {...register('phone',{
                               pattern:{value:Regex.phoneNumber,message:'شماره تلفن نامعتبر'}
                           })}
                        dir={'ltr'}
                           className="text-left w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                           placeholder="شماره تلفن"/>
                    {errors.phone ? (
                        <span
                            className={'absolute top-full right-2 text-red-700 mt-1 text-xs'}>{errors.phone.message} </span>) : null}
                </div>
            </div>
            <button
                disabled={isSubmitting || !isDirty}
                className={'w-40 mx-auto block py-1 mt-6 rounded-lg text-lg text-red-400 border-2 border-red-400 transition-all hover:text-white hover:bg-red-400 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed'}
                type={'submit'}>
                {isSubmitting?'درحال ذخیره':'ذخیره'}
            </button>
        </form>
    )
}

export default ProfilePage
