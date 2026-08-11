import http from './http'
import {IProduct} from "@/dtos/product";
import {IPagination} from "@/dtos/pagination";

export const getProductByQuery = async (queryString:string) => {
    const {data}= await http.get<{products:IProduct[],pagination:IPagination}>(`/product?${queryString}`);
    return data
}
export const getProductBySlug = async (slug:string) => {
    const {data}= await http.get<IProduct>(`/product/${slug}`);
    return data
}
export const getProductById = async (id:string) => {
    const {data}= await http.get<IProduct>(`/product/${id}`);
    return data
}
export const getLastProducts = async () => {
    const {data}= await http.get<IProduct[]>(`/product/last`);
    return data
}
export const getAllProducts = async () => {
    const {data}= await http.get<IProduct[]>(`/product/all`);
    return data
}
