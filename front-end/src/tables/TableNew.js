import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableError from "./TableError";

export const TableNew = () => {
    const initialTableState = {
        table_name: "",
        capacity: 0,
    };

    const [table, setTable] = useState({ ...initialTableState });
    const [errors, setErrors] = useState([]);
    const history = useHistory();

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
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the table_name and capacity
        const newErrors = [];
        if (table.table_name.length < 2) {
            newErrors.push("Table name must be at least 2 characters long.");
        }
        if (table.capacity < 1) {
            newErrors.push("Capacity must be at least 1.");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const abortController = new AbortController();
        try {
            await createTable(table, abortController.signal);
            history.push(`/dashboard`);
        } catch (error) {
            setErrors([error.message || error.toString()]);
        }

        return () => abortController.abort();
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
                <button type="button" onClick={() => history.goBack()}>Cancel</button>
            </form>
        </div>
    );
};

export default TableNew;
