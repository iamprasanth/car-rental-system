import { useState, useEffect } from "react";
import DateSelection from '../../pages/date-selection/DateSelection';
import CarCard from '../../components/car-card/CarCard';
import "./carList.css";

const CarList = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [cars, setCars] = useState([]);

    useEffect(async () => {
        loadCars()
    }, []);

    const loadCars = () => {
        setCars(JSON.parse(localStorage.getItem('cars')))
    }

    return (
        <>
            <div className="container mt-100">
                <div className="row">
                    <DateSelection loadCars={loadCars} />
                </div>
                <div className="row  car-listings">

                    {cars &&
                        cars.map((car, index) => {
                            return <CarCard key={car._id} car={car} />;
                        })
                    }

                </div>
            </div>

        </>
    )
};

export default CarList;
