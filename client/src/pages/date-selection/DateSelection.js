import { useFormik } from 'formik'
import axios from "axios";
import * as Yup from 'yup'
import api from "../../config/api";
import "./dateSelection.css";

export const DateSelection = ({ loadCars, history }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    var initialValues = null;
    if (localStorage.getItem("settings") === null) {
        initialValues = { from_date: '', to_date: '', passenger_count: '' };
    } else {
        const settings = JSON.parse(localStorage.getItem("settings"));
        initialValues = { from_date: settings.from_date, to_date: settings.to_date, passenger_count: settings.passenger_count };
    }
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
                    localStorage.setItem("cars", JSON.stringify(data.response.cars));
                    localStorage.setItem("settings", JSON.stringify(data.response.settings));
                    if (typeof loadCars !== "undefined") {
                        // Companent is used as child compnent in CarList
                        loadCars()
                    } else {
                        // Companent is rendered from the url "/"
                        history.push("/select-car");
                    }
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
                            <div className="col-3">
                                <div className="form-group">
                                    <label htmlFor="inputFronDate">Service Start Date</label>
                                    <i className="fa fa-calendar" />
                                    <input
                                        type="date"
                                        name="from_date"
                                        id="inputFronDate"
                                        autoComplete="new-password"
                                        onChange={formik.handleChange}
                                        value={formik.values.from_date}
                                        className={`form-control input-lg ${formik.errors.from_date ? "input-box-danger" : ""}`}
                                    />
                                </div>
                                <div className="error-div">
                                    {formik.errors.from_date}
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <label htmlFor="inputToDate">Service End Date</label>
                                    <i className="fa fa-calendar" />
                                    <input
                                        type="date"
                                        name="to_date"
                                        id="inputToDate"
                                        onChange={formik.handleChange}
                                        value={formik.values.to_date}
                                        className={`form-control input-lg ${formik.errors.to_date ? "input-box-danger" : ""}`}
                                    />
                                </div>
                                <div className="error-div">
                                    {formik.errors.to_date}
                                </div>
                            </div>

                            <div className="col-3">
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
                                        className={`form-control input-lg ${formik.errors.passenger_count ? "input-box-danger" : ""}`}
                                    />
                                </div>
                                <div className="error-div">
                                    {formik.errors.passenger_count}
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="row button">
                                    <input type="submit" value="Find Cars for me" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};


export default DateSelection