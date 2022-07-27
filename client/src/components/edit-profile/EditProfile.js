import React from 'react'
import { useState, useEffect } from "react";
import { useFormik } from 'formik'
import axios from "axios";
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import api from "../../config/api";
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./editProfile.css";

export default function EditProfile({ user, loadUserPosts }) {
    const initialValues = {
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        dateOfBirth: user.dateOfBirth,
        bio: user.bio,
    }
    const validationSchema = Yup.object({
        fullname: Yup.string().required('Enter fullname'),
        username: Yup.string().required('Enter username'),
        dateOfBirth: Yup.string().required('Enter date of birth'),
        bio: Yup.string().max(200, 'Allowed Limit exceeded'),
    });
    // setValue('fullname', 'value', { shouldTouch: true })


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            alert()
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };
            try {
                const { data, error } = await axios.put(
                    api.baseUrl + '/users/' + user._id,
                    {
                        fullname: values.fullname,
                        bio: values.bio
                    },
                    config
                );
                localStorage.setItem("user", JSON.stringify(data.response));
                // loadUserPosts()
            } catch (error) {
                if (error.response.status == 400) {
                    // Validation errors
                    var validationErrors = error.response.data.message;
                    for (const key in validationErrors) {
                        formik.errors[key] = validationErrors[key]
                    }
                }
            }
        },
    });

    return (
        <div className="editProfile wrapper">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" disabled value={formik.values.email} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" disabled value={formik.values.username} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control
                        placeholder="Full name"
                        name="fullname"
                        onChange={formik.handleChange}
                    // value={formik.values.fullname}
                    />
                    <Form.Text className="error-div">
                        {formik.errors.fullname}
                    </Form.Text>
                </Form.Group>

                {/* <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <DatePicker
                        placeholder="Date of birth"
                        name="dateOfBirth"

                    />
                    <Form.Text className="error-div">
                        {formik.errors.dateOfBirth}
                    </Form.Text>
                </Form.Group> */}

                <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="write a short bio"
                        name="bio"
                        onChange={formik.handleChange}
                    // value={formik.values.bio}
                    />
                </Form.Group>
                <Form.Text className="error-div">
                    {formik.errors.bio}
                </Form.Text>
                <div className="row button">
                    <input type="submit" defaultValue="Login" />
                </div>
            </Form>
        </div>
    );
};
