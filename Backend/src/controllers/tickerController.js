import axios from "axios"
import {Ticker} from "../Models/ticker.models.js"


const fetchAndStoreTickers = async () => {
    try {
        const response = await axios.get("https://api.wazirx.com/api/v2/tickers")
        const tickers = Object.values(response.data);

        const top10Tickers = tickers.slice(0, 10).map(ticker => ({
            name:ticker.name,
            last: ticker.last,
            buy: ticker.buy,
            sell: ticker.sell,
            volume: ticker.volume,
            base_unit: ticker.base_unit
        }));

        await Ticker.deleteMany();
        await Ticker.insertMany(top10Tickers);
    } catch (error) {
        console.error(`Error fetching or storing tickers:`, error);
        
    }
}

const getTicker = async (req, res) => {
    try {
        const tickers = await Ticker.find();
        res.json(tickers);
    } catch (error) {
        res.status(500).json({ message: `Error fetching ticker`, error })
    }
}

fetchAndStoreTickers();

export const getTickers = async (req, res) => {
    try {
        const tickers = await Ticker.find();
        res.json(tickers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickers', error });
    }
};


export {getTicker}