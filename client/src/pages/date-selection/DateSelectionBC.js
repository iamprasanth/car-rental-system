import { ToastProvider } from 'react-toast-notifications';
import { useState, useEffect } from "react";
import { useFormik } from 'formik'
import axios from "axios";
import * as Yup from 'yup'
import api from "../../config/api";
import { Link } from "react-router-dom";
import "./dateSelection.css";

export default function DateSelection({ history }) {

    const user = JSON.parse(localStorage.getItem('user'));

    const initialValues = { from_date: '', to_date: '', passenger_count: '' };

    const validationSchema = Yup.object({
        from_date: Yup.string().required('Please enter date from which service is required'),
        to_date: Yup.string().required('Please enter date upto which service is required'),
        passenger_count: Yup.number('Please enter a valid count')
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const fromData =
            {
                from_date: values.from_date,
                to_date: values.to_date,
                passenger_count: values.passenger_count
            };
            try {
                const { data, error } = await axios.post(api.getCars, fromData, {
                    config,
                });
                if (data.success) {
                    localStorage.setItem("cars", JSON.stringify(data.response));
                    // history.push("/select-car");
                } else {
                    // server side validation error
                    var validationErrors = data.message;
                    for (const key in validationErrors) {
                        formik.errors[key] = validationErrors[key]
                    }
                }
            } catch (error) {

            }
        },
    });

    return (
        <>
            <div className="container date-selection-page">
                <div className="form-wrapper">
                    <div className="title"><span>Select dates and number of passenger</span></div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div class="col-sm-3"></div>
                            <div className="form-group">
                                <label htmlFor="inputFronDate">From Date</label>
                                <i className="fa fa-calendar" />
                                <input
                                    type="date"
                                    name="from_date"
                                    id="inputFronDate"
                                    autoComplete="new-password"
                                    onChange={formik.handleChange}
                                    value={formik.values.from_date}
                                    className={` ${formik.errors.from_date ? "input-box-danger" : ""}`}
                                />
                            </div>
                        </div>
                        <div className="error-div">
                            {formik.errors.from_date}
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="inputToDate">To Date</label>
                                <i className="fa fa-calendar" />
                                <input
                                    type="date"
                                    name="to_date"
                                    id="inputToDate"
                                    onChange={formik.handleChange}
                                    value={formik.values.to_date}
                                    className={` ${formik.errors.to_date ? "input-box-danger" : ""}`}
                                />
                            </div>
                        </div>
                        <div className="error-div">
                            {formik.errors.to_date}
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="passengerCount">Number of Passengers</label>
                                <i className="fa fa-user" />
                                <input
                                    type="number"
                                    name="passenger_count"
                                    id="passengerCount"
                                    onChange={formik.handleChange}
                                    placeholder="Not mandatory to fill"
                                    value={formik.values.passenger_count}
                                    className={` ${formik.errors.passenger_count ? "input-box-danger" : ""}`}
                                />
                            </div>
                        </div>
                        <div className="error-div">
                            {formik.errors.passenger_count}
                        </div>
                        <div className="error-div">
                            {/* {error} */}
                        </div>
                        <div className="row button">
                            <input type="submit" value="Find Cars for me" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

