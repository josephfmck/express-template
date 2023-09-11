const express = require('express');
//path node module deals with file paths
const path = require('path');

const json = require('./json');

const app = express();

//middleware - handles req, res (next moves to next middleware in step)
//? everytime we make a request, this runs. Ex. req to api/members, this logs in console
const logger = (req, res, next) => {
    console.log('hello');
    next();
};

//init middleware
app.use(logger)

//rest api
//? calling with postman
app.get('/api/members', (req, res) => {
    res.json(json);
});


//static - serves static html files
//set public as static folder, start from current dir, point to public dir
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));