import React, { useContext } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from 'react-icons/md';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import logo from '../../assets/logo/logomed.png'
import SearchBar from './utils/Searchbar';

const Header = () => {

    const state = useContext(GlobalState)
    const [isLogged,setIsLogged] = state.userAPI.isLogged
    const [isAdmin,setIsAdmin] = state.userAPI.isAdmin 
    const [cart] =  state.userAPI.cart


    const logoutUser = async() => {
        await axios.get(`/user/logout`)
        cart.length=0;
        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
    }

    const adminRouter = ()=>{
        return(
            <>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            {/* <li><Link to='/create-product'>Create Product</Link></li>
            <li><Link to='/category'>Categories </Link></li> */}
            </>
        )
    }

    const loggedRouter = ()=>{
        return(
            <>
            {/* <li><Link to='/history'>History</Link></li> */}
            <li><Link to='/contact-us'>Contact Us</Link></li>
            <li><Link to='/about-us'>About</Link></li>
            <SearchBar />
            <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

  return (
    <header>
        <div className='menu'>
            <MdOutlineMenu size={30}/>
        </div>

            <h1>
                <Link to="/">{isAdmin?'Admin':''}</Link>
            </h1>

        <div className='logo'>
            <img src={logo} alt="" height={100} width={220} />
        </div>
        <ul>
            <li><Link to="/">{isAdmin?'Products':'Home'}</Link></li>

            {isAdmin && adminRouter()}
            {
                isLogged ? loggedRouter() : <li><Link to="/login">Login or Register</Link></li>
            }
            


            <li>
                <MdClose size={30} className='menu'/>
            </li>
        </ul>

        {
            isAdmin ? '' : <div className='cart-icon'>
            <span>{cart.length}</span>
            <Link to='/cart'><MdOutlineAddShoppingCart size={30}/></Link>
        </div>
        }

        

    </header>
  )
}

export default Header
