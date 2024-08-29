import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

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
      const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/login`, { ...user });

      localStorage.setItem('firstLogin', true);
      localStorage.setItem('accesstoken', res.data.accesstoken);
      localStorage.setItem('refreshtoken', res.data.refreshtoken);
      localStorage.setItem('cart',JSON.stringify(res.data.cart));

      toast.success('Logged in successfully!', { autoClose: 5000 });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (err) {
      toast.error(err.response.data.msg, { autoClose: 5000 });
    }
  };

  return (
    <div className="container">
      <div className='login-page'>
        <form onSubmit={loginSubmit}>
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
            <button type='submit'>Login</button>
            <Link to='/register'>Register</Link>
          </div>
        </form>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default Login;
