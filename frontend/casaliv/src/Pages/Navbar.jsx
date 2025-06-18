import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = ({ isActive }) =>
    `text-gray-700 transition duration-300 hover:text-pink-500 ${
      isActive ? 'underline underline-offset-8 decoration-pink-500 font-semibold' : ''
    }`;

  useEffect(() => {
  const syncUser = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    setUser(token && username ? username : null);
  };

  syncUser(); 

  window.addEventListener('userChanged', syncUser);

  return () => window.removeEventListener('userChanged', syncUser);
}, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.setItem('admin', false);
    window.dispatchEvent(new Event("userChanged")); 
    navigate('/');

  };

  const renderLinks = () => {
    if (user) {
      return (
        <>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-pink-500 transition duration-300"
          >
            Logout
          </button>
         <NavLink to="/user" className="text-gray-700 hover:text-pink-500 font-semibold transition duration-300 flex items-center gap-1"
>
  <i className={`fa-solid ${localStorage.getItem('admin') === 'true' ? 'fa-user-shield' : 'fa-user'}`}></i> Hi, {localStorage.getItem('admin') === 'true' ? 'Admin' : user.split(' ')[0]}
</NavLink>

        </>
      );
    } else {
      return (
        <>
          <NavLink to="/register" className={linkClass}>Register</NavLink>
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        </>
      );
    }
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <NavLink to="/" className="text-2xl font-extrabold text-pink-600 tracking-tight">
          Casa<span className="text-blue-600">Liv</span>
        </NavLink>

        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/listings" className={linkClass}>Listings</NavLink>
          {renderLinks()}
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
            <li><NavLink to="/" onClick={toggleMenu} className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/listings" onClick={toggleMenu} className={linkClass}>Listings</NavLink></li>
            {user ? (
              <>
                <NavLink to="/user" className="text-gray-700 hover:text-pink-500 font-semibold transition duration-300 flex items-center gap-1">
  <i className="fa-solid fa-user"></i> Hi, {user.split(' ')[0]}
</NavLink>

                <li><button onClick={() => { toggleMenu(); handleLogout(); }} className="text-gray-700 hover:text-pink-500 transition">Logout</button></li>
              </>
            ) : (
              <>
                <li><NavLink to="/register" onClick={toggleMenu} className={linkClass}>Register</NavLink></li>
                <li><NavLink to="/login" onClick={toggleMenu} className={linkClass}>Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
