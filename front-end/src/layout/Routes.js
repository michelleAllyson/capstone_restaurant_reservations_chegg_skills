import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
// import ReservationForm from "../reservations/ReservationForm";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationNew from "../reservations/ReservationNew";
import TableNew from "../tables/TableNew";
import ReservationSeat from "../reservations/ReservationSeat";
import ReservationEdit from "../reservations/ReservationEdit";
import ReservationSearch from "../reservations/ReservationSearch";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route path="/reservations/new">
        <ReservationNew />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <ReservationSeat />
      </Route>
      <Route path="/reservations/:reservation_id/edit"> 
        <ReservationEdit />
      </Route>
      <Route path="/search">
        <ReservationSearch />
      </Route>
      <Route path="/tables/new"> 
        <TableNew />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
