async function fetchTickers() {
    try {
  
        const response = await fetch('http://localhost:8000/tickers');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tickers = await response.json();


        const tableBody = document.querySelector('#platform-data');
        tableBody.innerHTML = ''; 


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

document.querySelectorAll('.dropdown').forEach(dropdown => {
    const button = dropdown.querySelector('button');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    button.addEventListener('click', function(event) {
        // Close any other open dropdowns before opening the clicked one
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.classList.remove('show');
            }
        });

        // Toggle the visibility of the dropdown menu
        dropdownMenu.classList.toggle('show');

        // Prevent the default button behavior
        event.preventDefault();
    });
});

// Close dropdown if clicked outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const switchElement = document.querySelector('.switch');
    const switchSlider = document.querySelector('.switch-slider');
    const body = document.body;

    switchElement.addEventListener('click', () => {
        switchElement.classList.toggle('active');
        switchSlider.classList.toggle('active');
        body.classList.toggle('light-theme');
    });
});


window.onload = fetchTickers;
