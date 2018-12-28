const express = require('express');
const bodyParser = require('body-parser');
const MoviesRouter = require('./routers/MoviesRouter');
const CoursesRouter = require('./routers/CoursesRouter');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname))

const port = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.use('/', MoviesRouter);
app.use('/', CoursesRouter);

app.listen(port, () => {
    console.log("Application started. Listening on port:" + port)
});
