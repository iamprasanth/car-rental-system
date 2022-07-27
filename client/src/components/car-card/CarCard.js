import Moment from 'react-moment';
import api from "../../config/api";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';

export const CarCard = ({ car }) => {
    const history = useHistory();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
        header: {
            "Content-Type": "application/json",
        },
    };

    const redirectToConfirmation = (car) => {
        localStorage.setItem("selectedCar", JSON.stringify(car));
        history.push("/confirmation");
    }

    return (
        <>
            <div className="col-md-6 col-sm-12">
                <div className="card mb-30"><a className="card-img-tiles" href="#">
                    <div className="inner">
                        <div className="main-img"><img src={process.env.REACT_APP_PUBLIC_FOLDER + 'cars/' + car.image} alt="Category" /></div>
                    </div></a>
                    <div className="card-body text-center">
                        <h4 className="card-title">{car.make} {car.model}</h4>
                        <p>{car.description}</p>
                        <p className="text-muted">Per day price: $ {car.perDayFare}</p><button onClick={() => redirectToConfirmation(car)} className="btn btn-outline-primary btn-sm" href="#">Proceed</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarCard
