import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../public/UserDashboard.css';
import api_url from '../assets/Uri';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${api_url}/user/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data.bookings);
        setUserInfo(response.data.user);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-pink-600">
        Hey {userInfo?.name || 'User'}, welcome back!
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">📦 Your Bookings</h2>
        <div className="grid md:grid-cols-2 gap-6">
  {bookings.length > 0 ? (
    bookings.map((booking) => (
      <div key={booking._id} className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white transition-transform hover:scale-[1.02] hover:shadow-2xl">
  <img
    src={booking.image}
    alt={booking.listingTitle}
    className="h-52 w-full object-cover rounded-t-2xl"
  />
  <div className="p-5 space-y-4">
    {/* Header */}
    <div className="flex justify-between items-start">
      <h3 className="text-xl font-bold text-gray-800">{booking.listingTitle}</h3>
      <span className="bg-green-100 text-green-600 px-3 py-1 text-xs rounded-full font-semibold">
        Confirmed
      </span>
    </div>

    <p className="text-sm text-gray-500">{booking.location}</p>

    {/* Details */}
    <div className="text-sm text-gray-700 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-blue-500 font-semibold">📅 Check-in:</span>
        <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-red-500 font-semibold">📅 Check-out:</span>
        <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-yellow-600 font-semibold">👥 Guests:</span>
        <span>{booking.guestCount}</span>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-purple-600 font-semibold">📝 Notes:</span>
        <span className="italic text-gray-600">{booking.notes || 'No additional notes'}</span>
      </div>
    </div>

    <div className="flex justify-between items-center pt-4 border-t pt-3">
      <p className="text-pink-600 font-bold text-lg">₹{booking.totalPrice}</p>
      <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">
        🆔 #{booking._id.slice(-6)}
      </span>
    </div>
  </div>
</div>

    ))
  ) : (
    <p className="text-center text-gray-500 col-span-2">No bookings found.</p>
  )}
</div>

      </section>
    </div>
  );
};

export default UserDashboard;
