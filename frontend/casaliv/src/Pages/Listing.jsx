import React, { useState } from 'react';
import listingsData from '../assets/CasaLiv.json';
import ChatBot from './Chatbot';
import axios from 'axios';
import api_url from '../assets/Uri';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../public/Listings.css';

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showGuests, setShowGuests] = useState(false);
  const [bookingGuests, setBookingGuests] = useState(1);
  const [notes, setNotes] = useState('');
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookingCheckIn, setBookingCheckIn] = useState(null);
  const [bookingCheckOut, setBookingCheckOut] = useState(null);

  const handleCardClick = (listing) => {
    setSelectedListing(listing);
  };

  const closeModal = () => {
    setSelectedListing(null);
    setBookingCheckIn(null);
    setBookingCheckOut(null);
  };

  const handleGuestChange = (type, delta) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!bookingCheckIn || !bookingCheckOut) {
      toast.error('Please select both check-in and check-out dates.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You need to login to book.');
      return;
    }

    try {
      const response = await axios.post(
        `${api_url}/book`,
        {
          listingId: selectedListing.id,
          listingTitle: selectedListing.title,
          location: selectedListing.location,
          image: selectedListing.image,
          pricePerNight: selectedListing.price,
          checkIn: bookingCheckIn,
          checkOut: bookingCheckOut,
          guestCount: bookingGuests,
          notes: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Booking confirmed!');
      closeModal();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed.');
    }
  };

  const filteredListings = listingsData.filter(
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
            dateFormat="dd MMM yyyy"
          />

          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            placeholderText="Check-out"
            className="datepicker-input"
            dateFormat="dd MMM yyyy"
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
                    <span className="guest-label">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
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
            <div
              className="listing-card"
              key={listing.id}
              onClick={() => handleCardClick(listing)}
            >
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

      {selectedListing && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>

            <div className="modal-inner">
              <div className="modal-info-side">
                <h2 className="modal-title">{selectedListing.title}</h2>
                <p className="modal-location">{selectedListing.location}</p>

                <div className="rating-stars">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <span
                        key={index}
                        className={
                          selectedListing.rating >= starValue
                            ? 'star filled'
                            : selectedListing.rating >= starValue - 0.5
                            ? 'star half'
                            : 'star'
                        }
                      >
                        ★
                      </span>
                    );
                  })}
                  <span className="rating-value">{selectedListing.rating} / 5</span>
                </div>

                <p className="modal-price">{selectedListing.price}</p>
                <p className="modal-desc">
                  Experience a stay like never before! This property offers world-class comfort with scenic views and luxury amenities, ideal for your next vacation.
                </p>

                <h3 className="section-heading">Amenities</h3>
                <div className="amenities-tags">
                  <span className="tag">🌐 Wi-Fi</span>
                  <span className="tag">🛏️ King Bed</span>
                  <span className="tag">🍳 Kitchen</span>
                  <span className="tag">🧼 Cleaning</span>
                  <span className="tag">🌿 Garden</span>
                  <span className="tag">🧳 Luggage Storage</span>
                </div>

                <h3 className="section-heading">Booking</h3>
                <form className="booking-form" onSubmit={handleBooking}>
                  <div className="booking-dates">
                    <DatePicker
                      selected={bookingCheckIn}
                      onChange={(date) => setBookingCheckIn(date)}
                      placeholderText="Check-in"
                      className="datepicker-input"
                      dateFormat="dd MMM yyyy"
                    />
                    <DatePicker
                      selected={bookingCheckOut}
                      onChange={(date) => setBookingCheckOut(date)}
                      placeholderText="Check-out"
                      className="datepicker-input"
                      dateFormat="dd MMM yyyy"
                    />
                  </div>

                  <input
                    type="number"
                    placeholder="Guests"
                    min="1"
                    value={bookingGuests}
                    onChange={(e) => setBookingGuests(parseInt(e.target.value))}
                    className="guest-input"
                  />

                  <textarea
                    placeholder="Special Notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>

                  <button type="submit">Confirm Booking</button>
                </form>

                <h3 className="section-heading">Location</h3>
                <div className="map-box">
                  <iframe
                    title="location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(selectedListing.location)}&output=embed`}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatBot />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Listings;
