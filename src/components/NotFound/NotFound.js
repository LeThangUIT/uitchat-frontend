// Quân
import React from "react";
import Header from "../LandingPage/Header";
import Footer from "../LandingPage/Footer";
import "./NotFound.css";
function NotFound() {
  return (
    <>
      <div className="container_notFound">
        <Header />
        <div className="notfound">
          <div className="text">
            <h1>WRONG TURN?</h1>
            <span className="text_404">Oops...The link you accessed may be broken, not exist or the page may have been removed. We're sorry!!!</span>
          </div>
          <img
            src="https://i1.wp.com/media.giphy.com/media/8L0Pky6C83SzkzU55a/source.gif?w=525&ssl=1"
            alt=""
            className="img_404"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
