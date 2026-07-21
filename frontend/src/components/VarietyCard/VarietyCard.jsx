import React from 'react';

const VarietyCard = ({ variety }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={variety.image}
        alt={variety.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{variety.name}</h3>
        <p className="text-gray-700 mb-2">{variety.quantity}</p>
        <p className="text-gray-900 font-semibold mb-4">{variety.price}</p>
        <button className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Purchase
        </button>
      </div>
    </div>
  );
};

export default VarietyCard;
