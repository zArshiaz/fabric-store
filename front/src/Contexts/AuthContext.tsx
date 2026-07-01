'use client';
import React, {createContext, useCallback, useContext, useEffect} from 'react'
import {TUserInfo} from "@/dtos/user.dto";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {logoutApi, me} from "@/api/auth";

interface IAuthContext {
    userInfo: TUserInfo | null;
    isLoggedIn: boolean;
    login: (userInfo: TUserInfo) => void;
    logout: () => void;
    setUserInfo: (userInfo: TUserInfo) => void;
    resetPasswordEmail:string;
    setResetPasswordEmail:(email: string) => void;
}

const AuthContext = createContext<IAuthContext | null>(null)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuthContext must be used inside AuthProvider");
    return context
}

function AuthProvider({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState<TUserInfo | null>(null);
    const [resetPasswordEmail,setResetPasswordEmail ] = React.useState<string>('');

    useEffect(() => {
        const getMe = async () => {
            await me()
                .then(data => {
                    setUserInfo(data.user);
                    setIsLoggedIn(true);
                    console.log(data);
                }).catch(err => {
                    console.error(err);
                    setIsLoggedIn(false);
                    setUserInfo(null);
                });
        };

        getMe();
    }, []);


    const login = useCallback((userInfo: TUserInfo) => {
        setIsLoggedIn(true);
        setUserInfo(userInfo);
        Swal.fire({text: 'ثبت نام با موفقیت انجام شد', timer: 1000, width: 'auto'});
    }, [])

    const logout = useCallback(async () => {

        await logoutApi()
            .then(()=>{
                setIsLoggedIn(false);
                setUserInfo(null);
                Swal.fire({text: 'خروج از سایت با موفقیت انجام شد', timer: 1000, width: 'auto'});
                router.push("/");
            })
            .catch((err) => {
                Swal.fire({text: 'خطا در خروج از سایت', icon: 'error', timer: 1000, width: 'auto'});
            })
    }, []);


    return (
        <AuthContext.Provider value={
            {
                isLoggedIn,
                userInfo,
                login,
                logout,
                setUserInfo,
                resetPasswordEmail,
                setResetPasswordEmail,
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
