const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "نام کاربری الزامی است."],
      unique: true, // جلوگیری از تکراری بودن نام کاربری
      trim: true, // حذف فاصله‌های اضافی
      minlength: [5, "نام کاربری باید حداقل 5 کاراکتر باشد."],
      maxlength: [20, "نام کاربری نمی‌تواند بیش از 20 کاراکتر باشد."],
    },
    email: {
      type: String,
      required: [true, "ایمیل الزامی است."],
      unique: true, // جلوگیری از تکراری بودن ایمیل
      trim: true,
      lowercase: true, // ذخیره ایمیل به صورت حروف کوچک
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "لطفاً یک ایمیل معتبر وارد کنید.",
      ],
    },
    password: {
      type: String,
      required: [true, "رمز عبور الزامی است."],
      minlength: [8, "رمز عبور باید حداقل 8 کاراکتر باشد."],
      maxlength: [100, "رمز عبور نمی‌تواند بیش از 100 کاراکتر باشد."],
    },
    role: {
      type: String,
      required: [true, "نقش کاربر الزامی است."],
      enum: ["USER", "ADMIN"], // محدود به نقش‌های مشخص
      default: "USER",
    },
  },
  { timestamps: true } // اضافه کردن فیلدهای createdAt و updatedAt
);

const model = mongoose.models.User || mongoose.model("User", schema);

export default model;
