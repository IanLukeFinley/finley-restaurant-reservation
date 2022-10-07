import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Seat() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [seatTable, setSeatTable] = useState(null);

  useEffect(() => {
    async function loadTables() {
      const ac = new AbortController();
      setError(null);
      try {
        const response = await listTables(ac.signal);
        setTables((prev) => response);
      } catch (error) {
        setError(error);
      }
      return () => ac.abort();
    }
    loadTables();
  }, [reservation_id]);

  async function handleSubmit(element) {
    element.preventDefault();
    const ac = new AbortController();
    try {
      const response = await seatReservation(
        seatTable,
        reservation_id,
        ac.signal
      );
      if (response) {
        history.push(`/dashboard`);
      }
    } catch (error) {
      setError(error);
    }
    return () => ac.abort();
  }

  function handleCancel() {
    history.goBack();
  }

  function tableSelector(element) {
    setSeatTable(element.target.value);
  }

  const options = tables.map((table) => (
    <option
      key={table.table_id}
      value={table.table_id}
    >{`${table.table_name} - ${table.capacity}`}</option>
  ));

  return (
    <>
      <div className="d-flex justify-content-center pt-3">
        <h3>Select a table for your reservation:</h3>
      </div>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <label htmlFor="seat_reservation">
          Seat at:
          <select
            id="table_id"
            name="table_id"
            onChange={tableSelector}
            className="mr-1"
            required
          >
            <option defaultValue>Select a table</option>
            {options}
          </select>
        </label>
        <button className="btn btn-primary mr-1" type="submit">
          Submit
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </>
  );
}