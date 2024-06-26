import React from "react";
import ReservationError from "./ReservationError";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import { today } from "../utils/date-time";
import { useState } from "react";


// The /reservations/new page will: 
// have the following required and not-nullable fields:
// First name: <input name="first_name" />
// Last name: <input name="last_name" />
// Mobile number: <input name="mobile_number" />
// Date of reservation: <input name="reservation_date" />
// Time of reservation: <input name="reservation_time" />
// Number of people in the party, which must be at least 1 person. <input name="people" />
// display a Submit button that, when clicked, saves the new reservation, then displays the /dashboard page for the date of the new reservation
// display a Cancel button that, when clicked, returns the user to the previous page
// display any error messages returned from the API


function ReservationNew () {

    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: today(),
        reservation_time: "",
        people: 0,
    };

    const [reservation, setReservation] = useState({ ...initialFormState });
    const [errors, setErrors] = useState(null);

    const handleChange = ({ target }) => {
        setReservation({
            ...reservation,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            const response = await createReservation(reservation, abortController.signal);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
            return response;
        } catch (error) {
            setErrors([error]);
        }
    };

    return (
        <div>
            <h1>New Reservation</h1>
            <ReservationError errors={errors} />
            <ReservationForm reservation={reservation} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );

}

export default ReservationNew;