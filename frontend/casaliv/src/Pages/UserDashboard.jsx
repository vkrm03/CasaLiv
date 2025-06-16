import React from 'react';
import '../../public/UserDashboard.css'; // Add some classy styles here

const UserDashboard = () => {
  const bookings = [
    {
      id: 1,
      title: "Cozy Beachside Villa",
      location: "Goa, India",
      checkIn: "2025-07-01",
      checkOut: "2025-07-05",
      price: "₹20,000",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
    {
      id: 2,
      title: "Luxury Mountain Cabin",
      location: "Manali, India",
      checkIn: "2025-08-10",
      checkOut: "2025-08-15",
      price: "₹35,000",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
  ];

  const accountInfo = {
    username: "Vikram",
    email: "vikram@example.com",
    phone: "+91 9876543210",
  };

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-pink-600">Hey {accountInfo.username}, welcome back!</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">📦 Your Bookings</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-xl overflow-hidden shadow-lg border bg-white">
              <img
                src={booking.image}
                alt={booking.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{booking.title}</h3>
                <p className="text-sm text-gray-600">{booking.location}</p>
                <p className="text-sm mt-2 text-gray-700">
                  <span className="font-semibold">Check-in:</span> {booking.checkIn}<br />
                  <span className="font-semibold">Check-out:</span> {booking.checkOut}
                </p>
                <p className="mt-2 text-pink-600 font-bold">{booking.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;