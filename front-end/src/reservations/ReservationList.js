import React from "react";
import { Link } from "react-router-dom";

export const ReservationList = ({ 
    reservations,
    handleCancel,
    handleSeat,
}) => {

    function checkStatus(reservation) {
        return (
            reservation.status === "finished" || reservation.status === "cancelled"
        );
    }

    function formatTime(time) {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    }

    function renderReservations(reservations) {
        if (reservations.length === 0) {
            return (
                <tr>
                    <td colSpan="5">No reservations found</td>
                </tr>
            );
        } else {
            return reservations.map((reservation) => (
                <tr key={reservation.reservation_id}>
                    <td>{reservation.reservation_id}</td>
                    <td>{reservation.first_name}</td>
                    <td>{reservation.last_name}</td>
                    <td>{reservation.people}</td>
                    <td>{formatTime(reservation.reservation_time)}</td>
                    <td>{checkStatus(reservation) ? "finished" : reservation.status}</td>
                    <td>
                        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                            <button
                                className="btn btn-primary"
                                disabled={checkStatus(reservation)}
                                onClick={() => handleSeat(reservation.reservation_id)}
                            >
                                Seat
                            </button>
                        </Link>
                        <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                            <button
                                className="btn btn-secondary"
                                disabled={checkStatus(reservation)}
                            >
                                Edit
                            </button>
                        </Link>
                        <button
                            className="btn btn-danger"
                            disabled={checkStatus(reservation)}
                            onClick={() => handleCancel(reservation.reservation_id)}
                        >
                            Cancel
                        </button>
                    </td>
                </tr>
            ));
        }
    }

    return (renderReservations(reservations));
}


export default ReservationList;