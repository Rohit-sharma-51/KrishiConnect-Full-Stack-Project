// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
    // LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    // FaRobot, FaChartLine, FaSeedling, FaCloudSun, FaLightbulb, FaSpinner
} from 'react-icons/fa';

const AIInsights = () => {
    // const [loading, setLoading] = useState(true);
    // const [insights, setInsights] = useState(null);
    // const [marketSentiment, setMarketSentiment] = useState(null);
    // const [sentimentText, setSentimentText] = useState('');
    // const [analyzingSentiment, setAnalyzingSentiment] = useState(false);

    // useEffect(() => {
    //     fetchInsights();
    // }, []);

    // const fetchInsights = async () => {
        // try {
            // const token = localStorage.getItem('token');
            // const response = await axios.get('http://localhost:8000/api/ai-insights', {
                // headers: { Authorization: `Bearer ${token}` }
            // });
            // setInsights(response.data.aiInsights);
            // setLoading(false);
        // } catch (error) {
    //         console.error('Error fetching AI insights:', error);
    //         toast.error('Failed to load insights');
    //         // setLoading(false);
    //     }
    // };

    // const analyzeSentiment = async () => {
        // if (!sentimentText.trim()) return;

        // setAnalyzingSentiment(true);
        // try {
            // const token = localStorage.getItem('token');
            // const response = await axios.post('http://localhost:8000/api/sentiment-analysis',
                // { text: sentimentText },
                // { headers: { Authorization: `Bearer ${token}` } }
            // );
            // setMarketSentiment(response.data.sentiment);
        //     toast.success('Analysis complete');
        // } catch (error) {
        //     console.error('Error analyzing sentiment:', error);
        //     toast.error('Failed to analyze sentiment');
        // } finally {
            // setAnalyzingSentiment(false);
        // }
    // };

    // const getSentimentColor = (sentiment) => {
        // if (!sentiment) return 'text-gray-500';
        // if (sentiment.includes('positive')) return 'text-green-600';
        // if (sentiment.includes('negative')) return 'text-red-600';
        // return 'text-yellow-600';
    // };

    // if (loading) {
        // return (
        //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        //     </div>
        // );
    // }

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

                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
                    {/* Market Insights */}
                    {/* <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-lg shadow-md p-6" */}
                    {/* > */}
                        {/* <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            {/* <FaLightbulb className="mr-2 text-yellow-500" /> */}
                            {/* Market Insights 
                        </h2>
                            */}
                        {/* <div className="space-y-4">
                            {insights?.insights?.map((insight, index) => (
                                <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <p className="text-gray-700">{insight}</p>
                                </div>
                            ))}
                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-700 mb-2">Key Recommendations:</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    {insights?.recommendations?.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div> */}
                    {/* </motion.div> */}

                    {/* Sentiment Analysis */}
                    {/* <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    > */}
                        {/* <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <FaChartLine className="mr-2 text-green-500" />
                            Market Sentiment Analysis
                        </h2> */}
                        {/* <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Analyze Market News or Feedback
                                </label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="4"
                                    placeholder="Paste market news or entered text here to analyze sentiment..."
                                    value={sentimentText}
                                    onChange={(e) => setSentimentText(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                onClick={analyzeSentiment}
                                disabled={analyzingSentiment || !sentimentText.trim()}
                                className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 text-white font-medium transition-colors ${analyzingSentiment || !sentimentText.trim()
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {analyzingSentiment ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <span>Analyze Sentiment</span>
                                )}
                            </button>

                            {marketSentiment && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h3 className="font-semibold text-gray-700 mb-2">Analysis Result:</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Sentiment:</span>
                                        <span className={`font-bold capitalize ${getSentimentColor(marketSentiment.sentiment)}`}>
                                            {marketSentiment.sentiment}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-gray-600">Confidence:</span>
                                        <span className="font-medium">
                                            {(marketSentiment.confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${marketSentiment.sentiment === 'positive' ? 'bg-green-600' :
                                                    marketSentiment.sentiment === 'negative' ? 'bg-red-600' : 'bg-yellow-500'
                                                }`}
                                            style={{ width: `${marketSentiment.confidence * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div> */}
                    {/* </motion.div> */}

                    {/* Price Predictions Chart */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-lg shadow-md p-6 lg:col-span-2"
                    > */}
                        {/* <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <FaChartLine className="mr-2 text-purple-500" />
                            Price Trend Predictions
                        </h2> */}
                        {/* <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={insights?.pricePredictions?.predictions || []}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="period" label={{ value: 'Future Periods', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Predicted Price', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="predictedPrice" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div> */}
                    {/* </motion.div> */}

                    {/* Crop Recommendations */}
                    {/* {insights?.cropRecommendations && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-lg shadow-md p-6 lg:col-span-2"
                        > */}
                            {/* <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <FaSeedling className="mr-2 text-green-600" />
                                Personalized Crop Recommendations
                            </h2> */}
                            {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {insights.cropRecommendations.recommendations.map((crop, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-gray-800">{crop.crop}</h3>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${crop.profitability > 1000 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                High Potential
                                            </span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Market Demand:</span>
                                                <span className="font-medium capitalize">{crop.demand}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Supply Level:</span>
                                                <span className="font-medium capitalize">{crop.supply}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Est. Price:</span>
                                                <span className="font-medium">₹{crop.avgPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                            {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                                <p><strong>Note:</strong> {insights.cropRecommendations.reasoning}</p>
                            </div>
                        </motion.div>
                    )} */}
                </div>
            </div>
        // </div>
    );
        };

// };

export default AIInsights;
