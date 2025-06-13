import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // or emoji if you want

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-100 border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-extrabold text-pink-600 tracking-tight">
          Casa<span className="text-blue-600">Liv</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-pink-500 transition duration-300">Home</Link>
          <Link to="/listings" className="text-gray-700 hover:text-pink-500 transition duration-300">Listings</Link>
          <Link to="/register" className="text-gray-700 hover:text-pink-500 transition duration-300">Register</Link>
          <Link to="/login" className="text-gray-700 hover:text-pink-500 transition duration-300">Login</Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isOpen && (
  <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md z-40">
    <ul className="flex flex-col px-6 py-4 space-y-3 text-center">
      <li>
        <Link
          to="/"
          onClick={toggleMenu}
          className="block text-lg font-medium text-gray-800 hover:text-pink-600 transition-all"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/listings"
          onClick={toggleMenu}
          className="block text-lg font-medium text-gray-800 hover:text-pink-600 transition-all"
        >
          Listings
        </Link>
      </li>
      <li>
        <Link
          to="/register"
          onClick={toggleMenu}
          className="block text-lg font-medium text-gray-800 hover:text-pink-600 transition-all"
        >
          Register
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          onClick={toggleMenu}
          className="block text-lg font-medium text-gray-800 hover:text-pink-600 transition-all"
        >
          Login
        </Link>
      </li>
    </ul>
  </div>
)}

    </nav>
  );
};

export default Navbar;
