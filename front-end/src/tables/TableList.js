import React from "react";

export const TableList = ({ tables, handleFinish }) => {
  return (
    <div style={{ display: "flex", justifyContent: "left", padding: "20px" }}>
      <table style={{ width: "100%", maxWidth: "800px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", textAlign: "center" }}>Table ID</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Table Name</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Capacity</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Status</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Reservation ID</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.table_id}>
              <td style={{ padding: "10px", textAlign: "center" }}>{table.table_id}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>{table.table_name}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>{table.capacity}</td>
              <td style={{ padding: "10px", textAlign: "center" }} data-table-id-status={table.table_id}>
                {table.reservation_id ? "occupied" : "free"}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>{table.reservation_id}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {table.reservation_id && (
                  <button
                    className="btn btn-primary"
                    data-table-id-finish={table.table_id}
                    onClick={() => handleFinish(table.table_id)}
                  >
                    Finish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
