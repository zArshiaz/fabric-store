import {IComment} from "@/dtos/comment";

export interface IComposition {
    fiber: string;
    percent: number;
}

export interface IImage {
    url: string;
    alt: string;
}

export interface ISeo {
    metaTitle?: string;
    metaDescription?: string;
}

export interface Category {
    _id: string
    name: string
    slug: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface IProduct {
    _id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    description?: string;

    category: Category[]
    brand: string;

    colorName: string;
    pattern: string;
    composition: string;
    widthCm: number;
    finish?: string[];

    pricePerMeter: number;
    price: number;
    stockMeters: number;

    images: IImage[];
    status: "draft" | "active" | "archived";

    seo: ISeo;

    ratingAvg: number;
    ratingCount: number;

    discount:{
        active:boolean;
        percent:number;
    };

    comments:IComment[];
    createdAt: Date;
    updatedAt: Date;
}


export interface ICartItem {
    key: string;
    _id: string;
    meters: number;

}