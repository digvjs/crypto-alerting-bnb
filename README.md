# Crypto Price Alerting

Alerting NodeJS script which plays alarming sound based on volatility of BNB crypto asset. Plays sound when price is highly volatile.

# Steps

* `npm install`

* `node index.js`

# Instructions

To change the market, Alerting criteria or interval, below parameters can be updated -
```
const MARKET = 'BNBUSDT';
const ALERTING_CRITERIA = 0.80;   // BNB price diff
const INTERVAL = 5000;  // in sec
```
Make sure the market is available here - `https://api.binance.com/api/v3/ticker/price?symbol=${MARKET}`
