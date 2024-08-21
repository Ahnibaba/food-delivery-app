import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

import PropTypes from "prop-types"
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {

  const [menu, setMenu] = useState("home");
  const [click, setClick] = useState(false)

  const { token, setShowLogin, handleLogout, totalAmount } = useContext(StoreContext)

  const navigate = useNavigate()


  const handleClick = () => {
    setClick(!click)
  }



  const ordersNavigate = () => {
    setClick(false)
    navigate("/myorders")
  }

  const cartNavigate = () => {
    setClick(false)
    navigate("/cart")
  }

  const signIn = () => {
    setClick(false)
    setShowLogin(true)

  }

  const logOut = () => {
    setClick(false)
    handleLogout()
  }




  return (
    <div className="navbar">
      <Link onClick={() => setClick(false)} to="/"><img src={assets.logo} alt="" className="logo" /></Link>
      <div className="menu-icon" onClick={handleClick}>
        {click ? <FontAwesomeIcon className="bars" icon={faTimes} /> : <FontAwesomeIcon className="bars" icon={faBars} />}
      </div>
      <div className={click ? "slide-menu active-tab" : "slide-menu"}>

        <ul className="navbar-menu">
          <Link to="/" onClick={() => click ? setClick(false) : setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
          <a href="#explore-menu" onClick={() => click ? setClick(false) : setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
          <a href="#app-download" onClick={() => click ? setClick(false) : setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
          <a href="#footer" onClick={() => click ? setClick(false) : setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
        </ul>

        <div className="group">
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link onClick={cartNavigate} to="/cart"><img src={assets.basket_icon} alt="" /></Link>
            <div className={totalAmount === 0 ? "" : "dot"}></div>
          </div>
        </div>
        {!token ? <button onClick={signIn}>sign in</button>
          : <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={ordersNavigate}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>

        }
      </div>



    </div>
        </div>

  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired
}

export default Navbar;
