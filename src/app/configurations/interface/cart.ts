import { Product } from './product';
import { User } from './user';

export interface Cart {
    _id?: string;
    user?: string;
    introducer?: string;
    created?: Date;

    products?: [{
        product?: Product,
        qty?: number
    }];
    productInfo?: [{
        product: Product
    }];
    method?: number;
    paymentMethod?: string;
    weight?: number;
    shipBy?: string;
    shipRate?: number;
    total?: number;
    status?: {
        code?: number,
        msg?: string
    };
    paymentDate?: Date;
    paymentImage?: string;
    billplz?: {
        id?: string,
        collection_id?: string,
        paid?: Boolean,
        state?: string,
        amount?: number,
        paid_amount?: number,
        due_at?: Date,
        email?: string,
        mobile?: number,
        name?: string,
        url?: string,
        reference_1_label?: string,
        reference_1?: string,
        reference_2_label?: string,
        reference_2?: string,
        redirect_url?: string,
        callback_url?: string,
        description?: string,
        paid_at?: Date
    };

}
