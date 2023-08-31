import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMsg } from "../services/feedbackService";
import { addCard } from "../services/cardService";
interface AddCardProps {
    user: any;
}

const AddCard: FunctionComponent<AddCardProps> = ({ user }) => {
    const userId = user.id;
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userId: userId, title: "", subTitle: "", description: "", phone: "", email: "", web: "", imageUrl: "", imageAlt: "", country: "", state: "", city: "", street: "", houseNumber: "", zip: 0
        },
        validationSchema: yup.object({
            title: yup.string().required().min(3, "Too Short!"),
            subTitle: yup.string().required().min(3, "Too Short!"),
            description: yup.string().required().min(10, "Too Short!"),
            phone: yup.string().required().min(7, "Too Short"),
            email: yup.string().required().email("Invalid email"),
            web: yup.string(),
            imageUrl: yup.string(),
            imageAlt: yup.string(),
            state: yup.string(),
            country: yup.string().required().min(3, "Too Short"),
            city: yup.string().required().min(2, "Too Short"),
            houseNumber: yup.string().required(),
            zip: yup.number()
        }),
        onSubmit: (values) => {
            const filteredValues = {
                ...values,
                web: values.web.trim(),
                imageUrl: values.imageUrl.trim(),
                imageAlt: values.imageAlt.trim(),
                state: values.state.trim()
            };
            addCard(filteredValues)
                .then((res) => {
                    navigate(`/my-cards/${user.id}`);
                    successMsg(`${values.title} was added succesfully`)
                })
                .catch((err) => console.log(err));
        },
    })
    const handleFormReset = () => {
        formik.resetForm();
    };
    return <>
        <div className="container text-center">
            <h3 className="display-3">Create Card</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Title"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Title*</label>
                            {formik.touched.title && formik.errors.title && (<p className="text-danger">{formik.errors.title}</p>)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Subtitle*"
                                name="subTitle"
                                onChange={formik.handleChange}
                                value={formik.values.subTitle}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Subtitle*</label>
                            {formik.touched.subTitle && formik.errors.subTitle && (<p className="text-danger">{formik.errors.subTitle}</p>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Description*"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                onBlur={formik.handleBlur}
                            ></input>
                            <label htmlFor="floatingInput">Description*</label>
                            {formik.touched.description && formik.errors.description && (<p className="text-danger">{formik.errors.description}</p>)}
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
                            <input type="text" className="form-control" id="floatingInput" placeholder="Web"
                                name="web"
                                onChange={formik.handleChange}
                                value={formik.values.web}
                                onBlur={formik.handleBlur}></input>
                            <label htmlFor="floatingInput">Web</label>
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
                                onBlur={formik.handleBlur} ></input>
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
                <button className="btn btn-success mt-2 w-100" type="submit"
                    disabled={!formik.isValid || !formik.dirty}>Submit</button>
            </form >
            <div>
                <Link to={"/home"} className="btn btn-danger mt-2 w-50 ">Back</Link>
                <button className="btn btn-success mt-2 w-50" onClick={handleFormReset} >Reset</button>
            </div>
        </div >
    </>;
}

export default AddCard;