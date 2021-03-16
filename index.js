const axios = require('axios');
const player = require('play-sound')(opts = {});

const MARKET = 'BNBUSDT';
const ALERTING_CRITERIA = 0.80;   // BNB price diff
const INTERVAL = 5000;  // in sec

let previousMarketPrices = 0;

const getMarketPrice = () => {
    return axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${MARKET}`)
        .then(async (response) => {

            const {symbol, price} = response.data;
            // Compare with previos price
            if (previousMarketPrices === 0) {
                previousMarketPrices = price;
                return;
            }

            let res = {};
            let diff = (price - previousMarketPrices);
            res[symbol] = {price, diff};
            console.table(res);

            // Alerting mechanism
            if ((price - previousMarketPrices) > ALERTING_CRITERIA) {
                console.log('%c ** PRICE UP BY ' + (price - previousMarketPrices) + '! **', 'color: #851d0c;');
                let audio = await player.play('./asset/sell-call.mp3', { timeout: 300 });
            }

            if ((previousMarketPrices - price) > ALERTING_CRITERIA) {
                console.log('%c ** PRICE DOWN BY ' + (previousMarketPrices - price) + '! **', 'color: #851d0c;');
                let audio = await player.play('./asset/buy-call.mp3', { timeout: 300 });
            }

            previousMarketPrices = price;

            // if (price >= 283.00) {
            //     let audio = await player.play('./asset/sell-call.mp3', { timeout: 300 });
            // }
        })
        .catch(err => {
            console.log('error', err);
        });
}

const run = () => {
    getMarketPrice();

    setInterval(getMarketPrice, INTERVAL);
}

// For subsequent execution of tick
run();




