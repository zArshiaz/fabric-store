import http from "./http";
import {OrderDto, OrdersDto} from "@/dtos/order.dto";
import {ICartItem} from "@/dtos/product";

export const getAllOrders = async (): Promise<OrdersDto> => {
    const { data } = await http.get<OrdersDto>("/order");
    return data;
};

export const getOrderById = async (id: string): Promise<OrderDto> => {
  const {data}= await http.get<OrderDto>(`/order/${id}`);
  return data
}
export const orderApi = async (orders:{items:ICartItem[];addressId:string;addressCost:number}) => {
  const {data}= await http.post(`/order/`,orders);
  return data
}
