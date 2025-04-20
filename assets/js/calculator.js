class CarbonFootprintCalculator {
    constructor() {
        this.initForm();
    }

    initForm() {
        const form = document.getElementById('carbonForm');
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const locationName = document.getElementById('locationName').value.trim();

        if (!this.validateInputs(locationName)) {
            return;
        }

        this.showLoading(true);

        try {
            const result = await this.calculateFootprint(locationName);
            this.saveResults(result);
            window.location.href = 'results.html';
        } catch (error) {
            console.error('Calculation error:', error);
            this.showError('Failed to calculate footprint. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    validateInputs(location) {
        if (!location) {
            this.showError('Please enter a city name');
            return false;
        }
        return true;
    }

    showLoading(show) {
        document.getElementById('loading').style.display = show ? 'block' : 'none';
    }

    showError(message) {
        const errorEl = document.getElementById('error');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        setTimeout(() => errorEl.style.display = 'none', 5000);
    }

    async calculateFootprint(locationName) {
        const formattedLocation = this.formatLocationName(locationName);
        const factors = await this.getEmissionFactors(formattedLocation);

        const electricity = this.calculateElectricity(factors.electricity);
        const transport = this.calculateTransport(factors.transport);
        const industry = this.calculateIndustry(factors.industry);
        const waste = this.calculateWaste(factors.waste);

        const total = electricity + transport + industry + waste;

        return {
            location: formattedLocation,
            electricityEmissions: electricity.toFixed(2),
            transportEmissions: transport.toFixed(2),
            industryEmissions: industry.toFixed(2),
            wasteEmissions: waste.toFixed(2),
            total: total.toFixed(2),
            timestamp: new Date().toISOString(),
            reductionTips: this.getReductionTips(total),
            breakdown: {
                homeEnergy: electricity.toFixed(2),
                transport: transport.toFixed(2),
                food: industry.toFixed(2),
                shopping: waste.toFixed(2)
            },
            comparison: {
                nationalAvg: 12.0,
                globalAvg: 10.0
            }
        };
    }

    formatLocationName(name) {
        return name.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    async getEmissionFactors(location) {
        return {
            electricity: this.getElectricityFactor(location),
            transport: this.getTransportFactor(location),
            industry: this.getIndustryFactor(location),
            waste: this.getWasteFactor(location)
        };
    }

    getElectricityFactor(location) {
        const factors = {
            "Mumbai": 1.8, "Pune": 1.6, "Nagpur": 1.5,
            "Nashik": 1.4, "Other": 1.3
        };
        return factors[location] || factors["Other"];
    }

    getTransportFactor(location) {
        const factors = {
            "Mumbai": 3.2, "Pune": 2.8, "Nagpur": 2.5,
            "Nashik": 2.3, "Other": 2.0
        };
        return factors[location] || factors["Other"];
    }

    getIndustryFactor(location) {
        const factors = {
            "Mumbai": 5.0, "Pune": 4.5, "Nagpur": 4.0,
            "Nashik": 3.8, "Other": 3.5
        };
        return factors[location] || factors["Other"];
    }

    getWasteFactor(location) {
        const factors = {
            "Mumbai": 2.0, "Pune": 1.8, "Nagpur": 1.6,
            "Nashik": 1.5, "Other": 1.3
        };
        return factors[location] || factors["Other"];
    }

    calculateElectricity(factor) {
        return factor * 1.2;
    }

    calculateTransport(factor) {
        return factor * 1.1;
    }

    calculateIndustry(factor) {
        return factor * 0.9;
    }

    calculateWaste(factor) {
        return factor * 1.0;
    }

    getReductionTips(total) {
        const tips = [];

        if (total > 10) {
            tips.push("Consider switching to renewable energy sources");
            tips.push("Reduce car usage - try public transport or carpooling");
        }
        if (total > 7) {
            tips.push("Improve home insulation to reduce heating/cooling needs");
            tips.push("Reduce meat consumption - try plant-based alternatives");
        }

        tips.push("Recycle and compost to reduce waste");
        tips.push("Use energy-efficient appliances and LED lighting");

        return tips;
    }

    saveResults(data) {
        localStorage.setItem('footprintResult', JSON.stringify(data));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CarbonFootprintCalculator();
});
