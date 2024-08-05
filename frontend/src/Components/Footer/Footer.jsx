import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // const options = {
  //     month: "long",
  //     day: "numeric",
  //     year: "numeric"

  // }

  // const formattedDate = date.toLocaleDateString("en-us", options)
  // console.log(formattedDate);

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
            maiores nostrum dolor fugiat officia sequi ducimus consequuntur quo
            quisquam ad aut dolorum repellat officiis non sit odit rem, nihil
            unde? Quisquam esse et error corporis ut! Quos obcaecati eum officia
            officiis, labore maxime delectus expedita cum dolores tempore.
            Magnam, dicta.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+2348145755961</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright {currentYear} © Tomato.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
