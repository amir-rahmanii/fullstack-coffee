import * as Yup from "yup";

const categoryProductSchema = Yup.object().shape({
  title: Yup.string()
    .required("عنوان دسته بندی محصول الزامی است.")
    .min(4, "عنوان دسته بندی محصول باید حداقل 4 کاراکتر باشد.")
    .max(20, "عنوان دسته بندی محصول نباید بیشتر از 20 کاراکتر باشد.")
    .matches(/^[\u0600-\u06FF\s]+$/, "عنوان دسته بندی محصول باید فقط به زبان فارسی باشد."),
});

export default categoryProductSchema;
