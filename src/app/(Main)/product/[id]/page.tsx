import { BreadcrumbSection } from '@/components/modules/Breadcrumb/Breadcrumb'
import connectToDB from '@/configs/db';
import React from 'react'
import productsModel from '@/models/products'
import commentsModel from '@/models/comments'
import ProductTypes from '@/types/product.types';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import ProductDetails from '@/components/template/ProductDetails/ProductDetails';
import AllComments from '@/components/template/ProductDetails/AllComments/AllComments';
import CommentType from '@/types/comment.types';


async function Product({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  await connectToDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  const product: ProductTypes | null = await productsModel
    .findById(id, "-__v -updatedAt")
    .populate("category")
    .lean();

  const comments: CommentType[] | [] = await commentsModel
    .find({ product : id ,isActive: true }, "-__v -updatedAt")
    .lean();


  if (!product) {
    return notFound();
  }

  product._id = product._id.toString();


  return (
    <>
      <BreadcrumbSection BreadcrumbLinkArray={[{ name: "محصولات", path: "/shop" }]} BreadcrumbPageTitle={product.title} />
      <ProductDetails product={product} />
      <AllComments comments={comments} productId={product._id.toString()} />
    </>
  )
}
export default Product



export const revalidate = 60;
export async function generateStaticParams() {
  await connectToDB();
  const products = await productsModel.find({}, "-__v -updatedAt");

  return products.map((product: ProductTypes) => ({
    id: product._id.toString(),
  }))
}