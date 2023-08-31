import { FunctionComponent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";
import { useFormik } from "formik";
import * as yup from "yup";
import { checkUser } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";

interface LoginProps {
    setIsLoggedIn: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const theme = useContext(SiteTheme);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email("Invalid email"),
            password: yup.string().required().min(8, "Too short! Password required at least 8 characters")
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {
                    if (res.data.length) {
                        navigate("/home");
                        successMsg(`${values.email} has logged in`);
                        sessionStorage.setItem("isLoggedIn", "true");
                        sessionStorage.setItem("userEmail", values.email);
                        setIsLoggedIn(true);
                    } else {
                        errorMsg("Wrong email or password")
                    }
                })
                .catch((err) => console.log(err));
        },
    });

    return <>
        <div className={`login container col-md-3 ${theme.background} ${theme.color}`}>
            <h1>Welcome To ACard</h1>
            <form onSubmit={formik.handleSubmit} >
                <h3 className="display-3">LOGIN</h3>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                    {formik.touched.email && formik.errors.email &&
                        (<p className="text-danger">{formik.errors.email}</p>)}
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-danger">{formik.errors.password}</p>
                    )}
                </div>
                <button className="btn btn-success mt-2 w-100" type="submit"
                    disabled={!formik.isValid || !formik.dirty}>Login</button>
            </form>
            <Link to={"/register"} style={{ color: "blue" }}>Don't have an Acount? Register now</Link>
        </div>
    </>;
}

export default Login;