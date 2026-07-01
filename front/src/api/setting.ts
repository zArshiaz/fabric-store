import http from "./http";

export async function  getShoppingCost(){
 const {data} =await http.get<number>('/setting/shopping-cost');
 return data;
}