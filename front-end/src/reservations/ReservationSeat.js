import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, readReservation, updateTable } from "../utils/api";

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

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    }

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
                    // required
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
                    <button type="button" onClick={handleCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
}

export default ReservationSeat;
