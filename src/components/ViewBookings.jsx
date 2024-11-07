import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          booking_id,
          booking_date,
          booking_time,
          booking_hours,
          location,
          jetskis:jetski_id (
            jetski_id,
            type,
            addons
          ),
          customers:customer_id (
            customer_id,
            customer_firstname,
            customer_lastname,
            mobile,
            email
          )
        `);

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        console.log('Fetched bookings:', data); 
        setBookings(data);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container table-responsive">
      <h2>View Bookings</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Location</th>
            <th>Booking Date</th>
            <th>Booking Time</th>
            <th>Booking Hours</th>
            <th>Customer Name</th>
            <th>Customer Mobile</th>
            <th>Customer Email</th>
            <th>Jetski Type</th>
            <th>Jetski Add-Ons</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.location}</td>
              <td>{booking.booking_date}</td>
              <td>{booking.booking_time}</td>
              <td>{booking.booking_hours}</td>
              <td>{`${booking.customers.customer_firstname} ${booking.customers.customer_lastname}`}</td>
              <td>{booking.customers.mobile}</td>
              <td>{booking.customers.email}</td>
              <td>{booking.jetskis.type}</td>
              <td>{booking.jetskis.addons}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBookings;
