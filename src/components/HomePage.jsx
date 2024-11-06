import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center text-dark">
      <h1 className="styled-header">
        Whakangahau Rihi Waka Topatopa
      </h1>
      <h2 className="styled-subheading">
        Whakatere i ngā ngaru, rongo i te wairua o te moana!
      </h2>
      <h2 className="styled-subheading">
        (Ride the waves, feel the spirit of the ocean!)
      </h2>
      <div className="mb-4 w-100">
        <Link to="/create-booking" className="btn btn-primary w-100 mb-2">Create Booking</Link>
        <Link to="/update-booking" className="btn btn-warning w-100 mb-2">Update Booking</Link>
        <Link to="/delete-booking" className="btn btn-danger w-100 mb-2">Delete Booking</Link>
        <Link to="/view-bookings" className="btn btn-info w-100 mb-2">View Bookings</Link>
      </div>
    </div>
  );
};

export default HomePage;
