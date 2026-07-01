import http from "./http";
import {TUserInfo} from "@/dtos/user.dto";

export const forgotPassword = async (email: string) => {
    const {data} = await http.post<{ message: string }>("/auth/request-reset", {email});
    return data;
}
export const resetPassword = async (email:string,token: string, password: string) => {
    const {data} = await http.post<{ message: string }>("/auth/reset-password", {token, password,email});
    return data;
}
export const sendVerifyCode = async (email:string,code:string) =>{
    const {data} = await http.post<{ message: string,token:string }>("/auth/verify-reset", {email,code});
    return data;
}
export const me = async () => {
    const {data} = await http.get<{ user: TUserInfo }>("/auth/me");
    return data;
}
export const logoutApi = async () => {
    const {data} = await http.post("/auth/logout");
    return data;
}
export const loginApi = async (d: { email: string, password: string }) => {
    const {data} = await http.post<{ user: TUserInfo }>("/auth/login", d);
    return data;
}
export const registerApi = async (d: { email: string, password: string, phone: string, name: string }) => {
    const {data} = await http.post<{ user: TUserInfo }>("/auth/register", d);
    return data;
}
export const checkEmailApi = async (d: { email: string }) => {
    const {data} = await http.post("/auth/check-email", d);
    return data;
}
export const editUserApi = async (d: { name: string; email: string; phone: string; }, id: string) => {
    const {data} = await http.put<TUserInfo>(`/auth/${id}`, d);
    return data;
}
