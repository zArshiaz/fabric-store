import http from './http'
import {ICartItem} from "@/dtos/product";

export async function createPayment(orders:{items:ICartItem[];addressId:string;}){
   const {data}=await http.post<{paymentUrl:string}>(`/payment/create`,orders);
   return data;
}