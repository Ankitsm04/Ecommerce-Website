import React from 'react'
import Product from './products/Product'
import Login from './login/Login'
import Register from './login/Register'
import Cart from './Cart/Cart'
import CreateProduct from './products/utils/createProduct'
import { Route, Routes } from 'react-router-dom'
import DetailProduct from './products/utils/DetailProducts/DetailProduct'
import DashBoard from './DashBoard'
import Home from './Home'



const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Product/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/detail/:id' element={<DetailProduct/>} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/create-product' element={<CreateProduct/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
    </Routes>
  )
}

export default Pages
