import * as Yup from "yup";

const productSchema = Yup.object().shape({
  title: Yup.string()
    .required("عنوان محصول الزامی است.")
    .min(4, "عنوان محصول باید حداقل 4 کاراکتر باشد.")
    .max(100, "عنوان محصول نباید بیشتر از 100 کاراکتر باشد.")
    .matches(/^[\u0600-\u06FF\s]+$/, "عنوان محصول باید فقط به زبان فارسی باشد."),
  
  description: Yup.string()
    .required("توضیحات محصول الزامی است.")
    .matches(/^[\u0600-\u06FF\s]+$/, "توضیحات محصول باید فقط به زبان فارسی باشد."),
  
  price: Yup.number()
    .required("قیمت محصول الزامی است.")
    .positive("قیمت باید عددی مثبت باشد.")
    .typeError("قیمت باید عدد باشد.")
    .min(1, "حداقل قیمت باید 1 باشد."),
  
  discount: Yup.number()
    .required("درصد تخفیف الزامی است.")
    .positive("درصد تخفیف باید عددی مثبت باشد.")
    .typeError("درصد تخفیف باید عدد باشد.")
    .min(0, "حداقل درصد تخفیف باید 0 باشد.")
    .max(100, "حداکثر درصد تخفیف باید 100 باشد."),
  
  weight: Yup.number()
    .required("وزن محصول الزامی است.")
    .positive("وزن باید عددی مثبت باشد.")
    .typeError("وزن باید عدد باشد.")
    .min(0, "حداقل وزن باید 0 باشد."),
});

export default productSchema;
