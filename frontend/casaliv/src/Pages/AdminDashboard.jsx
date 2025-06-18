import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../public/UserDashboard.css';
import api_url from '../assets/Uri';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${api_url}/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${api_url}/admin/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBookings(); // refresh after update
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-700">
        <i className="fa-solid fa-user-shield"></i> Admin Panel - Manage Bookings
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="p-4">Listing</th>
              <th className="p-4">User</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-bold">{booking.listingTitle}</p>
                    <p className="text-xs text-gray-500">{booking.location}</p>
                  </td>
                  <td className="p-4">{booking.user?.name || 'Unknown'}</td>
                  <td className="p-4 text-sm">
                    <span className="block">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                    <span className="block">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                  </td>
                  <td className="p-4">{booking.guestCount}</td>
                  <td className="p-4">₹{booking.totalPrice}</td>
                  <td className="p-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full
                        ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-600'
                            : booking.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;