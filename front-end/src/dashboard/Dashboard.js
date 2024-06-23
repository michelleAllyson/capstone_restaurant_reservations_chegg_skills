import React, { useEffect, useState } from "react";
import { finishTable, listReservations, listTables, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
// import Reservations from "../reservations/Reservations";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import { today } from "../utils/date-time";
// import { formatAsDate } from "../utils/date-time";
import moment from "moment";


//NEED TO RETURN TO THIS AFTER WORKING ON THE RESERVATIONS COMPONENT

// list all reservations for one date only. (E.g. if the URL is /dashboard?date=2035-12-30 then send a GET to /reservations?date=2035-12-30 to list the reservations for that date). The date is defaulted to today, and the reservations are sorted by time.
// display next, previous, and today buttons that allow the user to see reservations on other dates
// display any error messages returned from the API


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables().then(setTables);

    return () => abortController.abort();
  }


  async function finishHandler(table_id) {
    const abortController = new AbortController();
    const result = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone"
    );

    if (result) {
      await finishTable(table_id, abortController.signal);
      loadDashboard();
    }
  }

  const cancelHandler = async (event)  => {
    const result = window.confirm("Do you want to cancel this reservation? This cannot be undone.");

    if (result) {
      await updateStatus(event.target.value, "cancelled");
      loadDashboard();
    }
  }



  return (
    <main>
      <ErrorAlert error={reservationsError} />
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {moment(date).format("dddd, MMM DD, YYYY")}</h4>
      </div>
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
