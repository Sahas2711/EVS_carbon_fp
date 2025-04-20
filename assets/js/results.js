document.addEventListener('DOMContentLoaded', function () {
    const result = JSON.parse(localStorage.getItem('footprintResult'));

    const resultsContainer = document.getElementById('resultsContainer');
    const noResults = document.getElementById('noResults');

    if (!result) {
        resultsContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    resultsContainer.style.display = 'block';
    noResults.style.display = 'none';

    // Display total footprint
    document.getElementById('totalFootprint').textContent = result.total;

    // Initialize charts only if canvas elements exist
    try {
        // Emissions breakdown chart
        const emissionsCtx = document.getElementById('emissionsChart');
        if (emissionsCtx) {
            new Chart(emissionsCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Home Energy', 'Transportation', 'Food', 'Shopping'],
                    datasets: [{
                        data: [
                            parseFloat(result.breakdown.homeEnergy),
                            parseFloat(result.breakdown.transport),
                            parseFloat(result.breakdown.food),
                            parseFloat(result.breakdown.shopping)
                        ],
                        backgroundColor: ['#2E8B57', '#3CB371', '#90EE90', '#CDDC39'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Emissions Breakdown' }
                    }
                }
            });
        }

        // Footprint comparison chart
        const footprintCtx = document.getElementById('footprintChart');
        if (footprintCtx) {
            new Chart(footprintCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Your Footprint', 'National Average', 'Global Average'],
                    datasets: [{
                        label: 'CO₂ Tons per Year',
                        data: [
                            parseFloat(result.total),
                            result.comparison.nationalAvg,
                            result.comparison.globalAvg
                        ],
                        backgroundColor: ['#2E8B57', '#FFA500', '#FF6347']
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } },
                    plugins: { legend: { display: false } }
                }
            });
        }
    } catch (error) {
        console.error('Chart initialization error:', error);
    }

    // Comparison message
    const comparisonText = document.getElementById('comparisonText');
    const { nationalAvg, globalAvg } = result.comparison;
    let msg = '';

    const total = parseFloat(result.total);
    if (total < globalAvg) {
        msg = `<p class="text-success"><strong>Congratulations!</strong> Your carbon footprint is ${(globalAvg - total).toFixed(1)} tons below the global average. Keep up the good work!</p>`;
    } else if (total < nationalAvg) {
        msg = `<p class="text-success"><strong>Well done!</strong> Your carbon footprint is ${(nationalAvg - total).toFixed(1)} tons below the national average.</p>`;
    } else {
        msg = `<p class="text-warning"><strong>Heads up!</strong> Your footprint is ${(total - nationalAvg).toFixed(1)} tons above the national average. Explore reduction tips to improve.</p>`;
    }

    comparisonText.innerHTML = msg;
});
