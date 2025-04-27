// Dohvatanje elemenata
const balanceEl = document.getElementById('balance');
const addMoneyBtn = document.getElementById('addMoneyBtn');
const curveUpBtn = document.getElementById('curveUpBtn');
const curveDownBtn = document.getElementById('curveDownBtn');
const changeTypeBtn = document.getElementById('changeTypeBtn');

let chartType = 'line';

// Funkcija za dodavanje novca
function addMoney() {
    let currentBalance = parseInt(balanceEl.innerText.replace('$', ''));
    currentBalance += 100;
    balanceEl.innerText = `$${currentBalance}`;
    createFallingDollars(10);
}

// Kreiranje dolara koji padaju
function createFallingDollars(count) {
    for (let i = 0; i < count; i++) {
        const dollar = document.createElement('div');
        dollar.classList.add('dollar');
        dollar.innerText = '$';
        dollar.style.left = Math.random() * 100 + 'vw';
        dollar.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(dollar);

        setTimeout(() => {
            dollar.remove();
        }, 4000);
    }
}

// Inicijalizacija Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: chartType,
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Earnings',
            data: [120, 190, 300, 250, 320, 400, 500],
            fill: true,
            backgroundColor: 'rgba(0, 198, 255, 0.2)',
            borderColor: '#00c6ff',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#00c6ff'
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Dugmad za kontrolu grafa
curveUpBtn.addEventListener('click', () => {
    myChart.data.datasets[0].data = myChart.data.datasets[0].data.map(value => value + 50);
    myChart.update();
});

curveDownBtn.addEventListener('click', () => {
    myChart.data.datasets[0].data = myChart.data.datasets[0].data.map(value => value - 50);
    myChart.update();
});

changeTypeBtn.addEventListener('click', () => {
    myChart.destroy();
    chartType = chartType === 'line' ? 'bar' : 'line';
    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Earnings',
                data: [120, 190, 300, 250, 320, 400, 500],
                fill: true,
                backgroundColor: 'rgba(0, 198, 255, 0.2)',
                borderColor: '#00c6ff',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: '#00c6ff'
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// Event listener za dodavanje novca
addMoneyBtn.addEventListener('click', addMoney);
