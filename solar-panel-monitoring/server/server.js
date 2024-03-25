const moment = require('moment');
const express = require('express');
const cors = require('cors'); // Import CORS module
const app = express();
const port = 5000;
const panels = require('./data.js');

const freshData = [];

function random(min, max) {
    return (Math.random() * (max - min + 1) + min).toFixed(2);
}

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
    panels.data.forEach(panel => {
        freshData.push({
            ...panel,
            time: moment().toISOString(),
            wattage: random(0, 400),
            voltage: random(0, 20)
        });
    });
    res.send(freshData);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
