import React from 'react';
import { Link } from 'react-router-dom';
import '../../public/Auth.css';

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Register</button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
