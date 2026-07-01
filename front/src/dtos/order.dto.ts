import {IUserDto} from './user.dto';

export type OrdersDto=OrderDto[];

export interface OrderDto {
    _id:           string;
    orderNumber: string;
    user:          IUserDto;
    items:         ItemOrderDto[];
    address:       AddressOrderDto;
    addressCost:   number;
    productsCost:  number;
    totalPrice:    number;
    status:      "pending"|"confirmed" | "shipped" | "delivered" | "canceled"|"expired"|"paid";
    paymentCode:  string;
    refid:string;
    createdAt:     Date;
    updatedAt:     Date;
    expiresAt:     Date;
    __v:           number;
}

export interface AddressOrderDto {
    title:     string;
    userId:    string;
    province:  string;
    city:      string;
    zipCode:   number;
    address:   string;
    phone:     string;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface ItemOrderDto {
    product:       string;
    name:          string;
    price:         number;
    count:         number;
    image:         string;
    discountPrice: number;
}

