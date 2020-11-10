import { URL } from 'url';

export interface Billplz {
    id?: string;
    amount: number;
    callback_url: string;
    collection_id: string;
    description: string;
    due_at: Date;
    email: string;
    mobile?: number;
    name: string;
    paid?: boolean;
    paid_amount?: number;
    paid_at?: Date;
    redirect_url: string;
    reference_1: string;
    reference_1_label?: string;
    reference_2?: string;
    reference_2_label?: string;
    state?: string;
    url?: string;
}
