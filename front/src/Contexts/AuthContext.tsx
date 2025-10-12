'use client';
import React, {createContext, useCallback, useContext, useEffect} from 'react'
import {TUserInfo} from "@/types/userInfo";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
interface IAuthContext {
    userInfo:TUserInfo|null,
    isLoggedIn:boolean,
    login:(userInfo:TUserInfo)=>void
    logout:() => void
    setUserInfo:(userInfo:TUserInfo)=>void
}

const AuthContext=createContext<IAuthContext|null>(null)

export const useAuthContext = ()=>{
    const context = useContext(AuthContext)
    if(!context)  throw new Error("useAuthContext must be used inside AuthProvider");
    return context
}

function AuthProvider({children}:{children:React.ReactNode}) {
    const router = useRouter();
    const[isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState<TUserInfo|null>(null);

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/auth/me", {
                    method: "GET",
                    credentials: "include", // 👈 کوکی HttpOnly ضمیمه میشه
                });

                if (!res.ok) {
                    console.log('error',res.status)
                    setIsLoggedIn(false);
                    setUserInfo(null);
                    return;
                }

                const data = await res.json();
                setUserInfo(data.user);
                setIsLoggedIn(true);
            } catch (err) {
                console.error(err);
            }
        };

        getMe();
    }, []);




    const login = useCallback(( userInfo:TUserInfo) => {
        setIsLoggedIn(true);
        setUserInfo(userInfo);
        Swal.fire({text:'ثبت نام با موفقیت انجام شد',timer:1000,width:'auto'});
    }, [])

    const logout = useCallback(async () => {
        try {
            await fetch("http://localhost:4000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            setIsLoggedIn(false);
            setUserInfo(null);
            Swal.fire({text:'خروج از سایت با موفقیت انجام شد' ,timer:1000,width:'auto'});
            router.push("/");
        } catch (e) {
            Swal.fire({text:'خطا در خروج از سایت' ,icon:'error',timer:1000,width:'auto'});        }
    }, []);


    return (
       <AuthContext.Provider value={
           {
               isLoggedIn,
               userInfo,
               login,
               logout,
               setUserInfo
           }
       }>
           {children}
       </AuthContext.Provider>
    )
}

export default AuthProvider
