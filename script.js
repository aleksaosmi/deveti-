// Grab elements
const balanceEl = document.getElementById('balance');
const addMoneyBtn = document.getElementById('addMoneyBtn');
const curveUpBtn = document.getElementById('curveUpBtn');
const curveDownBtn = document.getElementById('curveDownBtn');
const changeTypeBtn = document.getElementById('changeTypeBtn');

// Canvas Chart Setup
const ctx = document.getElementById('myChart').getContext('2d');

let chartType = 'line'; // default chart type
let myChart = new Chart(ctx, {
    type: chartType,
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Account Growth',
            data: [1200, 1250, 1300, 1280, 1350],
            borderColor: '#00c6ff',
            borderWidth: 3,
            fill: false,
            tension: 0.3, // smoothness
            pointRadius: 4,
            pointBackgroundColor: '#00c6ff',
            backgroundColor: 'rgba(0, 198, 255, 0.2)',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: 'easeInOutCubic',
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: { color: '#e0e0e0' },
                grid: { color: '#333' }
            },
            x: {
                ticks: { color: '#e0e0e0' },
                grid: { color: '#333' }
            }
        },
        plugins: {
            legend: {
                labels: { color: '#e0e0e0' }
            }
        }
    }
});

// --- Functions ---

// Add Money
function addMoney() {
    updateBalance(100);
    createFallingDollars(10);
}

// Bank Credit (adds $500 instantly)
function takeCredit() {
    updateBalance(500);
    alert('You took a $500 bank credit!');
    createFallingDollars(15);
}

// Passive Income (every few seconds +$20)
function startPassiveIncome() {
    setInterval(() => {
        updateBalance(20);
        createFallingDollars(5);
    }, 10000); // every 10 seconds
}

// Invest (random win or lose)
function invest() {
    const rand = Math.random();
    let currentBalance = parseInt(balanceEl.innerText);

    if (rand < 0.5) {
        const profit = Math.floor(currentBalance * 0.10);
        updateBalance(profit);
        alert(`Investment Successful! +$${profit}`);
        createFallingDollars(20);
    } else {
        const loss = Math.floor(currentBalance * 0.05);
        updateBalance(-loss);
        alert(`Investment Failed! -$${loss}`);
    }
}

// Update Balance
function updateBalance(amount) {
    let currentBalance = parseInt(balanceEl.innerText);
    currentBalance += amount;
    balanceEl.innerText = currentBalance;
    flashBalance();
}

// Falling Dollars Effect
function createFallingDollars(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const dollar = document.createElement('div');
            dollar.classList.add('dollar');
            dollar.innerText = '$';
            dollar.style.left = Math.random() * 100 + 'vw';
            document.body.appendChild(dollar);
            setTimeout(() => dollar.remove(), 3000);
        }, i * 150);
    }
}

// Flash Balance Effect
function flashBalance() {
    balanceEl.classList.add('flash');
    setTimeout(() => balanceEl.classList.remove('flash'), 800);
}

// Control Graph
function curveUp() {
    myChart.data.datasets[0].tension = 0.8;
    myChart.update();
}

function curveDown() {
    myChart.data.datasets[0].tension = 0;
    myChart.update();
}

function changeType() {
    chartType = chartType === 'line' ? 'bar' : 'line';
    myChart.destroy();
    myChart = new Chart(ctx, {
        type: chartType,
        data: myChart.data,
        options: myChart.options
    });
}

// Neon Button Bounce Effect
const neonButtons = document.querySelectorAll('.neon-button');
neonButtons.forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = 'scale(1)';
    });
});

// --- Event Listeners ---
addMoneyBtn.addEventListener('click', addMoney);
curveUpBtn.addEventListener('click', curveUp);
curveDownBtn.addEventListener('click', curveDown);
changeTypeBtn.addEventListener('click', changeType);

// Start Passive Income Auto
startPassiveIncome();
