import React from 'react';
import {MdOutlineMenu} from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="menu">
        <MdOutlineMenu size={30}/>

      </div>
      <div className="logo">
        <h1>
          <Link to='/'>A1 Market</Link>
        </h1>
      </div>
      <ul>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/login">Login or Register</Link></li>

        <li>
          <MdClose size={30} className='menu'/>
        </li>
      </ul>
      <div className='cart-icon'>
        <span>0</span>
        <Link to='/cart'><MdOutlineShoppingCart size={30}/></Link>
      </div>
    </header>
  )
}

export default Header
