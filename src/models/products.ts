const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان محصول الزامی است"],
    },
    price: {
      type: Number,
      required: [true, "قیمت محصول الزامی است"],
      min: [0, "قیمت نمی‌تواند منفی باشد"],
    },
    description: {
      type: String,
      required: [true, "توضیحات محصول الزامی است"],
    },
    weight: {
      type: Number,
      required: [true, "وزن محصول الزامی است"],
      min: [0, "وزن نمی‌تواند منفی باشد"],
    },
    images: {
      image1: {
        type: String, // URL یا مسیر فایل
        required: [true, "تصویر اول محصول الزامی است"],
      },
      image2: {
        type: String, // URL یا مسیر فایل
        required: [true, "تصویر دوم محصول الزامی است"],
      },
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
