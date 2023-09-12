const express = require('express');
//path node module deals with file paths
const path = require('path');

//Modules
const json = require('./json');
const logger = require('./middleware/logger');

const app = express();

//init middleware
// app.use(logger);

//!rest api
// get all members/data
app.get('/api/members', (req, res) => {
    res.json(json);
});

// get one member/data item
app.get('/api/members/:id', (req, res) => {
    // ? gives back id param #
    // res.send(req.params.id);

    //? checks if id exists in json, returns t/f
    const found = json.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(json.filter(member => member.id === parseInt(req.params.id)));

    }
    else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});


//static - serves static html files
//set public as static folder, start from current dir, point to public dir
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));