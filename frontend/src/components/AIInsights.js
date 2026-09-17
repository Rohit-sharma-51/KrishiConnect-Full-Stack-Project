
import { motion } from 'framer-motion';
// import {
// } from 'recharts';
// import {
// } from 'react-icons/fa';

const AIInsights = () => {
    


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-8 mb-8 text-white relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold flex items-center mb-2">
                            {/* <FaRobot className="mr-3" /> */}
                            AI Market Intelligence
                        </h1>
                        <p className="text-blue-100 max-w-2xl">
                            Leverage advanced machine learning to predict market trends, analyze sentiment, and get personalized crop recommendations.
                        </p>
                    </div>
                    <div className="absolute right-0 top-0 opacity-10">
                        {/* <FaRobot size={200} /> */}
                    </div>
                </motion.div>

               
                </div>
            </div>
       
    );
        };


export default AIInsights;
