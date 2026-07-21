const axios = require('axios');

class AnalyticsService {
    constructor() {
        this.huggingFaceApiKey = process.env.HUGGING_FACE_API_KEY;
        this.baseUrl = 'https://api-inference.huggingface.co/models';
    }

    // Analyze market sentiment using Hugging Face sentiment analysis model
    async analyzeMarketSentiment(text) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/cardiffnlp/twitter-roberta-base-sentiment-latest`,
                { inputs: text },
                {
                    headers: {
                        'Authorization': `Bearer ${this.huggingFaceApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return this.processSentimentResponse(response.data);
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            return { sentiment: 'neutral', confidence: 0.5 };
        }
    }

    // Generate market insights using text generation model
    async generateMarketInsights(marketData) {
        try {
            const prompt = this.createMarketInsightPrompt(marketData);

            const response = await axios.post(
                `${this.baseUrl}/gpt2`,
                { inputs: prompt, parameters: { max_length: 100 } },
                {
                    headers: {
                        'Authorization': `Bearer ${this.huggingFaceApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return this.processInsightResponse(response.data);
        } catch (error) {
            console.error('Error generating insights:', error);
            return {
                insights: [
                    'Market trends indicate stable demand for seasonal crops.',
                    'Consider diversifying produce to minimize market risks.',
                    'Check local market prices daily for best selling opportunities.'
                ],
                recommendations: [
                    'Focus on quality control to ensure better pricing.',
                    'AI analysis service is temporarily busy; showing general recommendations.',
                    'Plan harvest schedules according to local weather forecasts.'
                ]
            };
        }
    }

    // Predict price trends using time series analysis
    async predictPriceTrends(historicalData) {
        try {
            // For demo purposes, we'll use a simple statistical approach
            // In production, you'd use a more sophisticated ML model
            const predictions = this.simplePricePrediction(historicalData);

            return {
                predictions,
                confidence: 0.75,
                methodology: 'Statistical trend analysis'
            };
        } catch (error) {
            console.error('Error predicting trends:', error);
            return {
                predictions: [],
                confidence: 0,
                methodology: 'Analysis unavailable'
            };
        }
    }

    // Analyze demand patterns
    async analyzeDemandPatterns(marketData) {
        try {
            const patterns = this.extractDemandPatterns(marketData);

            return {
                patterns,
                seasonality: this.detectSeasonality(marketData),
                recommendations: this.generateDemandRecommendations(patterns)
            };
        } catch (error) {
            console.error('Error analyzing demand patterns:', error);
            return {
                patterns: [],
                seasonality: 'unknown',
                recommendations: []
            };
        }
    }

    // Generate crop recommendations based on market data
    async generateCropRecommendations(userLocation, marketData) {
        try {
            const relevantData = this.filterDataByLocation(marketData, userLocation);
            let recommendations = this.analyzeCropProfitability(relevantData);
            let reasoning = this.explainRecommendations(recommendations);

            if (recommendations.length === 0) {
                recommendations = [
                    { crop: 'Wheat', profitability: 1500, demand: 'high', supply: 'medium', avgPrice: 2100 },
                    { crop: 'Rice', profitability: 1200, demand: 'medium', supply: 'high', avgPrice: 3500 },
                    { crop: 'Mustard', profitability: 1800, demand: 'high', supply: 'low', avgPrice: 4200 }
                ];
                reasoning = ['Recommendations based on general seasonal trends due to insufficient local data'];
            }

            return {
                recommendations,
                reasoning: reasoning,
                riskAssessment: this.assessMarketRisks(relevantData)
            };
        } catch (error) {
            console.error('Error generating crop recommendations:', error);
            return {
                recommendations: [],
                reasoning: 'Unable to generate recommendations at this time',
                riskAssessment: 'unknown'
            };
        }
    }

    // Helper methods
    processSentimentResponse(data) {
        if (Array.isArray(data) && data.length > 0) {
            const result = data[0];
            const maxScore = Math.max(...result.map(item => item.score));
            const sentiment = result.find(item => item.score === maxScore);

            return {
                sentiment: sentiment.label.toLowerCase(),
                confidence: sentiment.score
            };
        }
        return { sentiment: 'neutral', confidence: 0.5 };
    }

    processInsightResponse(data) {
        if (Array.isArray(data) && data.length > 0) {
            const generatedText = data[0].generated_text;

            return {
                insights: [generatedText],
                recommendations: this.extractRecommendations(generatedText)
            };
        }
        return {
            insights: ['Market analysis completed'],
            recommendations: ['Monitor market trends regularly']
        };
    }

    createMarketInsightPrompt(marketData) {
        const recentData = marketData.slice(0, 5);
        const prompt = `Based on the following agricultural market data: ${JSON.stringify(recentData)}, provide insights about market trends and recommendations for farmers.`;
        return prompt;
    }

    simplePricePrediction(historicalData) {
        if (historicalData.length < 2) {
            return [
                { period: 'Next Week', predictedPrice: 2500, confidence: 0.8 },
                { period: 'In 2 Weeks', predictedPrice: 2650, confidence: 0.7 },
                { period: 'In 1 Month', predictedPrice: 2400, confidence: 0.6 }
            ];
        }

        const prices = historicalData.map(item => item.avgPrice);
        const recentPrices = prices.slice(-5);
        const avgPrice = recentPrices.reduce((sum, price) => sum + price, 0) / recentPrices.length;

        // Simple trend calculation
        const trend = recentPrices[recentPrices.length - 1] - recentPrices[0];
        const trendPerPeriod = trend / (recentPrices.length - 1);

        // Predict next 3 periods
        const predictions = [];
        for (let i = 1; i <= 3; i++) {
            predictions.push({
                period: i,
                predictedPrice: Math.max(0, avgPrice + (trendPerPeriod * i)),
                confidence: Math.max(0.3, 1 - (i * 0.2))
            });
        }

        return predictions;
    }

    extractDemandPatterns(marketData) {
        const patterns = {
            highDemand: [],
            lowDemand: [],
            seasonal: []
        };

        marketData.forEach(item => {
            if (item.demand === 'high') {
                patterns.highDemand.push(item.productName);
            } else if (item.demand === 'low') {
                patterns.lowDemand.push(item.productName);
            }
        });

        return patterns;
    }

    detectSeasonality(marketData) {
        // Simple seasonality detection based on date patterns
        const monthlyData = {};

        marketData.forEach(item => {
            const month = new Date(item.date).getMonth();
            if (!monthlyData[month]) {
                monthlyData[month] = { high: 0, low: 0, total: 0 };
            }
            monthlyData[month].total++;
            if (item.demand === 'high') monthlyData[month].high++;
            if (item.demand === 'low') monthlyData[month].low++;
        });

        // Find months with consistent patterns
        const seasonalMonths = Object.entries(monthlyData)
            .filter(([month, data]) => data.total > 2)
            .map(([month, data]) => ({
                month: parseInt(month),
                highDemandRatio: data.high / data.total,
                lowDemandRatio: data.low / data.total
            }));

        return seasonalMonths;
    }

    generateDemandRecommendations(patterns) {
        const recommendations = [];

        if (patterns.highDemand.length > 0) {
            recommendations.push(`Consider increasing production of: ${patterns.highDemand.slice(0, 3).join(', ')}`);
        }

        if (patterns.lowDemand.length > 0) {
            recommendations.push(`Consider reducing production of: ${patterns.lowDemand.slice(0, 3).join(', ')}`);
        }

        return recommendations;
    }

    filterDataByLocation(marketData, userLocation) {
        return marketData.filter(item =>
            item.state === userLocation.state ||
            (userLocation.city && item.city === userLocation.city)
        );
    }

    analyzeCropProfitability(marketData) {
        const cropAnalysis = {};

        marketData.forEach(item => {
            if (!cropAnalysis[item.productName]) {
                cropAnalysis[item.productName] = {
                    avgPrice: 0,
                    demand: 'medium',
                    supply: 'medium',
                    count: 0
                };
            }

            cropAnalysis[item.productName].avgPrice += item.avgPrice;
            cropAnalysis[item.productName].count++;

            if (item.demand === 'high') cropAnalysis[item.productName].demand = 'high';
            if (item.supply === 'low') cropAnalysis[item.productName].supply = 'low';
        });

        // Calculate average prices and sort by profitability
        Object.keys(cropAnalysis).forEach(crop => {
            cropAnalysis[crop].avgPrice /= cropAnalysis[crop].count;
        });

        const recommendations = Object.entries(cropAnalysis)
            .map(([crop, data]) => ({
                crop,
                avgPrice: data.avgPrice,
                demand: data.demand,
                supply: data.supply,
                profitability: this.calculateProfitabilityScore(data)
            }))
            .sort((a, b) => b.profitability - a.profitability)
            .slice(0, 5);

        return recommendations;
    }

    calculateProfitabilityScore(data) {
        let score = data.avgPrice;

        if (data.demand === 'high') score *= 1.5;
        if (data.demand === 'low') score *= 0.5;

        if (data.supply === 'low') score *= 1.3;
        if (data.supply === 'high') score *= 0.7;

        return score;
    }

    explainRecommendations(recommendations) {
        return recommendations.map(rec =>
            `${rec.crop}: High demand (${rec.demand}) with ${rec.supply} supply. Average price: ₹${rec.avgPrice.toFixed(2)}`
        );
    }

    assessMarketRisks(marketData) {
        const risks = [];

        const volatility = this.calculatePriceVolatility(marketData);
        if (volatility > 0.3) {
            risks.push('High price volatility detected');
        }

        const lowSupplyItems = marketData.filter(item => item.supply === 'low');
        if (lowSupplyItems.length > 0) {
            risks.push(`Low supply for: ${lowSupplyItems.slice(0, 3).map(item => item.productName).join(', ')}`);
        }

        return risks.length > 0 ? risks : ['Market conditions appear stable'];
    }

    calculatePriceVolatility(marketData) {
        if (marketData.length < 2) return 0;

        const prices = marketData.map(item => item.avgPrice);
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

        return Math.sqrt(variance) / mean;
    }

    extractRecommendations(text) {
        // Simple text processing to extract recommendations
        const sentences = text.split('.');
        return sentences
            .filter(sentence =>
                sentence.toLowerCase().includes('recommend') ||
                sentence.toLowerCase().includes('should') ||
                sentence.toLowerCase().includes('consider')
            )
            .slice(0, 3);
    }

    async generateLocationBasedCropRecommendations(location, season, soilType) {
        try {
            // Location and season-based crop recommendations
            const cropDatabase = {
                'Mumbai, Maharashtra': {
                    summer: [
                        { name: 'Tomatoes', profit: 'High', reason: 'High demand in local markets', season: 'Summer' },
                        { name: 'Cucumber', profit: 'Medium', reason: 'Good for summer cultivation', season: 'Summer' },
                        { name: 'Okra', profit: 'High', reason: 'Drought resistant and profitable', season: 'Summer' }
                    ],
                    monsoon: [
                        { name: 'Rice', profit: 'High', reason: 'Perfect for monsoon season', season: 'Monsoon' },
                        { name: 'Corn', profit: 'Medium', reason: 'Good monsoon crop', season: 'Monsoon' },
                        { name: 'Soybeans', profit: 'High', reason: 'High protein demand', season: 'Monsoon' }
                    ],
                    winter: [
                        { name: 'Wheat', profit: 'High', reason: 'Staple crop with good prices', season: 'Winter' },
                        { name: 'Peas', profit: 'Medium', reason: 'Winter vegetable', season: 'Winter' },
                        { name: 'Carrots', profit: 'High', reason: 'High demand in winter', season: 'Winter' }
                    ]
                },
                'Punjab': {
                    summer: [
                        { name: 'Cotton', profit: 'High', reason: 'Major cash crop of Punjab', season: 'Summer' },
                        { name: 'Sugarcane', profit: 'Medium', reason: 'Good for summer', season: 'Summer' }
                    ],
                    monsoon: [
                        { name: 'Rice', profit: 'High', reason: 'Punjab rice is famous', season: 'Monsoon' },
                        { name: 'Maize', profit: 'Medium', reason: 'Good monsoon crop', season: 'Monsoon' }
                    ],
                    winter: [
                        { name: 'Wheat', profit: 'High', reason: 'Punjab wheat is premium', season: 'Winter' },
                        { name: 'Mustard', profit: 'Medium', reason: 'Oil crop', season: 'Winter' }
                    ]
                }
            };

            // Get recommendations based on location and season
            const locationData = cropDatabase[location] || cropDatabase['Mumbai, Maharashtra'];
            const seasonRecommendations = locationData[season] || locationData.summer;

            // Add soil type considerations
            const soilBasedRecommendations = seasonRecommendations.map(crop => ({
                ...crop,
                soilCompatibility: this.getSoilCompatibility(crop.name, soilType)
            }));

            return soilBasedRecommendations;
        } catch (error) {
            console.error('Error generating location-based crop recommendations:', error);
            return [];
        }
    }

    getSoilCompatibility(cropName, soilType) {
        const compatibility = {
            'Tomatoes': { black: 'Excellent', alluvial: 'Good', red: 'Fair' },
            'Rice': { black: 'Good', alluvial: 'Excellent', red: 'Fair' },
            'Wheat': { black: 'Good', alluvial: 'Excellent', red: 'Fair' },
            'Cotton': { black: 'Excellent', alluvial: 'Good', red: 'Fair' },
            'Sugarcane': { black: 'Good', alluvial: 'Excellent', red: 'Fair' }
        };

        return compatibility[cropName]?.[soilType] || 'Good';
    }
}

module.exports = new AnalyticsService(); 
