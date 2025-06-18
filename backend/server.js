const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Booking = require('./models/booking');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error:", err));

const JWT_SECRET = process.env.JWT_SECRET || 'casalivsecretkey';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, email: user.email },
      token: token
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

app.post('/book', verifyToken, async (req, res) => {
  try {
    const {
      listingId,
      listingTitle,
      location,
      image,
      pricePerNight,
      checkIn,
      checkOut,
      guestCount,
      notes
    } = req.body;

    const numericPrice = parseInt(pricePerNight.replace(/[^\d]/g, ''));
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * numericPrice;

    const user = await User.findById(req.user.userId).select('name email');

    const booking = new Booking({
      userId: req.user.userId,
      listingId,
      listingTitle,
      location,
      image,
      pricePerNight: numericPrice,
      totalPrice,
      checkIn,
      checkOut,
      guestCount,
      notes,
       user: {
    name: user.name,
    email: user.email
  }
    });

    await booking.save();
    console.log("Booking saved!");
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error("Booking failed:", err);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

app.get('/user/bookings', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookings = await Booking.find({ userId }).sort({ checkIn: -1 });
    const user = await User.findById(userId).select('name email phone');

    res.status(200).json({
      user,
      bookings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user bookings' });
  }
});


app.get('/admin/bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ checkIn: -1 })
      .populate('userId', 'name email');

    res.status(200).json({ bookings });
  } catch (err) {
    console.error('Admin fetch failed:', err);
    res.status(500).json({ message: 'Error fetching all bookings' });
  }
});

app.put('/admin/bookings/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    res.status(200).json({ message: 'Status updated', booking: updated });
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ message: 'Failed to update booking status' });
  }
});



app.get('/', (req, res) => {
  res.send('CasaLiv Auth Server running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
