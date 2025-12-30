import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, getTotalCartItems, token, setToken } = useContext(StoreContext);
 
 const navigate = useNavigate();

  const logout = () => {
    
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='navbar'>
      {/* Logo */}
      <Link to='/'><img src={assets.logo} alt="logo" className='logo' /></Link>

      {/* Desktop Menu */}
      <ul className='navbar-menu'>
        <li>
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        </li>
        <li>
          <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile</a>
        </li>
        <li>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact</a>
        </li>
      </ul>

     {/* Right Section */}
<div className='navbar-right'>
  <img src={assets.search_icon} alt="search" className='search-icon' />

  {/* Cart Logo with Badge */}
  <Link to="/cart" className="cart-container">
    <img src={assets.basket_icon} alt="basket" className="cart-icon" />
    {getTotalCartItems() > 0 && (
      <span className="cart-badge">{getTotalCartItems()}</span>
    )}
  </Link>

  {!token ? (
    <button onClick={() => setShowLogin(true)} className='navbar-button'>
      Sign in
    </button>
  ) : (
    <div className='navbar-profile'>
      <img src={assets.profile_icon} alt="profile" />
      <div className='nav-profile-dropdown'>
        <li onClick={()=>navigate('/myorders') } >
          <img src={assets.bag_icon} alt="orders" /> <p>Orders</p>
        </li>
        <hr />
        <li onClick={logout}>
          <img src={assets.logout_icon} alt="logout" />
        </li>
      </div>
    </div>
  )}

  {/* Hamburger (mobile only) */}
  <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>×</button>
        <ul>
          <li onClick={() => { setMenu("home"); setIsSidebarOpen(false) }}>Home</li>
          <li onClick={() => { setMenu("menu"); setIsSidebarOpen(false) }}>Menu</li>
          <li onClick={() => { setMenu("mobile-app"); setIsSidebarOpen(false) }}>About</li>
          <li onClick={() => { setMenu("contact-us"); setIsSidebarOpen(false) }}>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
