import * as Yup from "yup";

const commentSchema = Yup.object().shape({
    productId: Yup.string().required("شناسه محصول الزامی است."),
    name: Yup.string()
        .required("نام الزامی است.")
        .min(2, "نام باید حداقل 2 کاراکتر باشد.")
        .max(50, "نام نباید بیشتر از 50 کاراکتر باشد.")
        .matches(/^[\u0600-\u06FF\s]+$/, "نام باید فقط به زبان فارسی باشد."),

    email: Yup.string()
        .required("ایمیل الزامی است.")
        .email("فرمت ایمیل نامعتبر است."),

    description: Yup.string()
        .required("توضیحات الزامی است.")
        .min(10, "توضیحات باید حداقل 10 کاراکتر باشد.")
        .max(500, "توضیحات نباید بیشتر از 500 کاراکتر باشد.")
        .matches(/^[\u0600-\u06FF\s]+$/, "توضیحات باید فقط به زبان فارسی باشد."),
});

export default commentSchema;
