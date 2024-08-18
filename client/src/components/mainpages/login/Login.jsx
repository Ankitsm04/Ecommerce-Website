import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, { ...user });
      localStorage.setItem('firstLogin', true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={onChangeInput}
            className="login-input"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
          <div className="login-footer">
            <p>Don't have an account?</p>
            <Link to="/register" className="login-register-link">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
