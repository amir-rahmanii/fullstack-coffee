import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    email: Yup.string().required("لطفا ایمیل خود را وارد کنید.").email("ایمیل خود را درست وارد کنید.").min(13, "ایمیل حداقل باید 13 حروف باشد.").max(30, "ایمیل حداکثر باید 30 حروف باشد."),
    password: Yup.string().required("لطفا رمزعبور خود را وارد کنید").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/, "حداقل 8 کاراکتر و حداکثر 24 کاراکتر، حداقل یک حرف و یک عدد")
});

export default loginSchema;
