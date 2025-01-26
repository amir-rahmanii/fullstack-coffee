import CategoryProductType from "./categoryProduct.types"

type ProductTypes = {
    _id: string,
    title: string,
    price: number,
    priceWithDiscount: number,
    discount: string,
    stock: "0" | "1",
    category: CategoryProductType,
    description: string,
    weight: number,
    images: string[],
    createdAt: Date,
    updatedAt: Date
}



export default ProductTypes