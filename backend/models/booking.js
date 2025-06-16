const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingId: { type: String, required: true },
  listingTitle: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  pricePerNight: { type: Number, required: true },
  totalPrice: { type: Number },
  rating: { type: Number },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guestCount: { type: Number, required: true },
  notes: { type: String },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

bookingSchema.pre('save', function (next) {
  const nights = Math.ceil((this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24));
  this.totalPrice = this.pricePerNight * nights;
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
