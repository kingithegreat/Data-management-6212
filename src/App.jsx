import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingDetails from "./components/BookingDetails";
import HomePage from "./components/HomePage";
import CreateBooking from "./components/CreateBooking";
import UpdateBooking from "./components/UpdateBooking";
import DeleteBooking from "./components/DeleteBooking";
import ViewBookings from "./components/ViewBookings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-booking" element={<CreateBooking />} />
        <Route path="/update-booking" element={<UpdateBooking />} />
        <Route path="/delete-booking" element={<DeleteBooking />} />
        <Route path="/view-bookings" element={<ViewBookings />} />
        <Route path="/booking/:bookingId" element={<BookingDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
