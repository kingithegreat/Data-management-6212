import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const DeleteBooking = () => {
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');

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
        <input
          type="text"
          className="form-control"
          placeholder="Enter Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>Delete Booking</button>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default DeleteBooking;
