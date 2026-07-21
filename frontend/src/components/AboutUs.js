
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const [count, setCount] = useState({ contracts: 0, farmers: 0, buyers: 0 });
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setCount((prev) => ({
          contracts: Math.min(prev.contracts + 1000, 56595),
          farmers: Math.min(prev.farmers + 1000, 20000),
          buyers: Math.min(prev.buyers + 100, 1000),
        }));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <div className="flex flex-col w-[90%] mx-auto pt-[2rem] pb-[3rem] bg-gray-50">
      {/* Hero Section */}
      <div className="text-center mb-[3rem]">
        <h1 className="text-[3rem] font-bold text-agritech-green mb-[1rem]">
          About KrishiConnect
        </h1>
        <p className="text-[1.25rem] text-gray-700 max-w-2xl mx-auto">
          Empowering farmers and connecting them to secure, transparent contract
          farming opportunities. We aim to bridge the gap between producers and
          buyers, ensuring trust and efficiency at every step.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="flex flex-col md:flex-row items-center md:space-x-[2rem] mb-[3rem] px-[1rem] md:px-0">
        <div className="md:w-1/2">
          <h2 className="text-[2.5rem] font-semibold text-agritech-green mb-[1rem]">
            Our Mission
          </h2>
          <p className="text-[1.2rem] text-gray-600 leading-relaxed">
            At KrishiConnect, we are committed to creating a digital marketplace
            that empowers farmers with fair, transparent contracts and connects
            them with reliable buyers. Our platform ensures secure transactions,
            crop monitoring, and guaranteed payments, providing farmers with
            stability and opportunities.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-[2rem] md:mt-0">
          {/* <img
            src="/our-mission-krishi.jpeg"
            alt="Our Mission"
            className="w-full max-w-[500px] h-auto rounded-lg shadow-lg object-cover"
          /> */}
          <img src="our-mission.jpeg" alt="our Missioon" style={{width:"50%"}}></img>

        </div>
      </div>

      {/* Our Story Section */}
      <div className="mb-[3rem] px-[1rem] md:px-0">
        <h2 className="text-[2.5rem] font-semibold text-agritech-green mb-[1.5rem] text-center">
          Our Story
        </h2>
        <div className="space-y-[2rem]">
          <div className="flex flex-col md:flex-row items-center md:space-x-[2rem]">
            <div className="md:w-1/2">
              <h3 className="text-[1.75rem] font-medium text-gray-800 mb-[1rem]">
                Launched in 2026
              </h3>
              <p className="text-[1.1rem] text-gray-600 leading-relaxed">
                KrishiConnect started as a solution to address the long-standing
                challenges faced by farmers in securing fair contracts and
                ensuring payments. By leveraging technology like blockchain and
                AI, we provide an end-to-end ecosystem that supports transparent
                contract farming, enabling both smallholder farmers and
                large-scale buyers.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center mt-[2rem] md:mt-0">
              <img
                src="founded.jpeg"
                alt="Founded in 2024"
                className="w-full max-w-[500px] h-auto rounded-lg shadow-lg object-cover"
                style={{width:"50%"}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div className="flex flex-col items-center mb-[3rem] px-[1rem] md:px-0">
        <h2 className="text-[2.5rem] font-semibold text-agritech-green mb-[1.5rem] text-center">
          Our Impact
        </h2>
        <div className="flex flex-col md:flex-row justify-around w-full text-center">
          <div ref={ref} className="mb-[1.5rem] md:mb-0 animate-count">
            <h3 className="text-[2.5rem] font-bold text-agritech-green">
              {count.contracts.toLocaleString()}
            </h3>
            <p className="text-[1.2rem] text-gray-600">Contracts Signed</p>
          </div>
          <div ref={ref} className="mb-[1.5rem] md:mb-0 animate-count">
            <h3 className="text-[2.5rem] font-bold text-agritech-green">
              {count.farmers.toLocaleString()}
            </h3>
            <p className="text-[1.2rem] text-gray-600">Farmers Empowered</p>
          </div>
          <div ref={ref} className="animate-count">
            <h3 className="text-[2.5rem] font-bold text-agritech-green">
              {count.buyers.toLocaleString()}
            </h3>
            <p className="text-[1.2rem] text-gray-600">Buyers Connected</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center px-[1rem] md:px-0">
        <h2 className="text-[2.5rem] font-semibold text-agritech-green mb-[1rem]">
          Join Our Mission
        </h2>
        <p className="text-[1.2rem] text-gray-600 mb-[1.5rem]">
          Whether you're a farmer or buyer, KrishiConnect is here to empower you
          with secure, efficient, and transparent farming contracts.
        </p>
        <button className="bg-agritech-green text-white px-[2rem] py-[0.75rem] rounded-lg text-[1.1rem] font-semibold hover:bg-green-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
