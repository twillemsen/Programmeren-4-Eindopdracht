const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const routes
// const ApiError
const config = require('./config/config');

const port = process.env.PORT || config.webPort;

let app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));


// Test endpoint:
app.get('/test', (req, res, next) => {
    res.status(200).json({
        "Test": "This is a test endpoint"
    });
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});