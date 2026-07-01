import http from "@/api/http";
import {TNav} from "@/Components/Header/Header";

export const getNavbar = async () => {
    const {data}= await http.get<TNav[]>(`/navbar`);
    return data
}