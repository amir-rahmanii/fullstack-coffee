import CategoryProductType from "./categoryProduct.types"

type ProductTypes = {
    _id: string,
    title: string,
    price: string,
    priceWithDiscount: string,
    discount: string,
    stock: "0" | "1",
    category: CategoryProductType,
    description: string,
    weight: string,
    images: string[],
    createdAt: Date,
    updatedAt: Date
}

export default ProductTypes