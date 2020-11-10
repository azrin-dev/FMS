export interface Product {
    created?: Date;
    _id?: string;
    id?: string;
    name: string;
    code: string;
    category?: string;
    price: number;
    salePrice?: number;
    description?: string;
    packagingSize?: string;
    packagingWeight?: number;
    delivery?: string;
    image: File;
    tags?: string;
    index?: number;
}
