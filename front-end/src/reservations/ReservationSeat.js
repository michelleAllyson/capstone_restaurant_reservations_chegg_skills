import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, readReservation, updateTable } from "../utils/api";

// The /reservations/:reservation_id/seat page will

// have the following required and not-nullable fields:
// Table number: <select name="table_id" />. The text of each option must be {table.table_name} - {table.capacity} so the tests can find the options.
// do not seat a reservation with more people than the capacity of the table
// display a Submit button that, when clicked, assigns the table to the reservation then displays the /dashboard page
// PUT to /tables/:table_id/seat/ in order to save the table assignment. The body of the request must be { data: { reservation_id: x } } where X is the reservation_id of the reservation being seated. The tests do not check the body returned by this request.
// display a Cancel button that, when clicked, returns the user to the previous page



export const ReservationSeat = () => {
    const { reservation_id } = useParams();
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const [reservation, setReservation] = useState({});
    const [table_id, setTable_id] = useState(0);

   useEffect(() => {
        const abortController = new AbortController();
        listTables(abortController.signal).then(setTables);
        readReservation(reservation_id, abortController.signal).then(setReservation);
        return () => abortController.abort();
    }, [reservation_id]);

    const handleChange = ({ target }) => {
        setTable_id(target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        updateTable(table_id, reservation_id, abortController.signal)
            .then(() => history.push("/dashboard"))
            .catch(console.error);
        return () => abortController.abort();
    };

    return (
        <section>
            <h1>Seat Reservation</h1>
            <form onSubmit={handleSubmit}>
                    <select
                        name="table_id"
                        id="table_id"
                        onChange={handleChange}
                        value={table_id}
                        required
                    >
                        <option value="">
                            -- Select a table --
                        </option>
                        {tables.map((table) => (
                            <option 
                            key={table.table_id} 
                            value={table.table_id}
                            disabled={table.capacity < reservation.people || table.ocupied} 
                            >
                                {table.table_name} - {table.capacity}
                            </option>
                        ))}
                    </select>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <button onClick={() => history.goBack()} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                </form>
        </section>
    )
}

export default ReservationSeat;
