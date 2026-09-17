import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaUpload, FaTimes, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    description: '',
    price: '',
    unit: 'kg',
    quantity: '',
    state: '',
    city: '',
    address: '',
    harvestDate: '',
    expiryDate: '',
    isOrganic: false,
    tags: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
  { value: 'grains', label: 'अनाज' },
  { value: 'vegetables', label: 'सब्जियाँ' },
  { value: 'fruits', label: 'फल' },
  { value: 'other', label: 'अन्य' }
  ];

  const units = [
    { value: 'kg', label: '(kg) किलोग्राम' },

{ value: 'quintal', label: 'क्विंटल' },
{ value: 'ton', label: 'टन' },
{ value: 'dozen', label: 'दर्जन' },
  ];

  const states = [
 'उत्तर प्रदेश',
'बिहार',
'राजस्थान',
'महाराष्ट्र',
'गुजरात',
'पंजाब',
'हरियाणा',
'पश्चिम बंगाल'
  ];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setImages(prev => [...prev, ...acceptedFiles]);
    }
  });

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      // Append form data
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Append images
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await axios.post('http://localhost:8000/api/products', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Product added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">नई फसल जोड़ें
              <div className="flex items-center gap-4 mt-2">
              <img src="/wheat.jpg" alt="wheat" style={{height:"100px"}}></img>
              <img src="/tomato.png" alt="tomato" style={{height:"100px"}}></img>
              <img src="/rice.jpg" alt="rice" style={{height:"100px"}}></img>
              </div>
              </h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  उत्पाद का नाम *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder=" उत्पाद का नाम डालें"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  फसल चुनें *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">फसल चुनें *</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                 वजन का माप चुनें
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {units.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  प्रति इकाई कीमत (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  उपलब्ध मात्रा *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="उत्पाद की मात्रा लिखें"
                />
              </div>
            </div>

           
          

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                   राज्य *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">राज्य चुनें</option>
                  {states.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                पता
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="अपना पता लिखें"
                />
              </div>

              
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              
            </div>

            

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <FaSave />
                )}
                <span>{loading ? 'Adding...' : 'उत्पाद जोड़ें'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProduct; 