import { FiMenu } from "react-icons/fi";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <a href="/" className="logo1">
          <div className="logo_img"></div>
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
        <a href="/login" className="button_login">
          Login
        </a>
        <a href="/register" className="button_register">
          Register
        </a>
        <FiMenu className="menu" />
      </div>
    </div>
  );
}

export default Header;
