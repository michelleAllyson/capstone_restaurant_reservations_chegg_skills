import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationList from "../reservations/ReservationList";
import { useHistory } from "react-router-dom";

// // The /dashboard and the /search page will
// // Display an "Edit" button next to each reservation
// // Clicking the "Edit" button will navigate the user to the /reservations/:reservation_id/edit page
// // the "Edit" button must be a link with an href attribute that equals /reservations/${reservation_id}/edit, so it can be found by the tests.
// // Display a "Cancel" button next to each reservation
// // The Cancel button must have a data-reservation-id-cancel={reservation.reservation_id} attribute, so it can be found by the tests.
// // Clicking the "Cancel" button will display the following confirmation: "Do you want to cancel this reservation? This cannot be undone."
// // Clicking "Ok" on the confirmation dialog, sets the reservation status to cancelled, and the results on the page are refreshed.
// // set the status of the reservation to cancelled using a PUT to /reservations/:reservation_id/status with a body of {data: { status: "cancelled" } }.
// // Clicking "Cancel" on the confirmation dialog makes no changes.

// The /search page will
// Display a search box <input name="mobile_number" /> that displays the placeholder text: "Enter a customer's phone number"
// Display a "Find" button next to the search box.
// Clicking on the "Find" button will submit a request to the server (e.g. GET /reservations?mobile_number=800-555-1212).
// then the system will look for the reservation(s) in the database and display all matched records on the /search page using the same reservations list component as the /dashboard page.
// the search page will display all reservations matching the phone number, regardless of status.
// display No reservations found if there are no records found after clicking the Find button.

function ReservationSearch() {
    const [mobile_number, setMobile_number] = useState("");
    const [reservations, setReservations] = useState([]);
    const [errors, setErrors] = useState(null);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(null);
        listReservations({mobile_number})
        .then((response) => {
          setReservations(response)
          history.push('/search')
        })
        .catch(setErrors('No reservations found'))
    }

    return (
        <>
          <div className="mb-3">
              <h1> Find Reservation </h1>
          </div>
          
          <form className="form-group mb-3" onSubmit={handleSubmit}>
            <input
              type="search"
              name="mobile_number"
              className="form-control rounded mb-2"
              placeholder="Enter a customer's phone number"
              onChange={(event) => setMobile_number(event.target.value)}
              value={mobile_number}
            />
            <div>
              <button type="submit" className="btn btn-primary"> find </button>
            </div>
          </form>
          <br />
          {reservations && reservations.length ?
          <div>
            <h3 className="mb-3"> Matching Reservations </h3>
            <table className="table table-striped">
              <thead>
                <th scope="col"> Reservation ID </th>
                <th scope="col"> First Name </th>
                <th scope="col"> Last Name </th>
                <th scope="col"> Party Size </th>
                <th scope="col"> Phone Number </th>
                <th scope="col"> Reservation Date </th>
                <th scope="col"> Reservation Time </th>
                <th scope="col"> Reservation Status </th>
              </thead>
              <tbody>
                {reservations.map((res) => (
                    <ReservationList reservations={reservations} />
                ))}
              </tbody>
            </table>
          </div>
          :
          <>
            <p className="alert alert-danger"> {errors} </p>
          </>
          }
        </>
      );
    }

export default ReservationSearch;
