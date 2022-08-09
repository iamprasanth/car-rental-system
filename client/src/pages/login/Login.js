import React from 'react'
import { useState, useEffect } from "react";
import { useFormik } from 'formik'
import axios from "axios";
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import api from "../../config/api";
import { app } from '../../config/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import "./login.css";

export default function Login({ history }) {
    const [error, setError] = useState("");
    useEffect(() => {
        localStorage.removeItem("user");
        if (localStorage.getItem("user")) {
            history.push("/");
        }
    }, [history]);
    const initialValues = { email: '', password: '' };
    const validationSchema = Yup.object({
        email: Yup.string().required('Please enter email'),
        password: Yup.string().required('please enter password')
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            setError('');
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };
            const authentication = getAuth();
            signInWithEmailAndPassword(authentication, values.email, values.password)
                .then((response) => {
                    console.log(response);
                    axios.post(
                        api.login,
                        {
                            firebaseUserId: response.user.uid
                        },
                        config
                    ).then((response) => {
                        localStorage.setItem("user", JSON.stringify(response.data.response));
                        if (response.data.response.isAdmin) {
                            // User is an admin
                            history.push("/orders");
                        } else {
                            // USer is a customer
                            history.push("/");
                        }
                    }).catch((error) => {
                        setError('Woops something went wrong Try again later');
                    });
                }).catch((error) =>
                    setError("Incorrect Login credentials")
                );
        },
    });

    return (
        <div className="container">
            <div className="form-wrapper">
                <div className="title"><span>Login Form</span></div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <i className="fas fa-user" />
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
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
                            className={` ${formik.errors.password ? "input-box-danger" : ""}`}
                        />
                    </div>
                    <div className="error-div">
                        {formik.errors.password && formik.errors.password}
                    </div>
                    <div className="error-div">
                        {error}
                    </div>
                    <div className="row button">
                        <input type="submit" defaultValue="Login" />
                    </div>
                    <div className="signup-link">Not a member? <Link to={"/signup"}>Signup now</Link></div>
                </form>
            </div>
        </div>
    );
};
