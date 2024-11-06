import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const UpdateBooking = () => {
  const [bookingId, setBookingId] = useState('');
  const [updatedBooking, setUpdatedBooking] = useState({
    booking_date: '',
    booking_time: '',
    booking_hours: '',
    location: '',
    customer_id: '',
    jetski_id: ''
  });
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

  const fetchBookingData = async (id) => {
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        booking_date, booking_time, booking_hours, location, 
        customers (customer_id, customer_firstname, customer_lastname, mobile, email), 
        jetskis (jetski_id, type, addons)
      `)
      .eq('booking_id', id)
      .single();
    
    if (bookingError) {
      console.error('Error fetching booking:', bookingError);
      return;
    }

    setUpdatedBooking({
      booking_date: bookingData.booking_date || '',
      booking_time: bookingData.booking_time || '',
      booking_hours: bookingData.booking_hours || '',
      location: bookingData.location || '',
      customer_id: bookingData.customers.customer_id || '',
      jetski_id: bookingData.jetskis.jetski_id || ''
    });
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingData(bookingId);
    }
  }, [bookingId]);

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        booking_date: updatedBooking.booking_date,
        booking_time: updatedBooking.booking_time,
        booking_hours: updatedBooking.booking_hours,
        location: updatedBooking.location,
        customer_id: updatedBooking.customer_id,
        jetski_id: updatedBooking.jetski_id
      })
      .eq('booking_id', bookingId);

    if (updateError) {
      console.error('Error updating booking:', updateError);
      alert('Failed to update booking.');
      return;
    }

    alert('Booking updated successfully!');
    navigate('/home');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-black">Update Booking</h2>
      <form onSubmit={handleUpdateBooking}>
        <div className="form-group mb-3">
          <label htmlFor="bookingId">Booking ID</label>
          <input
            type="text"
            id="bookingId"
            className="form-control"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bookingDate">Booking Date</label>
          <input
            type="date"
            id="bookingDate"
            className="form-control"
            value={updatedBooking.booking_date}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, booking_date: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bookingTime">Booking Time</label>
          <input
            type="time"
            id="bookingTime"
            className="form-control"
            value={updatedBooking.booking_time}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, booking_time: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bookingHours">Booking Hours</label>
          <input
            type="number"
            id="bookingHours"
            className="form-control"
            value={updatedBooking.booking_hours}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, booking_hours: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={updatedBooking.location}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, location: e.target.value })}
            required
          />
        </div>
        <h3>Customer Details</h3>
        <div className="form-group mb-3">
          <label htmlFor="customerID">Customer</label>
          <select
            id="customerID"
            className="form-control"
            value={updatedBooking.customer_id}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, customer_id: e.target.value })}
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
            value={updatedBooking.jetski_id}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, jetski_id: e.target.value })}
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
          Update Booking
        </button>
      </form>
    </div>
  );
};

export default UpdateBooking;
