import React from 'react';
import { Link } from 'react-router-dom';

const CropCard = ({ crop }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={crop.image}
        alt={crop.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{crop.name}</h3>
        <p className="text-gray-700 mb-2">{crop.description}</p>
        <Link
          to={`/crops/${crop.id}`}
          className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          View Varieties
        </Link>
      </div>
    </div>
  );
};

export default CropCard;
