import React from 'react'
import { useState, useEffect } from "react";
import { useFormik } from 'formik'
import axios from "axios";
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import api from "../../config/api";
import { app } from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import "./signup.css";

export default function Signup({ history }) {
    const [error, setError] = useState("");

    const initialValues = {
        fullname: '',
        email: '',
        username: '',
        password: '',
        confirm_password: ''
    }
    const validationSchema = Yup.object({
        fullname: Yup.string().required('Please enter Full Name'),
        email: Yup.string().required('Please enter email').email('Invaid email'),
        phone: Yup.string().required('Please enter phone number'),
        password: Yup.string().required('Please enter password').min(6, 'Password should be at least 6 characters long'),
        confirm_password: Yup.string().required('Please enter password again').oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };
            const authentication = getAuth();
            createUserWithEmailAndPassword(authentication, values.email, values.password)
                .then((response) => {
                    axios.post(
                        api.register,
                        {
                            firebaseUserId: response.user.uid,
                            fullname: values.fullname,
                            phone: values.phone,
                            email: values.email,
                            password: values.password
                        },
                        config
                    ).then((response) => {
                        console.log(JSON.stringify(response.data))
                        localStorage.setItem("user", JSON.stringify(response.data));
                        history.push("/"); // redirect to home page
                    }).catch((error) => {
                        if (error.response.status == 400) {
                            // Validation errors
                            var validationErrors = error.response.data.message;
                            for (const key in validationErrors) {
                                formik.errors[key] = validationErrors[key]
                            }
                        } else if (error.response.status == 500 && error.response.data) {
                            // Server errors
                            setError(error.response.data.message)
                        } else {
                            // some kind of Uncaught server error
                            setError('Woops something went wrong Try again later');
                        }
                    });
                }).catch((error) => {
                    if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                        formik.setFieldError("email", "Email already exist");
                    }
                });

        },
    });

    return (
        <div className="container">
            <div className="form-wrapper">
                <div className="title"><span>Sign up Form</span></div>

                <form onSubmit={formik.handleSubmit}>

                    <div className="row">
                        <i className="fas fa-user" />
                        <input
                            type="text"
                            placeholder="Full name"
                            name="fullname"
                            onChange={formik.handleChange}
                            value={formik.values.fullname}
                            className={`${formik.errors.fullname ? "input-box-danger" : ""}`}
                        />
                    </div>
                    <div className="error-div">
                        {formik.errors.fullname}
                    </div>
                    <div className="row">
                        <i className="fas fa-phone" />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            autoComplete="new-password"
                            className={`${formik.errors.phone ? "input-box-danger" : ""}`}
                        />
                    </div>
                    <div className="error-div">
                        {formik.errors.phone}
                    </div>
                    <div className="row">
                        <i className="fas fa-user" />
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className={`${formik.errors.email ? "input-box-danger" : ""}`}
                        />
                    </div>
                    <div className="error-div">
                        {formik.errors.email}
                    </div>
                    <div className="row">
                        <i className="fas fa-lock" />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            autoComplete="new-password"
                            className={` ${formik.errors.password ? "input-box-danger" : ""}`}
                        />
                    </div>
                    <div className="error-div">
                        {formik.errors.password}
                    </div>
                    <div className="row">
                        <i className="fas fa-lock" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirm_password"
                            onChange={formik.handleChange}
                            value={formik.values.confirm_password}
                            className={` ${formik.errors.confirm_password ? "input-box-danger" : ""}`}
                        />
                    </div>
                    <div className="error-div">
                        {formik.errors.confirm_password}
                    </div>
                    <div className="error-div">
                        {error}
                    </div>
                    <div className="row button">
                        <input type="submit" defaultValue="Login" />
                    </div>
                    <div className="signup-link">Already a member? <Link to={"/login"}>Login</Link></div>
                </form>

            </div>
        </div>
    );
};
