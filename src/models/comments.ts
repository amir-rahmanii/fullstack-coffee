const mongoose = require("mongoose");
const products = require("@/models/products")

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام الزامی است"],
    },
    email: {
      type: String,
      required: [true, "ایمیل الزامی است"],
    },
    description : {
        type : String ,
        required: [true, "نظر الزامی است"],
    },
    isActive : {
        type : Boolean ,
        required: true,
        default : false
    },
    product : {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: [true, "محصول الزامی است"],
    }
    
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
