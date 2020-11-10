export interface Blog {
    _id?: string;
    created?: Date;
    category: string;
    title: string;
    content: string;
    tags?: string;
    image: string;
}
