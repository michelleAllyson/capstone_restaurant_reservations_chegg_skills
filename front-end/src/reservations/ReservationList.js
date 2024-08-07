// ORIGINAL--2 FAILED, 1 PASSING FOR US-06 FE

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateStatus } from "../utils/api";

export const ReservationList = ({ reservations }) => {

    const history = useHistory();

    const checkStatus = (reservation) => {
        return reservation.status === "finished" || reservation.status === "cancelled";
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    };

    const handleSeat = (reservation_id) => {
        history.push(`/reservations/${reservation_id}/seat`);
    };

    const handleCancel = async (reservation_id) => {
        const result = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
        if (result) {
            try {
                await updateStatus(reservation_id, "cancelled");
                history.go(0); 
            } catch (error) {
                console.error("Failed to cancel the reservation:", error);
            }
        }
    };


    const renderReservationActions = (reservation) => (
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
                data-reservation-id-cancel={reservation.reservation_id} 
            >
                Cancel
            </button>
        </td>
    );

    const renderReservations = (reservations) => {
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
                    <td>{reservation.status}</td> 
                    {renderReservationActions(reservation)}
                </tr>
            ));
        }
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>People</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderReservations(reservations)}
            </tbody>
        </table>
    );
};

export default ReservationList;


// ///////REVISION--STILL 2 FAILING, BUT SEAT BUTTON IS NOW DISABLED ONCE 'SEATED' STATUS CHANGES///////

// // import React from "react";
// // import { Link, useHistory } from "react-router-dom";
// // import { updateStatus } from "../utils/api";

// // export const ReservationList = ({ reservations }) => {

// //     const history = useHistory();

// //     const checkStatus = (reservation) => {
// //         return ["finished", "cancelled", "seated"].includes(reservation.status);
// //     };

// //     const formatTime = (time) => {
// //         const [hours, minutes] = time.split(":");
// //         return `${hours}:${minutes}`;
// //     };

// //     const handleSeat = (reservation_id) => {
// //         history.push(`/reservations/${reservation_id}/seat`);
// //     };

// //     const handleCancel = async (reservation_id) => {
// //         const result = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
// //         if (result) {
// //             try {
// //                 await updateStatus(reservation_id, "cancelled");
// //                 history.go(0); 
// //             } catch (error) {
// //                 console.error("Failed to cancel the reservation:", error);
// //             }
// //         }
// //     };

// //     const renderReservationActions = (reservation) => (
// //         <td>
// //             {/* The button is not wrapped in a <Link> tag here */}
// //             <button
// //                 className="btn btn-primary"
// //                 disabled={checkStatus(reservation)}
// //                 onClick={() => handleSeat(reservation.reservation_id)}
// //             >
// //                 Seat
// //             </button>
// //             <Link to={`/reservations/${reservation.reservation_id}/edit`}>
// //                 <button
// //                     className="btn btn-secondary"
// //                     disabled={checkStatus(reservation)}
// //                 >
// //                     Edit
// //                 </button>
// //             </Link>
// //             <button
// //                 className="btn btn-danger"
// //                 disabled={checkStatus(reservation)}
// //                 onClick={() => handleCancel(reservation.reservation_id)}
// //                 data-reservation-id-cancel={reservation.reservation_id} 
// //             >
// //                 Cancel
// //             </button>
// //         </td>
// //     );

// //     const renderReservations = (reservations) => {
// //         if (reservations.length === 0) {
// //             return (
// //                 <tr>
// //                     <td colSpan="7">No reservations found</td>
// //                 </tr>
// //             );
// //         } else {
// //             return reservations.map((reservation) => (
// //                 <tr key={reservation.reservation_id}>
// //                     <td>{reservation.reservation_id}</td>
// //                     <td>{reservation.first_name}</td>
// //                     <td>{reservation.last_name}</td>
// //                     <td>{reservation.people}</td>
// //                     <td>{formatTime(reservation.reservation_time)}</td>
// //                     <td>{reservation.status}</td> 
// //                     {renderReservationActions(reservation)}
// //                 </tr>
// //             ));
// //         }
// //     };

// //     return (
// //         <table className="table">
// //             <thead>
// //                 <tr>
// //                     <th>ID</th>
// //                     <th>First Name</th>
// //                     <th>Last Name</th>
// //                     <th>People</th>
// //                     <th>Time</th>
// //                     <th>Status</th>
// //                     <th>Actions</th>
// //                 </tr>
// //             </thead>
// //             <tbody>
// //                 {renderReservations(reservations)}
// //             </tbody>
// //         </table>
// //     );
// // };

// // export default ReservationList;



// //////STILL 2 FAILED, 1 PASSING, BUT SEAT BUTTON IS HIDDEN WHEN STATUS CHANGED TO 'SEATED'/////
// //ENTIRE RESERVATION DISAPPEARS WITH THIS UPDATE///
// import React from "react";
// import { Link, useHistory } from "react-router-dom";
// import { updateStatus } from "../utils/api";

// export const ReservationList = ({ reservations }) => {

//     const history = useHistory();

//     const shouldHideButton = (reservation) => {
//         return ["finished", "cancelled", "seated"].includes(reservation.status);
//     };

//     const formatTime = (time) => {
//         const [hours, minutes] = time.split(":");
//         return `${hours}:${minutes}`;
//     };

//     const handleSeat = (reservation_id) => {
//         history.push(`/reservations/${reservation_id}/seat`);
//     };

//     const handleCancel = async (reservation_id) => {
//         const result = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
//         if (result) {
//             try {
//                 await updateStatus(reservation_id, "cancelled");
//                 history.go(0); 
//             } catch (error) {
//                 console.error("Failed to cancel the reservation:", error);
//             }
//         }
//     };

//     const renderReservationActions = (reservation) => (
//         <td>
//             {!shouldHideButton(reservation) && (
//                 <button
//                     className="btn btn-primary"
//                     onClick={() => handleSeat(reservation.reservation_id)}
//                 >
//                     Seat
//                 </button>
//             )}
//             <Link to={`/reservations/${reservation.reservation_id}/edit`}>
//                 <button
//                     className="btn btn-secondary"
//                     disabled={shouldHideButton(reservation)}
//                 >
//                     Edit
//                 </button>
//             </Link>
//             <button
//                 className="btn btn-danger"
//                 disabled={shouldHideButton(reservation)}
//                 onClick={() => handleCancel(reservation.reservation_id)}
//                 data-reservation-id-cancel={reservation.reservation_id} 
//             >
//                 Cancel
//             </button>
//         </td>
//     );

//     const renderReservations = (reservations) => {
//         if (reservations.length === 0) {
//             return (
//                 <tr>
//                     <td colSpan="7">No reservations found</td>
//                 </tr>
//             );
//         } else {
//             return reservations.map((reservation) => (
//                 <tr key={reservation.reservation_id}>
//                     <td>{reservation.reservation_id}</td>
//                     <td>{reservation.first_name}</td>
//                     <td>{reservation.last_name}</td>
//                     <td>{reservation.people}</td>
//                     <td>{formatTime(reservation.reservation_time)}</td>
//                     <td>{reservation.status}</td> 
//                     {renderReservationActions(reservation)}
//                 </tr>
//             ));
//         }
//     };

//     return (
//         <table className="table">
//             <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>First Name</th>
//                     <th>Last Name</th>
//                     <th>People</th>
//                     <th>Time</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {renderReservations(reservations)}
//             </tbody>
//         </table>
//     );
// };

// export default ReservationList;
