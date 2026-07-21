import React from "react";

const Quote = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 py-[4rem]">
      <div className="text-center w-[90%] md:w-[70%] mx-auto">
        <div className="text-[2rem] md:text-[3rem] font-semibold text-gray-800 mb-[1rem]">
          <span className="text-[#2874fc]">KrishiConnect</span> - Your Gateway to{" "}
          <span className="text-[#2874fc]">Fair and Transparent Farming</span>
        </div>
        <div className="text-[1.5rem] md:text-[2rem] text-gray-700">
          <span className="text-[#2874fc]">कृषि कनेक्ट</span> -{" "}
          <span className="font-medium">किसानों और खरीदारों के बीच एक सीधा संपर्क</span>
        </div>
      </div>
    </div>
  );
};

export default Quote;
