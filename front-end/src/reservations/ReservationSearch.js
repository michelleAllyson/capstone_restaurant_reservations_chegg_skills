import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationList from "../reservations/ReservationList";
import { useHistory } from "react-router-dom";


function ReservationSearch() {
    const [mobile_number, setMobile_number] = useState("");
    const [reservations, setReservations] = useState([]);
    const [errors, setErrors] = useState(null);
    const history = useHistory();


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(null);

        if (mobile_number.trim() === "") {
            setErrors("Please enter a phone number.");
            return;
        }

        listReservations({ mobile_number })
            .then((response) => {
                if (response.length === 0) {
                    setErrors("No reservations found");
                } else {
                    setReservations(response);
                    history.push("/search");
                }
            })
            .catch((error) => {
                setErrors(error.message || "Error fetching reservations");
            });
    };
    return (
        <>
            <div className="mb-3">
                <h1>Find Reservation</h1>
            </div>

            <form className="form-group mb-3" onSubmit={handleSubmit}>
                <input
                    type="search"
                    name="mobile_number"
                    className="form-control rounded mb-2"
                    placeholder="Enter a customer's phone number"
                    onChange={(event) => setMobile_number(event.target.value)}
                    value={mobile_number}
                    style={{ maxWidth: "300px" }}
                />
                <div>
                    <button type="submit" className="btn btn-primary">Find</button>
                </div>
            </form>
            <br />
            {errors && (
                <p className="alert alert-danger">{errors}</p>
            )}
            {reservations.length > 0 && (
                <div>
                    <h3 className="mb-3">Matching Reservations</h3>
                    <table className="table table-striped">
                        <tbody>
                                <ReservationList reservations={reservations} />
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default ReservationSearch;
