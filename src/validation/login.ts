import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  identity: Yup.string()
    .required("لطفا نام کاربری یا ایمیل خود را وارد کنید.")
    .test(
      "is-email-or-username",
      "لطفا یک ایمیل معتبر یا نام کاربری معتبر وارد کنید.",
      (value) => {
        if (!value) return false; // برای جلوگیری از خطا در ورودی خالی
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // بررسی ایمیل
        const isUsername = /^[a-zA-Z0-9_]{5,20}$/.test(value); // بررسی نام کاربری (فقط حروف، اعداد و زیرخط)
        return isEmail || isUsername;
      }
    )
    .min(4, "طول نام کاربری یا ایمیل حداقل باید 4 کاراکتر باشد.")
    .max(30, "طول نام کاربری یا ایمیل حداکثر باید 30 کاراکتر باشد."),
  password: Yup.string()
    .required("لطفا رمزعبور خود را وارد کنید")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/,
      "رمزعبور باید حداقل 8 و حداکثر 24 کاراکتر باشد و شامل حداقل یک حرف و یک عدد باشد."
    ),
});

export default loginSchema;
