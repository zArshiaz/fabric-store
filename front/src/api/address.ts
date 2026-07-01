import http from "./http";
import {IAddress} from "@/dtos/addtress";

export async function getAddressesApi(){
    const {data}=await http.get<IAddress[]>('/address');
    return data;
}
export async function deleteAddressById(id:string){
    const {data}=await http.delete(`/address/${id}`);
    return data;
}
export async function addAddress(d: {
    title: string;
    province: string;
    city: string;
    address: string;
    zipCode: number;
}){
    const {data}=await http.post(`/address`,d);
    return data;
}
export async function editAddress(id:string,d: {
    title: string;
    province: string;
    city: string;
    address: string;
    zipCode: number;
}){
    const {data}=await http.put(`/address/${id}`,d);
    return data;
}