const mongoose = require("mongoose");

const categoryProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان دسته بندی الزامی است"],
    },
  },
  { timestamps: true }
);

const CategoryProduct =
  mongoose.models.CategoryProduct || mongoose.model("CategoryProduct", categoryProductSchema);

export default CategoryProduct;
