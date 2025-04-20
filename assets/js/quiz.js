// Quiz functionality for the education section
const quizQuestions = [
    {
        question: "How often do you eat meat?",
        options: ["Daily", "3-4 times/week", "1-2 times/week", "Rarely or never"],
        impact: [3, 2, 1, 0],
        category: "food"
    },
    {
        question: "What type of home do you live in?",
        options: ["Large house", "Medium-sized house", "Apartment", "Tiny home/eco-home"],
        impact: [3, 2, 1, 0],
        category: "housing"
    },
    {
        question: "How do you primarily commute?",
        options: ["Drive alone", "Carpool", "Public transport", "Walk/bike"],
        impact: [3, 2, 1, 0],
        category: "transport"
    },
    {
        question: "How often do you buy new clothes?",
        options: ["Monthly or more", "Every few months", "Twice a year", "Rarely/buy second-hand"],
        impact: [3, 2, 1, 0],
        category: "shopping"
    },
    {
        question: "What's your average home temperature in winter?",
        options: ["Above 72°F (22°C)", "68-72°F (20-22°C)", "64-68°F (18-20°C)", "Below 64°F (18°C)"],
        impact: [3, 2, 1, 0],
        category: "energy"
    }
];

let currentQuestion = 0;
let quizScore = {
    food: 0,
    housing: 0,
    transport: 0,
    shopping: 0,
    energy: 0
};

function startQuiz() {
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const q = quizQuestions[currentQuestion];
    document.getElementById('quizQuestion').textContent = q.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-success m-2';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
    
    document.getElementById('quizProgress').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
}

function selectAnswer(index) {
    const currentQ = quizQuestions[currentQuestion];
    quizScore[currentQ.category] += currentQ.impact[index];
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    // Calculate total score (0-15 scale)
    const totalScore = Object.values(quizScore).reduce((a, b) => a + b, 0);
    const maxPossible = quizQuestions.length * 3;
    const percentage = 100 - (totalScore / maxPossible * 100);
    
    // Determine rating
    let rating, ratingClass;
    if (percentage >= 80) {
        rating = "Excellent!";
        ratingClass = "text-success";
    } else if (percentage >= 60) {
        rating = "Good";
        ratingClass = "text-primary";
    } else if (percentage >= 40) {
        rating = "Fair";
        ratingClass = "text-warning";
    } else {
        rating = "Needs Improvement";
        ratingClass = "text-danger";
    }
    
    document.getElementById('quizContainer').innerHTML = `
        <div class="text-center">
            <h3>Your Sustainability Score</h3>
            <div class="display-4 ${ratingClass} mb-3">${Math.round(percentage)}%</div>
            <h4 class="${ratingClass} mb-4">${rating}</h4>
            
            <div class="chart-container mb-4">
                <canvas id="quizChart"></canvas>
            </div>
            
            <p>${getQuizFeedback(totalScore)}</p>
            
            <div class="mt-4">
                <a href="education.html" class="btn btn-success me-2">Learn More</a>
                <button onclick="restartQuiz()" class="btn btn-outline-success">Try Again</button>
            </div>
        </div>
    `;
    
    // Render radar chart
    renderQuizChart();
}

function renderQuizChart() {
    const ctx = document.getElementById('quizChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Food', 'Housing', 'Transport', 'Shopping', 'Energy'],
            datasets: [{
                label: 'Your Impact',
                data: [
                    5 - (quizScore.food / 3 * 5),
                    5 - (quizScore.housing / 3 * 5),
                    5 - (quizScore.transport / 3 * 5),
                    5 - (quizScore.shopping / 3 * 5),
                    5 - (quizScore.energy / 3 * 5)
                ],
                backgroundColor: 'rgba(46, 139, 87, 0.2)',
                borderColor: 'rgba(46, 139, 87, 1)',
                pointBackgroundColor: 'rgba(46, 139, 87, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(46, 139, 87, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function getQuizFeedback(totalScore) {
    if (totalScore <= 5) {
        return "You're living very sustainably! Your habits have minimal environmental impact. Consider sharing your knowledge with others to help them reduce their footprint.";
    } else if (totalScore <= 10) {
        return "You're doing well with sustainable living, but there's still room for improvement. Focus on the areas where you scored highest in our quiz.";
    } else if (totalScore <= 15) {
        return "Your environmental impact is moderate. Check out our recommendations in the education section to find ways to reduce your footprint.";
    } else {
        return "Your lifestyle has a significant environmental impact. The good news is that even small changes can make a big difference. Explore our education section for practical tips to get started.";
    }
}

function restartQuiz() {
    currentQuestion = 0;
    quizScore = {
        food: 0,
        housing: 0,
        transport: 0,
        shopping: 0,
        energy: 0
    };
    startQuiz();
}

// Initialize quiz if on quiz page
if (document.getElementById('quizContainer')) {
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizStartBtn').onclick = startQuiz;
}