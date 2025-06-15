import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../public/Listings.css';

const dummyListings = [
  {
    id: 1,
    title: 'Modern Beachfront Villa',
    location: 'Malibu, California',
    price: '$450/night',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Cozy Mountain Retreat',
    location: 'Aspen, Colorado',
    price: '$320/night',
    image: 'https://images.unsplash.com/photo-1650282621002-d14a59470135?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW91bnRhaW4lMjByZXNvcnR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    title: 'Urban Penthouse Suite',
    location: 'New York City, NY',
    price: '$600/night',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  },
];

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleGuestChange = (type, delta) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const filteredListings = dummyListings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="listings-page">
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search destinations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            placeholderText="Check-in"
            className="datepicker-input"
          />
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            placeholderText="Check-out"
            className="datepicker-input"
          />

          <div className="guest-dropdown-wrapper">
            <div
              className="guest-selector"
              onClick={() => setShowGuests(!showGuests)}
            >
              Guests: {guests.adults + guests.children + guests.infants + guests.pets}
            </div>

            {showGuests && (
              <div className="guest-dropdown">
                {['adults', 'children', 'infants', 'pets'].map((type) => (
                  <div className="guest-row" key={type}>
                    <span className="guest-label">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    <div className="guest-controls">
                      <button onClick={() => handleGuestChange(type, -1)}>-</button>
                      <span>{guests[type]}</span>
                      <button onClick={() => handleGuestChange(type, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="search-btn">Search</button>
        </div>
      </div>

      <h2 className="listings-title">Available Stays</h2>
<p className="listings-subtitle">Browse top-rated properties worldwide.</p>

<div className="listings-grid">
  {filteredListings.length > 0 ? (
    filteredListings.map((listing) => (
      <div className="listing-card" key={listing.id}>
        <div className="listing-img-wrapper">
          <img
            src={listing.image}
            alt={listing.title}
            className="listing-img"
          />
        </div>
        <div className="listing-info">
          <h3 className="listing-title">{listing.title}</h3>
          <p className="listing-location">{listing.location}</p>
          <span className="listing-price">{listing.price}</span>
        </div>
      </div>
    ))
  ) : (
    <p className="no-results">No listings found.</p>
  )}
</div>


    </div>
  );
};

export default Listings;
