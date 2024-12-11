import CategoryProductType from "./categoryProduct.types"

type ProductTypes = {
    _id : string,
    title : string,
    price : string,
    discount : string,
    category : CategoryProductType,
    description : string,
    weight : string,
    images : string[],
    createdAt : Date
}

export default ProductTypes