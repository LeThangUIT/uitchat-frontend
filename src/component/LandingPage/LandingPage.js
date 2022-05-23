// Quân
import "./LandingPage.css";
import { FiDownload } from "react-icons/fi";
import Header from "./Header";
import Footer from "./Footer";
function LandingPage() {
  return (
    <>
      <Header />
      <div className="banner">
        <div className="banner2">
          <div className="banner3">
            <h1 className="slogan">Your place to talk...</h1>
            <h2 className="slogan_detail">
              Whether you’re part of a school club, gaming group, worldwide art
              community, or just a handful of friends that want to spend time
              together, Discord makes it easy to talk every day and hang out
              more often.
            </h2>
            <div className="button">
              <button className="download">
                <FiDownload />
                Download for Window
              </button>
              <button className="open_discord">
                Open Discord in your browser
              </button>
            </div>
          </div>
          <div className="banner_img">
            <img src="" alt="" className="img1" />
            <img src="" alt="" className="img2" />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content1"></div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
