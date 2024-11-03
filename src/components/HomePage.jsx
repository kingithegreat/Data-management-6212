import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';

const HomePage = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center text-dark">
      <h1 className="mb-4 text-white">Whakangahau Rihi Waka Topatopa</h1>
      <h2 className="mb-4 text-white">Whakatere i ngā ngaru, rongo i te wairua o te moana!</h2>
      <h2 className="mb-4 text-white">(Ride the waves, feel the spirit of the ocean!)</h2>
      <div className="mb-4  w-100">
        <Link to="/create-booking" className="btn btn-primary w-100 mb-2">Create Booking</Link>
        <Link to="/update-booking" className="btn btn-warning w-100 mb-2">Update Booking</Link>
        <Link to="/delete-booking" className="btn btn-danger w-100 mb-2">Delete Booking</Link>
        <Link to="/view-bookings" className="btn btn-info w-100">View Bookings</Link>
      </div>
    </div>
  );
};

export default HomePage;
