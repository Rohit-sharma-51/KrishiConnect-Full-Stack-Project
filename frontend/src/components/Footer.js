

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-[#f3f8ff] flex flex-col py-[2rem] px-[5rem] mt-auto">
//       <div className="flex justify-between">
//         <div className="flex gap-[2rem] items-center">
//           <h1 className="anton-regular text-[1.8rem] text-[#2874fc]">
//             QuickShip
//           </h1>
//           <div className="flex flex-col items-end justify-center">
//             <h1 className="text-[1.1rem] underline-offset-4 font-semibold text-[#2874fc]">
//               Fast Parcel Delivery made{" "}
//               <span className="font-bold">Simple</span>
//             </h1>
//             <div className="h-[0.4rem] w-[4rem] bg-[#2874fc]" />
//           </div>
//         </div>
//         <div className="flex gap-[2rem]">
//           <div className="bg-[#011552] hover:bg-[#0060ff] cursor-pointer text-white rounded-lg flex px-[1.2rem] py-[0.6rem] items-center">
//             <img
//               src="/playstore.png"
//               alt="play store_image"
//               className="w-[2rem] h-[2rem]"
//             />
//             <div className="flex flex-col">
//               <h3 className="text-[0.8rem]">Get it On</h3>
//               <h3 className="font-bold">Play Store</h3>
//             </div>
//           </div>
//           <div className="bg-[#011552] hover:bg-[#0060ff] cursor-pointer text-white rounded-lg flex gap-[0.4rem] px-[1.2rem] py-[0.6rem] items-center">
//             <img
//               src="/app-store.png"
//               alt="app store_image"
//               className="w-[2rem] h-[2rem]"
//             />
//             <div className="flex flex-col">
//               <h3 className="text-[0.8rem]">Get it On</h3>
//               <h3 className="font-bold">App Store</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full h-[0.2rem] bg-gray-200 mt-[1rem] mb-[2rem]" />
//       <div className="flex justify-between">
//         <div className="flex flex-col">
//           <h1 className="font-bold text-[1.2rem] mb-[1rem]">Our Services</h1>
//           <div className="flex flex-col">
//             <p
//               className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black"
//               onClick={() => navigate("/parcel-delivery")}
//             >
//               Parcel Delivery
//             </p>
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               Travelers' Network
//             </p>
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               Track & Trace
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <h1 className="font-bold text-[1.2rem] mb-[1rem]">Resources</h1>
//           <div className="flex flex-col">
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               Blog
//             </p>
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               FAQs
//             </p>
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               Help Center
//             </p>
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               Guides
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <h1 className="font-bold text-[1.2rem] mb-[1rem]">Support</h1>
//           <div className="flex flex-col">
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               Contact Us
//             </p>
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               Live Chat
//             </p>
//             <p className="text-gray-500 text-[0.9rem] cursor-pointer hover:text-black">
//               Feedback
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col gap-[0.5rem]">
//           <h1 className="font-bold text-[1.2rem] text-center mb-[1rem]">
//             Follow Us
//           </h1>
//           <div className="flex gap-[1rem]">
//             <div className="flex items-center justify-center w-[4rem] h-[4rem] border-2 cursor-pointer hover:bg-gray-200">
//               <img src="/github-sign.png" alt="GitHub" className="w-[2.5rem]" />
//             </div>
//             <div className="flex items-center justify-center w-[4rem] h-[4rem] border-2 cursor-pointer hover:bg-gray-200">
//               <img src="/linkedin.png" className="w-[2.5rem]" alt="LinkedIn" />
//             </div>
//           </div>
//           <div className="flex gap-[1rem]">
//             <div className="flex items-center justify-center w-[4rem] h-[4rem] border-2 cursor-pointer hover:bg-gray-200">
//               <img src="/twitter.png" alt="Twitter" className="w-[2.5rem]" />
//             </div>
//             <div className="flex items-center justify-center w-[4rem] h-[4rem] border-2 cursor-pointer hover:bg-gray-200">
//               <img
//                 src="/instagram.png"
//                 className="w-[2.5rem]"
//                 alt="Instagram"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;



import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 flex flex-col py-[2rem] px-[5rem] mt-auto">
      <div className="flex justify-between">
        <div className="flex gap-[2rem] items-center">
          <h1 className="anton-regular text-[1.8rem] text-agritech-green">
            KrishiConnect
          </h1>
          <div className="flex flex-col items-end justify-center">
            <h1 className="text-[1.3rem] underline-offset-4 font-semibold text-agritech-green">
            सही खेती, सही बाज़ार, सही मूल्य 
             
            </h1>
           
          </div>
        </div>
        <div className="flex gap-[2rem]">
          <div className="bg-agritech-green hover:bg-green-700 cursor-pointer text-white rounded-lg flex px-[1.2rem] py-[0.6rem] items-center transition-colors duration-300">
            <img
              src="/playstore.png"
              alt="play store_image"
              className="w-[2rem] h-[2rem]"
            />
            <div className="flex flex-col">
              <h3 className="text-[0.8rem]">Get it On</h3>
              <h3 className="font-bold">Play Store</h3>
            </div>
          </div>
          <div className="bg-agritech-green hover:bg-green-700 cursor-pointer text-white rounded-lg flex gap-[0.4rem] px-[1.2rem] py-[0.6rem] items-center transition-colors duration-300">
            <img
              src="/app-store.png"
              alt="app store_image"
              className="w-[2rem] h-[2rem]"
            />
            <div className="flex flex-col">
              <h3 className="text-[0.8rem]">Get it On</h3>
              <h3 className="font-bold">App Store</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[0.2rem] bg-gray-200 mt-[1rem] mb-[2rem]" />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-[1.2rem] mb-[1rem] text-agritech-green">Our Services</h1>
          <div className="flex flex-col">
            <p
              className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200"
              onClick={() => navigate("/contract-farming")}
            >
              Contract Farming
            </p>
            <p
              className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200"
              onClick={() => navigate("/crop-monitoring")}
            >
              Crop Monitoring
            </p>
            <p
              className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200"
              onClick={() => navigate("/payment-guarantee")}
            >
              Payment Guarantee
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-[1.2rem] mb-[1rem] text-agritech-green">Resources</h1>
          <div className="flex flex-col">
            <p className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200">
              Blog
            </p>
            <p className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200">
              FAQs
            </p>
            <p className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200">
              Help Center
            </p>
            <p className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200">
              Farmer Guides
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-[1.2rem] mb-[1rem] text-agritech-green">Support</h1>
          <div className="flex flex-col">
            <p className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200">
              Contact Us
            </p>
            <p className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200">
              Live Chat
            </p>
            <p className="text-gray-600 text-[0.9rem] cursor-pointer hover:text-agritech-green transition-colors duration-200">
              Feedback
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[0.5rem]">
          <h1 className="font-bold text-[1.2rem] text-center mb-[1rem] text-agritech-green">
            Follow Us
          </h1>
          <div className="flex gap-[1rem]">
            <div className="flex items-center justify-center w-[4rem] h-[4rem] border-2 border-green-200 cursor-pointer hover:bg-green-100 hover:border-green-300 transition-colors duration-200">
              <img src="/github-sign.png" alt="GitHub" className="w-[2.5rem]" />
            </div>
            <div className="flex items-center justify-center w-[4rem] h-[4rem] border-2 border-green-200 cursor-pointer hover:bg-green-100 hover:border-green-300 transition-colors duration-200">
              <img src="/linkedin.png" className="w-[2.5rem]" alt="LinkedIn" />
            </div>
          </div>
          <div className="flex gap-[1rem]">
            <div className="flex items-center justify-center w-[4rem] h-[4rem] border-2 border-green-200 cursor-pointer hover:bg-green-100 hover:border-green-300 transition-colors duration-200">
              <img src="/twitter.png" alt="Twitter" className="w-[2.5rem]" />
            </div>
            <div className="flex items-center justify-center w-[4rem] h-[4rem] border-2 border-green-200 cursor-pointer hover:bg-green-100 hover:border-green-300 transition-colors duration-200">
              <img
                src="/instagram.png"
                className="w-[2.5rem]"
                alt="Instagram"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
