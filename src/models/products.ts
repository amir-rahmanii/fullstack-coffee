const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان محصول الزامی است"],
    },
    price: {
      type: String,
      required: [true, "قیمت محصول الزامی است"],
      min: [0, "قیمت نمی‌تواند منفی باشد"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "CategoryProduct",
      required: [true, "دسته‌بندی محصول الزامی است"],
    },
    discount: {
      type: String,
      required: [true, "تخفیف محصول الزامی است"],
      min: [0, "تخفیف نمی‌تواند منفی باشد"],
      max: [100, "تخفیف نمی‌تواند بالا تر از 100 باشد"]
    },
    description: {
      type: String,
      required: [true, "توضیحات محصول الزامی است"],
    },
    weight: {
      type: String,
      required: [true, "وزن محصول الزامی است"],
      min: [0, "وزن نمی‌تواند منفی باشد"],
    },
    stock: {
      type: String,
      required: [true, " وضعیت موجودی الزامی است."],
      enum: ["0", "1"], // محدود به نقش‌های مشخص
      default: "1",
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
