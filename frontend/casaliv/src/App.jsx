import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Listings from './Pages/Listing';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserDashboard from './Pages/UserDashboard';
import NotFound from './Pages/NotFound';


function App() {
  return (
    <div> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
