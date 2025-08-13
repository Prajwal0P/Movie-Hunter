import React from "react";
import "animate.css";
import "./gradient.css";

const Header = () => {
  return (
    <div className="flex flex-wrap justify-center items-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animated-gradient py-3 sm:py-4 md:py-5 lg:py-6 text-center">
      <h1 className="text-white animate__animated animate__bounceIn animate__delay-1s">
        🎥
      </h1>
      <h1 className="text-white animate__animated animate__fadeInLeft animate__delay-2s ml-1 sm:ml-2 md:ml-3">
        Movie
      </h1>
      <h1 className="text-white animate__animated animate__fadeInRight animate__delay-3s ml-1 sm:ml-2 md:ml-3">
        Hunter
      </h1>
    </div>
  );
};

export default Header;
