import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import { notTuesday } from "../utils/date-time";
import { futureEvent } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import Form from "./Form";

export default function Reservations() {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleFormChange = (element) => {
    setFormData({
      ...formData,
      [element.target.name]: element.target.value,
    });
  };

  
  const findErrors = (date, errors) => {
    notTuesday(date, errors);
    futureEvent(date, errors);
  };
  

  const handleSubmit = async (element) => {
    element.preventDefault();
    const controller = new AbortController();
    const errors = [];
    findErrors(formData.reservation_date, errors);
    if (errors.length) {
      setReservationsError({ message: errors });
      return;
    }
    try {
      formData.people = Number(formData.people);
      await createReservation(formData, controller.signal);
      const date = formData.reservation_date;
      history.push(`/dashboard?date=${date}`);
    } catch (error) {
      setReservationsError(error);
    }
    return () => controller.abort();
  };

  return (
    <>
      <ErrorAlert error={reservationsError} />
      <Form
        initialformData={formData}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}