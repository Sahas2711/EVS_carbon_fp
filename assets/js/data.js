// Sample data.js
const emissionFactors = {
    electricity: {
        'USA': 0.417, // kg CO2 per kWh
        'Germany': 0.366,
        'UK': 0.233,
        'France': 0.052
    },
    transport: {
        'car': 0.192, // kg CO2 per km
        'bus': 0.089,
        'train': 0.041,
        'plane': 0.185 // per km, short-haul
    },
    food: {
        'meat-heavy': 3.3, // kg CO2 per day
        'average': 2.5,
        'vegetarian': 1.7,
        'vegan': 1.0
    }
};