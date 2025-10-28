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

    // دسته‌بندی/شناسه‌ها
    category: Category[]
    brand?: string;
    tags?: string[];
    sku?: string;

    // ظاهر و ترکیب
    colorName?: string;
    pattern?: string;
    composition?: IComposition[];
    widthCm?: number;
    finish?: string[];

    // قیمت و فروش «متری»
    pricePerMeter: number;
    pricePerMeterWithDiscount?: number;
    stockMeters?: number;
    minOrderMeters?: number;

    // رسانه/نمایش
    images: IImage[];
    status: "draft" | "active" | "archived";
    publishedAt: Date;

    // SEO
    seo?: ISeo;

    // آمار
    ratingAvg?: number;
    ratingCount: number;

    // تخفیف
    discount?: boolean;

    // تاریخچه (mongoose timestamps)
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ICartItem {
    key: string;
    _id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    description?: string;

    category: Category[]
    brand?: string;
    tags?: string[];
    sku?: string;

    colorName?: string;
    pattern?: string;
    composition?: IComposition[];
    widthCm?: number;
    finish?: string[];

    pricePerMeter: number;
    pricePerMeterWithDiscount?: number;
    stockMeters?: number;
    minOrderMeters?: number;

    images: IImage[];
    status: "draft" | "active" | "archived";
    publishedAt: Date;

    seo?: ISeo;

    ratingAvg?: number;
    ratingCount: number;

    discount?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    meters: number;
}

export interface IProductCart{
    key: string;
    _id: string;
    meters: number;
}