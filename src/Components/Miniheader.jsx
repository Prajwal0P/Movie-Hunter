import React from "react";
import "animate.css";
import "./gradient.css";

const MiniHeader = () => {
  return (
    <div className="flex flex-wrap justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl animated-gradient py-2 sm:py-3 md:py-4 lg:py-5 text-center">
      <h1 className="text-white animate__animated animate__fadeInDown animate__delay-1s sm:animate__delay-1.5s">
        Find
      </h1>
      <h1 className="text-white animate__animated animate__zoomIn animate__delay-2s sm:animate__delay-2.5s ml-1 sm:ml-2 md:ml-3">
        Your
      </h1>
      <h1 className="text-white animate__animated animate__fadeInUp animate__delay-3s sm:animate__delay-3.5s ml-1 sm:ml-2 md:ml-3">
        Favorite
      </h1>
    </div>
  );
};

export default MiniHeader;
