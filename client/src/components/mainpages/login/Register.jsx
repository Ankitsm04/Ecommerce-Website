import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import './Register.css';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/register`, { ...user });

      // Store tokens and login status in localStorage
      localStorage.setItem('firstLogin', true);
      localStorage.setItem('accesstoken', res.data.accesstoken);
      localStorage.setItem('refreshtoken', res.data.refreshtoken);

      // Show success notification
      toast.success('Registered successfully! Redirecting...', { autoClose: 5000 });

      // Redirect to main page after 5 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (err) {
      toast.error(err.response.data.msg, { autoClose: 5000 });
    }
  };

  return (
    <div className='register-page'>
      <form onSubmit={registerSubmit}>
        <input
          type='text'
          name='name'
          required
          placeholder='Name'
          value={user.name}
          onChange={onChangeInput}
        />
        <input
          type='email'
          name='email'
          required
          placeholder='Email'
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type='password'
          name='password'
          required
          placeholder='Password'
          value={user.password}
          onChange={onChangeInput}
        />
        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/login'>Login</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
