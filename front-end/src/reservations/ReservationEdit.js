import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ReservationError from "./ReservationError";

// The /dashboard and the /search page will
// Display an "Edit" button next to each reservation
// Clicking the "Edit" button will navigate the user to the /reservations/:reservation_id/edit page
// the "Edit" button must be a link with an href attribute that equals /reservations/${reservation_id}/edit, so it can be found by the tests.
// Display a "Cancel" button next to each reservation
// The Cancel button must have a data-reservation-id-cancel={reservation.reservation_id} attribute, so it can be found by the tests.
// Clicking the "Cancel" button will display the following confirmation: "Do you want to cancel this reservation? This cannot be undone."
// Clicking "Ok" on the confirmation dialog, sets the reservation status to cancelled, and the results on the page are refreshed.
// set the status of the reservation to cancelled using a PUT to /reservations/:reservation_id/status with a body of {data: { status: "cancelled" } }.
// Clicking "Cancel" on the confirmation dialog makes no changes.
// The /reservations/:reservation_id/edit page will display the reservation form with the existing reservation data filled in
// Only reservations with a status of "booked" can be edited.
// Clicking the "Submit" button will save the reservation, then displays the previous page.
// Clicking "Cancel" makes no changes, then display the previous page.



export const ReservationEdit = () => {
    const initialReservationState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    };

    const [reservation, setReservation] = useState({ ...initialReservationState });
    const [errors, setErrors] = useState(null);
    const { reservation_id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        readReservation(reservation_id, abortController.signal)
            .then(setReservation)
            .catch(setErrors);
        return () => abortController.abort();
    }, [reservation_id]);

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

        try {
            await updateReservation({ ...reservation, reservation_id }, abortController.signal);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        } catch (error) {
            setErrors([error.message || error.toString()]);
        }

        return () => abortController.abort();
    };

    return (
        <div>
            <h1>Edit Reservation</h1>
            <ReservationError errors={errors} />
            <ReservationForm
                reservation={reservation}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default ReservationEdit;
