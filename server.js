const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const routes
const studentenhuis_routes = require('./routes/studentenhuis_routes');
const auth_routes = require('./routes/authentication.routes');
const auth_controller = require('./controllers/authentication.controller');
// const ApiError
const ApiError = require('./model/ApiError');
const config = require('./config/config');
const mysql = require('mysql');


const port = process.env.PORT || config.webPort;

let app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', auth_routes);

app.all('*', auth_controller.validateToken);

app.use('/api', studentenhuis_routes);

// Test endpoint:
app.get('/test', (req, res, next) => {
    res.status(200).json({
        "Test": "This is a test endpoint"
    });
});

app.use('*', (req, res, next) => {
    console.log('Endpoint does not exist');
    next('Endpoint does not exist');
})


app.use(function (error, req, res, next){
    let end = res.end;
    let status = error.code;
    console.error(JSON.stringify(error));
    res.status(status).json(error).end();

})

// app.use((err, req, res, next) => {
//     console.log('Catch-all error handler called.');
//     console.log(err.toString());

//     const error = new ApiError(err.toString(), 404);

//     res.status(404).json(error).end();
// })


app.listen(port, () => {
    console.log('Server running on port ' + port);
});
