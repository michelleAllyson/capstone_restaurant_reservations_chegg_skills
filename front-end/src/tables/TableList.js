import React from "react";
import { Link } from "react-router-dom";

export const TableList = ({ tables, handleFinish }) => {
  
    return (
        <div>
            {tables.map((table) => (
                <div key={table.table_id}>
                    <h2>Table {table.table_id}</h2>
                    <p>Table Name: {table.table_name}</p>
                    <p>Capacity: {table.capacity}</p>
                    <p>Occupied: {table.occupied ? "Yes" : "No"}</p>
                    <p>Reservation ID: {table.reservation_id}</p>
                    <Link to={`/tables/${table.table_id}/seat`}>
                        <button
                            className="btn btn-primary"
                            disabled={!table.occupied}
                            onClick={() => handleFinish(table.table_id)}
                        >
                            Finish
                        </button>
                    </Link>
                </div>
            ))}
        </div>


    )

}
export default TableList;