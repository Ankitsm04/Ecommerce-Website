import React from 'react'
import './Home.css'
import Phone from '../../assets/home/phone.svg'
import Computer from '../../assets/home/computer.svg'
import Camera from '../../assets/home/camera.svg'
import Headphone from '../../assets/home/headphone.svg'
import Gaming from '../../assets/home/gaming.svg'



const Home = () => {
  return (
    <>
    <div className="categories">
        <div className='text'>
        <ul>
            <div className="reatangle"></div>
            <li>Categories</li>
        </ul>
        <div className='text-btn'>
            <p>Browse By Category</p>
            <button>Veiw All</button>
        </div>
        </div>
        <div className='cat-cards'>
            <div className="card">
                <img src={Phone} alt="" />
                <p>Phone</p>
            </div>
            <div className="card">
                <img src={Computer} alt="" />
                <p>Computer</p>
            </div>
            <div className="card">
                <img src={Camera} alt="" />
                <p>Camera</p>
            </div>
            <div className="card">
                <img src={Headphone} alt="" />
                <p>Headphone</p>
            </div>
            <div className="card">
                <img src={Gaming} alt="" />
                <p>Gaming</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home
