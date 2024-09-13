// Function to fetch tickers and display them
async function fetchTickers() {
    try {
        const response = await fetch('http://localhost:8000/tickers'); // Adjust the URL as needed
        const tickers = await response.json(); // Parse JSON response

        const tableBody = document.querySelector('#tickers-table tbody');
        tableBody.innerHTML = ''; // Clear existing data

        tickers.forEach(ticker => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticker.name}</td>
                <td>${ticker.last}</td>
                <td>${ticker.buy}</td>
                <td>${ticker.sell}</td>
                <td>${ticker.volume}</td>
                <td>${ticker.base_unit}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }
}

// Fetch and display tickers on page load
window.onload = fetchTickers;
