import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const CreateBooking = () => {
  // State variables to hold form input values and fetched data
  const [bookingDate, setBookingDate] = useState(''); // Booking date
  const [bookingTime, setBookingTime] = useState(''); // Booking time
  const [bookingHours, setBookingHours] = useState(''); // Number of hours for the booking
  const [location, setLocation] = useState(''); // Location of the booking
  const [customerID, setCustomerID] = useState(''); // Selected customer ID
  const [jetskiID, setJetskiID] = useState(''); // Selected jetski ID
  const [customers, setCustomers] = useState([]); // List of customers fetched from the database
  const [jetskis, setJetskis] = useState([]); // List of jetskis fetched from the database
  const navigate = useNavigate(); // Hook to navigate programmatically

  // useEffect hook to fetch customers and jetskis data when the component mounts
  useEffect(() => {
    // Function to fetch customers from the 'customers' table
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) {
        console.error('Error fetching customers:', error); // Log error if fetching fails
      } else {
        console.log('Fetched customers:', data); // Log fetched data for debugging
        setCustomers(data); // Update state with fetched customers
      }
    };

    // Function to fetch jetskis from the 'jetskis' table
    const fetchJetskis = async () => {
      const { data, error } = await supabase.from('jetskis').select('*');
      if (error) {
        console.error('Error fetching jetskis:', error); // Log error if fetching fails
      } else {
        console.log('Fetched jetskis:', data); // Log fetched data for debugging
        setJetskis(data); // Update state with fetched jetskis
      }
    };

    // Call the fetch functions
    fetchCustomers();
    fetchJetskis();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Insert a new booking into the 'bookings' table
    const { error: bookingError } = await supabase.from('bookings').insert([
      {
        booking_date: bookingDate, // Booking date
        booking_time: bookingTime, // Booking time
        booking_hours: bookingHours, // Number of hours for the booking
        location: location, // Location of the booking
        customer_id: customerID, // Selected customer ID
        jetski_id: jetskiID, // Selected jetski ID
      },
    ]);

    if (bookingError) {
      console.error('Error creating booking:', bookingError); // Log error if insertion fails
    } else {
      alert('Booking created successfully!'); // Show success message
      navigate('/home'); // Navigate to the home page
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-black">Create Booking</h2>
      <form onSubmit={handleSubmit}>
        {/* Booking Date Input */}
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
        {/* Booking Time Input */}
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
        {/* Booking Hours Input */}
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
        {/* Location Input */}
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
        {/* Customer Selection */}
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
            {/* Map over the customers array to create an option for each customer */}
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.customer_firstname} {customer.customer_lastname}
              </option>
            ))}
          </select>
        </div>
        {/* Jetski Selection */}
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
            {/* Map over the jetskis array to create an option for each jetski */}
            {jetskis.map((jetski) => (
              <option key={jetski.jetski_id} value={jetski.jetski_id}>
                {jetski.type} - Add-ons: {jetski.addons}
              </option>
            ))}
          </select>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;
