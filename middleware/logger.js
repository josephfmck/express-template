// date and time module
const moment = require('moment');

//middleware - handles req, res (next moves to next middleware in step)
//? everytime we make a request, this runs. Ex. req to api/members, this logs in console
const logger = (req, res, next) => {
    //? protocol - http or https, get() = parts of url, host - localhost:5000, originalURL - /api/members page
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;