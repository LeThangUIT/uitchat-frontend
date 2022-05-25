import { IoIosArrowDown } from "react-icons/io";
import { BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="info">
        <div className="slogan">
          <h4>Your place to talk</h4>
          <div className="language">
            <img
              alt="United States"
              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
            />
            English, USA
            <IoIosArrowDown />
          </div>
          <div className="share">
            <a href="" className="twitter">
              <BsTwitter />
            </a>
            <a href="" className="insta">
              <BsInstagram />
            </a>
            <a href="" className="fb">
              <ImFacebook2 />
            </a>
            <a href="" className="youtube">
              <BsYoutube />
            </a>
          </div>
        </div>
        <div className="space"></div>
        <div className="product">
          <h5>Product</h5>
          <a href="">Download</a>
          <a href="">Nitro</a>
          <a href="">Status</a>
        </div>
        <div className="company">
          <h5>Company</h5>
          <a href="">About</a>
          <a href="">Jobs</a>
          <a href="">Branding</a>
          <a href="">Newsroom</a>
        </div>
        <div className="resource">
          <h5>Resources</h5>
          <a href="">College</a>
          <a href="">Support</a>
          <a href="">Safety</a>
          <a href="">Blog</a>
          <a href="">Feedback</a>
          <a href="">Developers</a>
          <a href="">StreamKit</a>
        </div>
        <div className="policy">
          <h5>policy</h5>
          <a href="">Terms</a>
          <a href="">Privacy</a>
          <a href="">Cookie Settings</a>
          <a href="">Guidelines</a>
          <a href="">Acknowledgements</a>
          <a href="">Licenses</a>
          <a href="">Moderation</a>
        </div>
      </div>
      <div className="bottom">
        <div className="loenan">
          <div className="br"></div>
          <div className="last">
            <a href="/" className="logo">
              <FaDiscord className="discord_icon" />
              UITChat
            </a>
            <button className="button_login">Open UITChat</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
