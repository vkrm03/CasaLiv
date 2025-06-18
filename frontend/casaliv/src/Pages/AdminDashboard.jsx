import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../public/UserDashboard.css';
import api_url from '../assets/Uri';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

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
      setSelectedBooking(null); // close modal
      fetchBookings(); // refresh data
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
                <tr key={booking._id} className={`border-b hover:bg-gray-50 ${ booking.status === 'Rejected' ? 'opacity-100 line-through text-gray-500' : ''}`}
>

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
                    <button
                      className="text-blue-600 font-medium underline text-sm"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View
                    </button>
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

{selectedBooking && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-gray-200 relative">

      <button
        onClick={() => setSelectedBooking(null)}
        className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-red-500 font-bold z-10"
      >
        &times;
      </button>

      <div className="grid md:grid-cols-2">
        <div className="h-full">
          <img
            src={selectedBooking.image}
            alt={selectedBooking.listingTitle}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 space-y-4 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800">{selectedBooking.listingTitle}</h2>
          <p className="text-sm text-gray-500">📍 {selectedBooking.location}</p>

          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>👤 User:</strong> {selectedBooking.user?.name || 'Unknown'}</p>
            <p><strong>📧 Email:</strong> {selectedBooking.user?.email || 'N/A'}</p>
            <p><strong>📅 Check-in:</strong> {new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
            <p><strong>📅 Check-out:</strong> {new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
            <p><strong>👥 Guests:</strong> {selectedBooking.guestCount}</p>
            <p><strong>💰 Price:</strong> ₹{selectedBooking.totalPrice}</p>
            <p><strong>📝 Notes:</strong> <span className="italic text-gray-500">{selectedBooking.notes || 'No notes provided'}</span></p>
            <p><strong>Status:</strong> <span className="font-medium">{selectedBooking.status}</span></p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => handleStatusChange(selectedBooking._id, 'Confirmed')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Confirm
            </button>
            <button
              onClick={() => handleStatusChange(selectedBooking._id, 'Rejected')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Reject
            </button>
            <button
              onClick={() => setSelectedBooking(null)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}




    </div>
  );
};

export default AdminDashboard;
