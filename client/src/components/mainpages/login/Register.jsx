import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Reusing the same CSS file for consistency

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async e => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, { ...user });
      localStorage.setItem('firstLogin', true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Register</h2>
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            value={user.username}
            onChange={onChangeInput}
            className="login-input"
          />
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
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={onChangeInput}
            className="login-input"
          />
          {passwordError && <p className="password-error">{passwordError}</p>}
          <button type="submit" className="login-button">Register</button>
          <div className="login-footer">
            <p>Already have an account?</p>
            <Link to="/login" className="login-register-link">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
