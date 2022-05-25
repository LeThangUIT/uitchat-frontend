import { FiMenu } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <a href="/" className="logo1">
          <FaDiscord className="discord_icon" />
          UITChat
        </a>
      </div>
      <div className="nav">
        <a href="#">Download</a>
        <a href="#">Nitro</a>
        <a href="#">Safety</a>
        <a href="#">Support</a>
        <a href="#">Blog</a>
        <a href="#">Careers</a>
      </div>
      <div className="login">
        <button className="button_login">Open UITChat</button>
        <FiMenu className="menu" />
      </div>
    </div>
  );
}

export default Header;
