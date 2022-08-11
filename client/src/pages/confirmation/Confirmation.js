import api from "../../config/api";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { dateFormatter } from '../../helpers/helper'

import "./confirmation.css";

export default function Confirmation({ history }) {

    const user = JSON.parse(localStorage.getItem('user'));


    const car = JSON.parse(localStorage.getItem('selectedCar'));
    const settings = JSON.parse(localStorage.getItem('settings'));


    console.log(process.env.STRIPE_PUBLIC_KEY)
    const config = {
        header: {
            "Content-Type": "application/json",
        },
    };
    const product = {
        customerId: user._id,
        carId: car._id,
        fromDate: settings.from_date,
        toDate: settings.to_date,
        totalDays: settings.number_of_days,
        totalFare: car.perDayFare * settings.number_of_days,
    }
    const handleToken = async (token, addresses) => {
        const result = await axios.post(
            api.createCheckoutSession,
            { token, product },
            config
        );
        const { success, response } = result.data;
        // console.log("Response:", result.data);
        if (success === true) {
            console.log("Payment Success");
            history.push({
                pathname: '/thankyou',
                search: '?order=' + response
            });
        } else {
            alert("We could not process the payment request, Please try again.");
        }
    }

    return (
        <>
            <div className="container mt-100 confirmation">
                <div className="row  car-listings">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="card mb-30"><a className="card-img-tiles" href="#">
                            <div className="inner">
                                <div className="main-img"><img src={process.env.REACT_APP_PUBLIC_FOLDER + 'cars/' + car.image} alt="Category" /></div>
                            </div></a>
                            <div className="card-body text-center">
                                <h4 className="card-title">{car.make} {car.model}</h4>
                                <p>{car.description}</p>
                                <p className="text-muted">Service start date: {dateFormatter(settings.from_date)}</p>
                                <p className="text-muted">Service end date : {dateFormatter(settings.to_date)}</p>
                                <p className="text-muted">Per day price: $ {car.perDayFare}</p>
                                <p className="text-muted">Total Fare: $ {(car.perDayFare * settings.number_of_days).toFixed(2)}</p>

                                <StripeCheckout
                                    image={process.env.REACT_APP_PUBLIC_FOLDER + 'favicon.png'}
                                    stripeKey="pk_test_51LQEUHAcQsSoHkd68ksJ8gQhVhD1Vra8fHZZJPAhw04eipQm6kORr7YK4dOWTsHm18CbNHI0TLFBSPrMiedg9SGQ00IIiHcCxu"
                                    token={handleToken}
                                    amount={(car.perDayFare * settings.number_of_day).toFixed(2) * 100}
                                    name="Checkout"
                                    billingAddress
                                    shippingAddress={false}
                                    email={user.email}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
