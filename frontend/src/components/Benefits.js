import React from "react";

const Benefits = () => {
  return (
    <div className="mt-[4rem] flex flex-col">
      <div className="flex flex-col items-center gap-[0.5rem] mb-[3rem]">
        <h3 className="text-bold text-[4rem] underline-offset-4 flex items-center gap-2">
          {/* <img src="/public/opt.png" alt="Leaf" className="w-12 h-12 inline-block" /> */}
          Our Benefits
        </h3>
        <div className="h-[0.4rem] w-[10rem] bg-[#219653]" />
      </div>
      <div className="flex flex-wrap justify-center gap-[2rem]">
        <div className="flex flex-col shadow-lg px-8 py-10 bg-white hover:text-white hover:bg-gradient-to-r from-[#219653] to-[#6fcf97] transform hover:-translate-y-2 transition ease-in-out duration-300 rounded-2xl">
          <div className="flex flex-col gap-[1rem] items-center">
            <img src="/dollar.png" className="w-[5rem]" alt="Cost-Effective" />
            <h3 className="text-bold text-[1.5rem] text-center">
              Cost-Effective
            </h3>
          </div>
          <p className="w-full text-center mt-[1rem] text-[1.1rem] leading-relaxed">
            Save money on agricultural transactions by leveraging transparent and efficient contracts.
          </p>
        </div>
        <div className="flex flex-col shadow-lg px-8 py-10 bg-white hover:text-white hover:bg-gradient-to-r from-[#219653] to-[#6fcf97] transform hover:-translate-y-2 transition ease-in-out duration-300 rounded-2xl">
          <div className="flex flex-col gap-[1rem] items-center">
            <img src="/innovation.png" className="w-[5rem]" alt="Faster Delivery" />
            <h3 className="text-bold text-[1.5rem] text-center">
              Faster Transactions
            </h3>
          </div>
          <p className="w-full text-center mt-[1rem] text-[1.1rem] leading-relaxed">
            Streamline your agricultural deals with swift and efficient contract processing.
          </p>
        </div>
        <div className="flex flex-col shadow-lg px-8 py-10 bg-white hover:text-white hover:bg-gradient-to-r from-[#219653] to-[#6fcf97] transform hover:-translate-y-2 transition ease-in-out duration-300 rounded-2xl">
          <div className="flex flex-col gap-[1rem] items-center">
            <img src="/data-encryption.png" className="w-[5rem]" alt="Secure Transfers" />
            <h3 className="text-bold text-[1.5rem] text-center">
              Secure Agreements
            </h3>
          </div>
          <p className="w-full text-center mt-[1rem] text-[1.1rem] leading-relaxed">
            Ensure the safety and integrity of your farming contracts with blockchain technology.
          </p>
        </div>
        <div className="flex flex-col shadow-lg px-8 py-10 bg-white hover:text-white hover:bg-gradient-to-r from-[#219653] to-[#6fcf97] transform hover:-translate-y-2 transition ease-in-out duration-300 rounded-2xl">
          <div className="flex flex-col gap-[1rem] items-center">
            <img src="/global-network.png" className="w-[5rem]" alt="Wide Reach" />
            <h3 className="text-bold text-[1.5rem] text-center">Wide Reach</h3>
          </div>
          <p className="w-full text-center mt-[1rem] text-[1.1rem] leading-relaxed">
            Connect with farmers and buyers across the country for seamless agricultural transactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;

