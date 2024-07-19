import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

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

    const handleChange = ({ target }) => {
        const value = target.name === "people" ? Number(target.value) : target.value;
        setReservation({
            ...reservation,
            [target.name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        try {
            await updateReservation({ ...reservation, reservation_id }, abortController.signal);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        } catch (error) {
            setErrors([error]);
        }

        return () => abortController.abort();
    };

    return (
        <div>
            <h1>Edit Reservation</h1>
            <ErrorAlert error={errors} />
            <ReservationForm
                reservation={reservation}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default ReservationEdit;
