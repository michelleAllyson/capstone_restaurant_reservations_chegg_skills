import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

function TableError({ errors }) {
    if (!errors || errors.length === 0) return null;
    return (
      <div>
        <h1>Table Error</h1>
        <p>An error occurred:</p>
        <ErrorAlert error={errors[0]} />
      </div>
    );
  }

    export default TableError;