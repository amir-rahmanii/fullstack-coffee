import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
    email: Yup.string().required("لطفا ایمیل خود را وارد کنید.").email("ایمیل خود را درست وارد کنید.").min(13, "ایمیل حداقل باید 13 حروف باشد.").max(30, "ایمیل حداکثر باید 30 حروف باشد."),
    password: Yup.string().required("لطفا رمزعبور خود را وارد کنید").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/, "حداقل 8 کاراکتر و حداکثر 24 کاراکتر، حداقل یک حرف و یک عدد"),
    username : Yup.string().required("لطفا نام کاربری خود را وارد کنید").min(5 , "نام کاربری حداقل باید 5 حرف باشد").max(20 , "نام کاربری حداکثر باید 20 حرف باشد")
});

export default signUpSchema;
