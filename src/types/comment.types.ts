import ProductTypes from "./product.types";


type CommentType = {
    _id: string;
    name: string;
    email: string;
    description: string;
    isActive: boolean;
    product: string;
    createdAt: Date,
};

export type ModifiedCommentType = Omit<CommentType, "product"> & {
    product: ProductTypes; // تایپ جدید برای product
};



export default CommentType
