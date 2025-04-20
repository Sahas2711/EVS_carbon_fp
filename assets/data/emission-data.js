// Data for carbon footprint calculations
const emissionData = {
    countries: {
        US: {
            name: "United States",
            avgFootprint: 16.0,
            electricityMix: 0.417, // kg CO2 per kWh
            transportFactor: 1.1   // Multiplier for transport emissions
        },
        UK: {
            name: "United Kingdom",
            avgFootprint: 8.0,
            electricityMix: 0.233,
            transportFactor: 1.0
        },
        CA: {
            name: "Canada",
            avgFootprint: 15.0,
            electricityMix: 0.130,
            transportFactor: 1.2
        },
        AU: {
            name: "Australia",
            avgFootprint: 17.0,
            electricityMix: 0.790,
            transportFactor: 1.1
        },
        DE: {
            name: "Germany",
            avgFootprint: 9.0,
            electricityMix: 0.366,
            transportFactor: 0.9
        },
        FR: {
            name: "France",
            avgFootprint: 6.0,
            electricityMix: 0.052,
            transportFactor: 0.9
        },
        JP: {
            name: "Japan",
            avgFootprint: 9.0,
            electricityMix: 0.465,
            transportFactor: 0.8
        },
        IN: {
            name: "India",
            avgFootprint: 2.0,
            electricityMix: 0.708,
            transportFactor: 0.7
        },
        BR: {
            name: "Brazil",
            avgFootprint: 3.0,
            electricityMix: 0.073,
            transportFactor: 0.8
        }
    },
    
    energySources: {
        electricity: {
            name: "Electricity",
            factor: 1.0 // Uses country's electricity mix
        },
        naturalGas: {
            name: "Natural Gas",
            factor: 0.2 // kg CO2 per kWh equivalent
        },
        oil: {
            name: "Heating Oil",
            factor: 0.27
        },
        renewable: {
            name: "Renewable Energy",
            factor: 0.05
        }
    },
    
    vehicles: {
        none: {
            name: "No personal vehicle",
            factor: 0
        },
        gasCar: {
            name: "Gasoline car",
            factor: 0.25 // kg CO2 per mile
        },
        hybrid: {
            name: "Hybrid car",
            factor: 0.15
        },
        electric: {
            name: "Electric vehicle",
            factor: 0.1
        },
        suv: {
            name: "SUV/truck",
            factor: 0.35
        }
    },
    
    diets: {
        meatHeavy: {
            name: "Meat-heavy diet",
            factor: 3.3 // kg CO2 per day
        },
        meatModerate: {
            name: "Moderate meat consumption",
            factor: 2.5
        },
        vegetarian: {
            name: "Vegetarian",
            factor: 1.7
        },
        vegan: {
            name: "Vegan",
            factor: 1.0
        }
    },
    
    shoppingHabits: {
        minimal: {
            name: "Minimal purchases",
            factor: 0.5 // kg CO2 per day
        },
        average: {
            name: "Average consumer",
            factor: 1.0
        },
        frequent: {
            name: "Frequent shopper",
            factor: 1.5
        }
    }
};

// Regional adjustments within countries
emissionData.regionalAdjustments = {
    US: {
        // Sample adjustments by region - would be more comprehensive in real implementation
        northeast: { transportFactor: 0.9 }, // Better public transport
        south: { electricityFactor: 1.1 },   // More coal in energy mix
        west: { electricityFactor: 0.8 }     // More renewables
    }
};

// Seasonal adjustments
emissionData.seasonalFactors = {
    winter: {
        heating: 1.3, // Increased energy use
        transport: 1.1 // Worse fuel efficiency
    },
    summer: {
        cooling: 1.2, // Air conditioning use
        transport: 1.0
    },
    spring: {
        heating: 0.8,
        cooling: 0.9,
        transport: 0.9
    },
    fall: {
        heating: 0.9,
        cooling: 0.8,
        transport: 0.9
    }
};

module.exports = emissionData;