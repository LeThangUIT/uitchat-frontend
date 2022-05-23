import { FiMenu } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <div className="header">
        <a href="/" className="logo">
          <FaDiscord className="discord_icon" />
          Discord
        </a>
        <div className="nav">
          <a href="#">Download</a>
          <a href="#">Nitro</a>
          <a href="#">Safety</a>
          <a href="#">Support</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
        </div>
        <div className="login">
          <button className="button_login">Open Discord</button>
          <FiMenu className="menu" />
        </div>
      </div>
    </>
  );
}

export default Header;
