import React from 'react';
import { Link } from 'react-router-dom';
import '../../public/Auth.css';


const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to CasaLiv</h2>
        <form>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p className="auth-link">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
