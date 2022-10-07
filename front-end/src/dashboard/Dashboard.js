import React, { useEffect, useState } from "react";
import ReservationTable from "./reservationDisplay/ReservationTable";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import TableList from "./reservationDisplay/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(listTables)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function todayHandler() {
    history.push(`/dashboard`);
  }

  function previousHandler() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function nextHandler() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main>
      <h1 className="d-md-flex justify-content-center">Reservations Dashboard</h1>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4 className="mb-0">Reservations on {date}</h4>
      </div>
      <div className="pb-2 d-flex justify-content-center">
        <button className="btn btn-primary mr-1" onClick={todayHandler}>
          today
        </button>
        <button className="btn btn-primary mr-1" onClick={previousHandler}>
          previous
        </button>
        <button className="btn btn-primary" onClick={nextHandler}>
          next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        <TableList tables={tables} loadDashboard={loadDashboard} />
      </div>
      <ReservationTable
        reservations={reservations}
        setReservations={setReservations}
        setError={setReservationsError}
      />

    </main>
  );
}

export default Dashboard;