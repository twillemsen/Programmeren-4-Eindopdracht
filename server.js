const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const auth_routes = require('./routes/authentication.routes');
const auth_controller = require('./controllers/authentication.controller');
// const ApiError
const config = require('./config/config');

const port = process.env.PORT || config.webPort;

let app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', auth_routes);

app.all('*', auth_controller.validateToken);


// Test endpoint:
app.get('/test', (req, res, next) => {
    res.status(200).json({
        "Test": "This is a test endpoint"
    });
});

app.use(function (error, req, res, next) {
	console.error(error.toString());
	res.status(500).json({
		message: error
	}).end();
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});