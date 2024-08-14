import React from "react";
import { useHistory } from "react-router-dom";
import "./ReservationForm.css";

export const ReservationForm = ({ reservation, handleChange, handleSubmit }) => {
    const history = useHistory();

    // Helper function to determine if the selected date is a Tuesday
    const isTuesday = (dateString) => {
        const date = new Date(dateString);
        return date.getDay() === 1;
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="reservation-form">
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        required={true}
                        value={reservation.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        required={true}
                        value={reservation.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile_number">Mobile Number:</label>
                    <input
                        name="mobile_number"
                        type="tel"
                        id="mobile_number"
                        pattern="^(\d{3}-\d{3}-\d{4}|\d{10})$"
                        title="Please enter a valid mobile number in the format 800-555-1212 or 9999444422."
                        onChange={handleChange}
                        value={reservation.mobile_number}
                        placeholder="Phone number (e.g., 800-555-1212)"
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_date">Reservation Date:</label>
                    <input
                        type="date"
                        name="reservation_date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        required={true}
                        value={reservation.reservation_date}
                        onChange={handleChange}
                    />
                    {isTuesday(reservation.reservation_date) && (
                        <div className="alert alert-danger">
                            The restaurant is closed on Tuesdays. Please select another date.
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_time">Reservation Time:</label>
                    <input
                        type="time"
                        name="reservation_time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        required={true}
                        value={reservation.reservation_time}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="people">Number of People:</label>
                    <input
                        type="number"
                        name="people"
                        placeholder="Number of People"
                        required={true}
                        value={reservation.people}
                        min={1}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isTuesday(reservation.reservation_date)}
                    >
                        Submit
                    </button>
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => history.goBack()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReservationForm;
