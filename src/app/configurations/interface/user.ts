export interface User {
    _id?: string;
    username?: string;
    date?: Date;
    admin?: boolean;
    authenticated?: boolean;
    name?: string;
    email: string;
    phone?: string;
    birthDate?: Date;
    level?: string;
    introducer?: string;
    introducerInfo?: object;
    password?: string;
    cpassword?: string;
    address1?: string;
    address2?: string;
    postcode?: number;
    city?: string;
    state?: string;
    tcCheckBox?: boolean;
}
