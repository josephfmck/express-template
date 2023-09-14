const express = require('express');
const router = require('express').Router();
//!Modules 
const json = require('../../json');

//? /api/members - base routes url
//! rest api routes
//* get all members/data
router.get('/', (req, res) => {
    res.json(json);
});

//* get one member/data item
router.get('/:id', (req, res) => {
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

module.exports = router;