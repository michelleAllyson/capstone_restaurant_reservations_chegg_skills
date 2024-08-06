import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { today } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import ReservationError from "./ReservationError";

function ReservationNew() {
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: today(),
        reservation_time: "",
        people: 1, 
    };

    const [reservation, setReservation] = useState({ ...initialFormState });
    const [errors, setErrors] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReservation({
            ...reservation,
            [name]: name === "people" ? Number(value) : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        
        const { reservation_time } = reservation;
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        const minTime = "10:30";
    
        if (!timePattern.test(reservation_time)) {
            setErrors(["Invalid reservation_time format. Please use HH:MM format."]);
            return;
        }
    
        // Check if reservation time is before 10:30 AM
        if (reservation_time < minTime) {
            setErrors(["Reservation time must be after 10:30 AM."]);
            return;
        }
    
        try {
            await createReservation(reservation, abortController.signal);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        } catch (error) {
            setErrors([error.message || error.toString()]);
        }
    };
    
    return (
        <div>
            <h1>New Reservation</h1>
            <ReservationError errors={errors} />
            <ReservationForm 
                reservation={reservation} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
            />
        </div>
    );
}

export default ReservationNew;
