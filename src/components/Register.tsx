import { FunctionComponent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser } from "../services/usersService";
import { successMsg } from "../services/feedbackService";
import { SiteTheme } from "../App";

const Register: FunctionComponent = () => {
    const [isBusiness, setIsBusiness] = useState<boolean>(false);
    const theme = useContext(SiteTheme);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: { firstName: "", middleName: "", lastName: "", phone: "", email: "", password: "", state: "", country: "", city: "", street: "", imageUrl: "", imageAlt: "", houseNumber: "", zip: "" },
        validationSchema: yup.object({
            firstName: yup.string().required().min(2, "Too Short!"),
            middleName: yup.string(),
            lastName: yup.string().required().min(2, "Too Short!"),
            phone: yup.string().required().min(7, "Too Short"),
            email: yup.string().required().email("Invalid email"),
            password: yup.string().required().min(8, "Too short! Password required at least 8 characters"),
            imageUrl: yup.string(),
            imageAlt: yup.string(),
            state: yup.string(),
            country: yup.string().required().min(3, "Too Short"),
            city: yup.string().required().min(2, "Too Short"),
            street: yup.string().required().min(2, "Too Short"),
            houseNumber: yup.string().required()
        }),
        onSubmit: (values) => {
            const user = { ...values, role: isBusiness ? "Business" : "User" }
            addUser(user)
                .then((res) => {
                    navigate("/");
                    successMsg(`${values.email} was registered`)
                })
                .catch((err) => console.log(err));
        },
    });
    return <>
        <div className={`container text-center ${theme.background} ${theme.color}`}>
            <h3 className="display-3">REGISTER</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="John Doe"
                                name="firstName"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">First Name*</label>
                            {formik.touched.firstName && formik.errors.firstName && (<p className="text-danger">{formik.errors.firstName}</p>)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Middle Name"
                                name="middleName"
                                onChange={formik.handleChange}
                                value={formik.values.middleName}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Middle Name</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="John Doe"
                                name="lastName"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Last Name*</label>
                            {formik.touched.lastName && formik.errors.lastName && (<p className="text-danger">{formik.errors.lastName}</p>)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Phone*"
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Phone*</label>
                            {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Email*"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Email*</label>
                            {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Password*"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Password*</label>
                            {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="image url"
                                name="imageUrl"
                                onChange={formik.handleChange}
                                value={formik.values.imageUrl}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">image url</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Image alt"
                                name="imageAlt"
                                onChange={formik.handleChange}
                                value={formik.values.imageAlt}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Image alt</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="State"
                                name="state"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">State</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Country*"
                                name="country"
                                onChange={formik.handleChange}
                                value={formik.values.country}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Country*</label>
                            {formik.touched.country && formik.errors.country && (<p className="text-danger">{formik.errors.country}</p>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="City*"
                                name="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">City*</label>
                            {formik.touched.city && formik.errors.city && (<p className="text-danger">{formik.errors.city}</p>)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Street*"
                                name="street"
                                onChange={formik.handleChange}
                                value={formik.values.street}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Street*</label>
                            {formik.touched.street && formik.errors.street && (<p className="text-danger">{formik.errors.street}</p>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="HouseNumber*"
                                name="houseNumber"
                                onChange={formik.handleChange}
                                value={formik.values.houseNumber}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">House Number*</label>
                            {formik.touched.houseNumber && formik.errors.houseNumber && (<p className="text-danger">{formik.errors.houseNumber}</p>)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Zip Code"
                                name="zip"
                                onChange={formik.handleChange}
                                value={formik.values.zip}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Zip Code</label>
                        </div>
                    </div>
                </div>
                <div>
                    <input type="checkbox" id="checkbox" onChange={() => setIsBusiness(!isBusiness)}></input>
                    <label htmlFor="checkbox">Signup as business</label>
                </div>
                <button className="btn btn-success mt-2" type="submit"
                    disabled={!formik.isValid || !formik.dirty}>Register</button>
            </form >
            <Link to={"/"} style={{ color: "blue" }}>Already have user? Click Here</Link>
        </div >
    </>;
}

export default Register;