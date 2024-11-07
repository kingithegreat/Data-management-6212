import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const DeleteBooking = () => {
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');
  const [bookingIds, setBookingIds] = useState([]);

  // Fetch all booking IDs when the component mounts
  useEffect(() => {
    const fetchBookingIds = async () => {
      const { data, error } = await supabase.from('bookings').select('booking_id');
      if (error) {
        console.error('Error fetching booking IDs:', error);
      } else {
        setBookingIds(data);
      }
    };

    fetchBookingIds();
  }, []);

  const handleDelete = async () => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('booking_id', bookingId);

    if (error) {
      setMessage(`Error deleting booking: ${error.message}`);
    } else {
      setMessage('Booking deleted successfully');
      setBookingId(''); // Clear the input field
    }
  };

  return (
    <div className="container mt-4">
      <h2>Delete Booking</h2>
      <div className="mb-3">
        <select
          className="form-control"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        >
          <option value="">Select Booking ID</option>
          {bookingIds.map((booking) => (
            <option key={booking.booking_id} value={booking.booking_id}>
              {booking.booking_id}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>Delete Booking</button>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default DeleteBooking;
