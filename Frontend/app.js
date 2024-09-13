async function fetchTickers() {
    try {
        // Fetch the data from the backend (ensure backend is running on port 8000)
        const response = await fetch('http://localhost:8000/tickers');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tickers = await response.json();

        // Reference to the table body in HTML where data will be populated
        const tableBody = document.querySelector('#platform-data');
        tableBody.innerHTML = ''; // Clear any previous data

        // Loop through each ticker and create table rows dynamically
        tickers.forEach((ticker, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Platform Icon" class="platform-icon"> ${ticker.name}</td>
                <td>₹ ${ticker.last}</td>
                <td>₹ ${ticker.buy} / ₹ ${ticker.sell}</td>
                <td class="${ticker.buy > 0 ? (ticker.last > ticker.buy ? 'positive' : 'negative') : 'neutral'}">
                    ${ticker.buy > 0 ? calculateDifference(ticker.last, ticker.buy) + '%' : 'N/A'}
                </td>
                <td>${calculateSavings(ticker.last)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching tickers:', error);
     
        document.querySelector('#platform-data').innerHTML = `<tr><td colspan="6">Error fetching data.</td></tr>`;
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


window.onload = fetchTickers;
