import React, { useEffect, useState } from "react";
import { finishTable, listReservations, listTables, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import { today } from "../utils/date-time";
import TableList from "../tables/TableList";
// import { formatAsDate } from "../utils/date-time";
import moment from "moment";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  const [reservations, setReservations] = useState([]);
  const [errors, setErrors] = useState(null);
  const [tables, setTables] = useState([]);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
   
    setErrors(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setErrors);

    listTables().then(setTables);

    return () => abortController.abort();
  }

  
 async function handleFinish(table_id) {
    const abortController = new AbortController();
    const result = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (result) {
      try {
        await finishTable(table_id, abortController.signal);
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.table_id === table_id ? { ...table, occupied: false, reservation_id: null } : table
          )
        );
        loadDashboard();
      } catch (error) {
        console.error("Error finishing the table:", error);
      }
    }

    return () => abortController.abort();
  };


  const handleCancel = async (event)  => {
    const result = window.confirm("Do you want to cancel this reservation? This cannot be undone.");

    if (result) {
      await updateStatus(event.target.value, "cancelled");
      loadDashboard();
    }
    
  }




  return (
    <main>
      <ErrorAlert error={errors} />
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {moment(date).format("dddd, MMM DD, YYYY")}</h4>
      </div>
      <div> 
        <button className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button> 
        <button className="btn btn-primary" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
        <button className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      </div>
      <ReservationList reservations={reservations} handleCancel={handleCancel}  /> 
      <div id="tables">
        <h2>Tables</h2>
        <TableList tables={tables} handleFinish={handleFinish} />
      </div>
    </main>
  );
}

export default Dashboard;
