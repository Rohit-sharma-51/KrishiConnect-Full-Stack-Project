import React from "react";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Marketplace Connect */}
      <div className="mt-[5rem] flex flex-col">
        <div className="flex flex-col gap-[0.2rem] px-[4rem] items-center">
          <h3 className="text-bold text-[4rem] underline-offset-4 flex items-center gap-2">
            {/* <img src="/public/opt.png" alt="Leaf" className="w-12 h-12 inline-block" /> */}
            Our Solutions
          </h3>
          <div className="h-[0.4rem] w-[10rem] bg-[#219653]" />
        </div>
        <div className="flex justify-around items-center mt-[2rem]">
          <div className="flex flex-col w-[35rem] gap-[1rem] px-auto justify-center">
            <h1 className="text-[#219653] madimi-one-regular text-[1.3rem]">
              Marketplace Connect
            </h1>
            <h1 className="anton-regular text-[2.5rem]">
              Efficient Farm-to-Table Solutions
            </h1>
            <h3 className="yantramanav-regular text-[1.1rem]">
              Marketplace Connect helps farmers and buyers connect directly, making the supply chain more efficient and transparent. Instead of traditional market delays, our platform ensures quicker transactions and better market access.
            </h3>
            <h4 className="text-[1.1rem] text-gray-500">
              Our solution bridges the gap between farmers and buyers for a seamless experience.
            </h4>
            <div
              className="bg-gradient-to-r from-[#219653] to-[#6fcf97] hover:from-[#27ae60] hover:to-[#219653] w-[12rem] flex gap-[0.5rem] hover:gap-[0.8rem] justify-center cursor-pointer py-[1rem] text-[1.1rem] text-white font-bold"
              onClick={() => navigate("/marketplace")}
            >
              Learn More
              <img src="./right.png" alt="Arrow" className="w-[2rem]" />
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="/marketplace.png"
              className="w-[40rem] border-1 border-gray-100 rounded-lg shadow-lg p-[0.5rem] m-[0.5rem]"
              alt="Marketplace Connect"
            />
          </div>
        </div>
      </div>

      {/* Secure Contracts */}
      <div className="flex justify-around items-center mt-[3rem]">
        <div className="flex items-center">
          <img
            src="/securec.png"
            className="w-[35rem] h-[20rem] border-1 border-gray-100 rounded-lg shadow-lg p-[0.5rem] m-[0.5rem]"
            alt="Secure Contracts"
          />
        </div>
        <div className="flex flex-col w-[35rem] gap-[1rem] px-auto justify-center">
          <h1 className="text-[#219653] madimi-one-regular text-[1.3rem]">
            Secure Contracts
          </h1>
          <h1 className="anton-regular text-[2.5rem]">
            Blockchain-Based Contract Management
          </h1>
          <h3 className="yantramanav-regular text-[1.1rem]">
            Secure Contracts uses blockchain technology to ensure transparent and tamper-proof agreements between farmers and buyers. This system guarantees contract integrity and protects both parties.
          </h3>
          <h4 className="text-[1.1rem] text-gray-500">
            Experience secure and reliable contract management with blockchain technology.
          </h4>
          <div
            className="bg-gradient-to-r from-[#219653] to-[#6fcf97] hover:from-[#27ae60] hover:to-[#219653] w-[12rem] flex gap-[0.5rem] hover:gap-[0.8rem] justify-center cursor-pointer py-[1rem] text-[1.1rem] text-white font-bold"
            onClick={() => navigate("/securecontracts")}
          >
            Learn More
            <img src="./right.png" alt="Arrow" className="w-[2rem]" />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="flex justify-around items-center mt-[3rem]">
        <div className="flex flex-col w-[35rem] gap-[1rem] px-auto justify-center">
          <h1 className="text-[#219653] madimi-one-regular text-[1.3rem]">
            AI Insights
          </h1>
          <h1 className="anton-regular text-[2.5rem]">
            Predictive Analytics for Farmers
          </h1>
          <h3 className="yantramanav-regular text-[1.1rem]">
            AI Insights offers predictive analytics to help farmers make informed decisions about their crops. Our AI tools analyze data to forecast trends and optimize farming strategies.
          </h3>
          <h4 className="text-[1.1rem] text-gray-500">
            Leverage AI to enhance crop management and improve yields.
          </h4>
          <div className="bg-gradient-to-r from-[#219653] to-[#6fcf97] hover:from-[#27ae60] hover:to-[#219653] w-[12rem] flex gap-[0.5rem] hover:gap-[0.8rem] justify-center cursor-pointer py-[1rem] text-[1.1rem] text-white font-bold">
            Learn More
            <img src="./right.png" alt="Arrow" className="w-[2rem]" />
          </div>
        </div>
        <div>
          <img
            src="/ai.png"
            className="w-[40rem] rounded-lg shadow-lg p-[1rem] m-[1rem]"
            alt="AI Insights"
          />
        </div>
      </div>
    </div>
  );
};

export default Application;

