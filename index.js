const express = require('express');
//path node module deals with file paths
const path = require('path');

//Modules
const logger = require('./middleware/logger');

const app = express();

//init middleware
// app.use(logger);




//static - serves static html files
//set public as static folder, start from current dir, point to public dir
app.use(express.static(path.join(__dirname, 'public')));

// setup router routes 
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
