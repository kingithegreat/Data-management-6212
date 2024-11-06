import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import CreateBooking from './components/CreateBooking.jsx';
import UpdateBooking from './components/UpdateBooking.jsx';
import DeleteBooking from './components/DeleteBooking.jsx';
import ViewBookings from './components/ViewBookings.jsx';
import Signup from './components/Auth.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} /> {/* Redirects to Signup page */}
        <Route path="/home" element={<HomePage />} /> {/* Home page path */}
        <Route path="/create-booking" element={<CreateBooking />} />
        <Route path="/update-booking" element={<UpdateBooking />} />
        <Route path="/delete-booking" element={<DeleteBooking />} />
        <Route path="/view-bookings" element={<ViewBookings />} />
      </Routes>
    </Router>
  );
};

export default App;
