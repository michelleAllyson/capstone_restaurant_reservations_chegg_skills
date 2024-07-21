import React from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableError from "./TableError";


// The /tables/new page will

// have the following required and not-nullable fields:
// Table name: <input name="table_name" />, which must be at least 2 characters long.
// Capacity: <input name="capacity" />, this is the number of people that can be seated at the table, which must be at least 1 person.
// display a Submit button that, when clicked, saves the new table then displays the /dashboard page
// display a Cancel button that, when clicked, returns the user to the previous page


function TableNew() {

    const history = useHistory();

    const initialTableState = {
        table_name: "",
        capacity: 0,
    };

    const [table, setTable] = React.useState({ ...initialTableState });
    const [errors, setErrors] = React.useState(null);

    const handleChange = (event) => {
        if (event.target.name === "capacity") {
            setTable({
                ...table,
                [event.target.name]: Number(event.target.value),
            });
        } else {
            setTable({
                ...table,
                [event.target.name]: event.target.value,
            })    
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            const response = await createTable(table, abortController.signal);
            history.push(`/dashboard`);
            return response;
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <div>
            <h1>Create Table</h1>
            <form onSubmit={handleSubmit}>
                <TableError errors={errors} />
                <label htmlFor="table_name">Table Name:</label>
                <input
                    id="table_name"
                    name="table_name"
                    type="text"
                    onChange={handleChange}
                    value={table.table_name}
                    required
                />
                <label htmlFor="capacity">Capacity:</label>
                <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    onChange={handleChange}
                    value={table.capacity}
                    required
                />
                <button type="submit">Submit</button>
                <button onClick={() => history.goBack()}>Cancel</button>
            </form>
        </div>
    )

}

export default TableNew;