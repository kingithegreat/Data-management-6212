import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const CreateBooking = () => {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingHours, setBookingHours] = useState('');
  const [location, setLocation] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [jetskiID, setJetskiID] = useState('');
  const [customers, setCustomers] = useState([]);
  const [jetskis, setJetskis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) {
        console.error('Error fetching customers:', error);
      } else {
        console.log('Fetched customers:', data);
        setCustomers(data);
      }
    };

    const fetchJetskis = async () => {
      const { data, error } = await supabase.from('jetskis').select('*');
      if (error) {
        console.error('Error fetching jetskis:', error);
      } else {
        console.log('Fetched jetskis:', data);
        setJetskis(data);
      }
    };

    fetchCustomers();
    fetchJetskis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error: bookingError } = await supabase.from('bookings').insert([
      {
        booking_date: bookingDate,
        booking_time: bookingTime,
        booking_hours: bookingHours,
        location: location,
        customer_id: customerID,
        jetski_id: jetskiID,
      },
    ]);

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
    } else {
      alert('Booking created successfully!');
      navigate('/');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-black">Create Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="bookingDate">Booking Date</label>
          <input
            type="date"
            id="bookingDate"
            className="form-control"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bookingTime">Booking Time</label>
          <input
            type="time"
            id="bookingTime"
            className="form-control"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bookingHours">Booking Hours</label>
          <input
            type="number"
            id="bookingHours"
            className="form-control"
            placeholder="Enter number of hours"
            value={bookingHours}
            onChange={(e) => setBookingHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <h3>Customer Details</h3>
        <div className="form-group mb-3">
          <label htmlFor="customerID">Customer</label>
          <select
            id="customerID"
            className="form-control"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
            required
          >
            <option value="">Select customer</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.customer_firstname} {customer.customer_lastname}
              </option>
            ))}
          </select>
        </div>
        <h3>Jetski Details</h3>
        <div className="form-group mb-3">
          <label htmlFor="jetskiID">Jetski</label>
          <select
            id="jetskiID"
            className="form-control"
            value={jetskiID}
            onChange={(e) => setJetskiID(e.target.value)}
            required
          >
            <option value="">Select jetski</option>
            {jetskis.map((jetski) => (
              <option key={jetski.jetski_id} value={jetski.jetski_id}>
                {jetski.type} - Add-ons: {jetski.addons}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;
