const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
<<<<<<< HEAD
// const routes
const studentenhuis_routes = require('./routes/studentenhuis_routes');
=======
const auth_routes = require('./routes/authentication.routes');
const auth_controller = require('./controllers/authentication.controller');
>>>>>>> 23b8c52b8ecbf4012d3d19f2958ddc92533a4a3b
// const ApiError
const ApiError = require('./model/ApiError');
const config = require('./config/config');
const mysql = require('mysql');


const port = process.env.PORT || config.webPort;

let app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));

<<<<<<< HEAD
app.use('/api', studentenhuis_routes);
=======
app.use('/api', auth_routes);

app.all('*', auth_controller.validateToken);

>>>>>>> 23b8c52b8ecbf4012d3d19f2958ddc92533a4a3b

// Test endpoint:
app.get('/test', (req, res, next) => {
    res.status(200).json({
        "Test": "This is a test endpoint"
    });
});

<<<<<<< HEAD
app.use('*', (req, res, next) => {
    console.log('Endpoint does not exist');
    next('Endpoint does not exist');
})

app.use((err, req, res, next) => {
    console.log('Catch-all error handler called.');
    console.log(err.toString());

    const error = new ApiError(err.toString(), 404);

    res.status(404).json(error).end();
})

=======
app.use(function (error, req, res, next) {
	console.error(error.toString());
	res.status(500).json({
		message: error
	}).end();
});
>>>>>>> 23b8c52b8ecbf4012d3d19f2958ddc92533a4a3b

app.listen(port, () => {
    console.log('Server running on port ' + port);
});
