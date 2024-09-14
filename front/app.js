const defaultIconUrl = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';


const iconMap = {
    'BTC/INR': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    'XRP/INR': 'https://cdn.vectorstock.com/i/1000v/84/53/ripple-xrp-coin-icon-isolated-on-white-background-vector-40868453.jpg',
    'ETH/INR': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    'TRX/INR': 'https://cryptologos.cc/logos/tron-trx-logo.png',
    'EOS/INR': 'https://cryptologos.cc/logos/eos-eos-logo.png',
    'ZIL/INR': 'https://cryptologos.cc/logos/zilliqa-zil-logo.png',
    'BAT/INR': 'https://cryptologos.cc/logos/basic-attention-token-bat-logo.png',
    'ZRX/INR': 'https://cryptologos.cc/logos/0x-zrx-logo.png',
    'REQ/INR': 'https://cdn3.vectorstock.com/i/1000x1000/59/42/req-request-the-icon-crypto-coins-or-market-vector-24785942.jpg',
    'NULS/INR': 'https://cryptologos.cc/logos/nuls-nuls-logo.png'
};


// Function to fetch ticker data and update the UI
async function fetchTickers() {
    try {
        const response = await fetch('http://localhost:8000/tickers');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tickers = await response.json();

        const platformData = document.querySelector('#platform-data');
        platformData.innerHTML = ''; // Clear previous data

        tickers.forEach((ticker, index) => {
            // Get the icon URL from the map or fallback to a default icon
            const iconUrl = iconMap[ticker.name] || defaultIconUrl;
            console.log(`Ticker Name: ${ticker.name}, Icon URL: ${iconUrl}`); // Debugging line
            
            const row = document.createElement('div');
            row.classList.add('ticker-row');
            row.innerHTML = `
                <div class="heading-content">${index + 1}</div>
                <div class="heading-content">
                    <img src="${iconUrl}" alt="Platform Icon" class="platform-icon">
                    ${ticker.name}
                </div>
                <div class="heading-content">₹ ${ticker.last}</div>
                <div class="heading-content">₹ ${ticker.buy} / ₹ ${ticker.sell}</div>
                <div class="heading-content ${ticker.buy > 0 ? (ticker.last > ticker.buy ? 'positive' : 'negative') : 'neutral'}">
                    ${ticker.buy > 0 ? calculateDifference(ticker.last, ticker.buy) + '%' : 'N/A'}
                </div>
                <div class="heading-content">${calculateSavings(ticker.last)}</div>
            `;
            platformData.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching tickers:', error);
        document.querySelector('#platform-data').innerHTML = `<div>Error fetching data.</div>`;
    }
}

function calculateDifference(lastPrice, buyPrice) {
    if (buyPrice === 0) return 'N/A';  
    const difference = ((lastPrice - buyPrice) / buyPrice) * 100;
    return difference.toFixed(2);
}

function calculateSavings(lastPrice) {
    const savings = lastPrice * 0.02; 
    return `₹ ${savings.toFixed(2)}`;
}

const radius = 46;
const circumference = 2 * Math.PI * radius;
const progressPath = document.querySelector('.CircularProgressbar-path');
const progressText = document.querySelector('.CircularProgressbar-text');
let currentTime = 59;

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    progressPath.style.strokeDashoffset = offset;
    progressText.textContent = Math.ceil(percent);
}

function startCountdown() {
    const interval = setInterval(() => {
        setProgress(currentTime);
        currentTime--;

        if (currentTime < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

// Start the countdown when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setProgress(currentTime);
    startCountdown();
});


// Fetch tickers on page load
document.addEventListener('DOMContentLoaded', fetchTickers);
