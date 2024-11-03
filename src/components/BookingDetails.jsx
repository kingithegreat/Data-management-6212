import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const CreateBooking = () => {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingHours, setBookingHours] = useState('');
  const [location, setLocation] = useState('');
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [jetskiType, setJetskiType] = useState('');
  const [jetskiAddOns, setJetskiAddOns] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for existing customer
    const { data: existingCustomer, error: existingCustomerError } = await supabase
      .from('customers')
      .select('*')
      .eq('mobile', customerMobile)
      .single();

    if (existingCustomerError && existingCustomerError.code !== 'PGRST116') {
      console.error('Error checking existing customer:', existingCustomerError);
      return;
    }

    let customerId;
    if (existingCustomer) {
      customerId = existingCustomer.customer_id;
    } else {
      // Insert customer data
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert([{
          customer_firstname: customerFirstName,
          customer_lastname: customerLastName,
          mobile: customerMobile,
          email: customerEmail,
        }])
        .select();

      if (customerError) {
        console.error('Error creating customer:', customerError);
        return;
      }

      customerId = customerData[0].customer_id;
    }

    // Insert jetski data
    const { data: jetskiData, error: jetskiError } = await supabase
      .from('jetskis')
      .insert([{
        type: jetskiType,
        addons: jetskiAddOns,
      }])
      .select();

    if (jetskiError) {
      console.error('Error creating jetski:', jetskiError);
      return;
    }

    const jetskiId = jetskiData[0].jetski_id;

    // Insert booking data
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert([{
        booking_date: bookingDate,
        booking_time: bookingTime,
        booking_hours: bookingHours,
        location: location,
        customer_id: customerId,
        jetski_id: jetskiId,
      }]);

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
    } else {
      console.log('Booking created successfully:', bookingData);
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="customerFirstName">First Name</label>
          <input
            type="text"
            id="customerFirstName"
            className="form-control"
            value={customerFirstName}
            onChange={(e) => setCustomerFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="customerLastName">Last Name</label>
          <input
            type="text"
            id="customerLastName"
            className="form-control"
            value={customerLastName}
            onChange={(e) => setCustomerLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="customerMobile">Mobile</label>
          <input
            type="tel"
            id="customerMobile"
            className="form-control"
            value={customerMobile}
            onChange={(e) => setCustomerMobile(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="customerEmail">Email</label>
          <input
            type="email"
            id="customerEmail"
            className="form-control"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="jetskiType">Jetski Type</label>
          <input
            type="text"
            id="jetskiType"
            className="form-control"
            value={jetskiType}
            onChange={(e) => setJetskiType(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="jetskiAddOns">Jetski Add-Ons</label>
          <input
            type="text"
            id="jetskiAddOns"
            className="form-control"
            value={jetskiAddOns}
            onChange={(e) => setJetskiAddOns(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Booking</button>
      </form>
    </div>
  );
};

export default CreateBooking;
