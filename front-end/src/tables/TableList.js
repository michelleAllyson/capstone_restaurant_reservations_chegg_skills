import React from "react";
// import { Link } from "react-router-dom";

//need to add a conditional statement so that the finish button only appears if the table is occupied
//need to add a conditional statement so that the "Occupied" field displays "Yes" if the table is occupied and "No" if the table is not occupied

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
          {/* {table.occupied && ( */}
            <button
              className="btn btn-primary"
              data-table-id-finish={table.table_id}
              onClick={() => handleFinish(table.table_id)}
            >
              Finish
            </button>
          {/* )} */}
        </div>
      ))}
    </div>
  );
};

export default TableList;
