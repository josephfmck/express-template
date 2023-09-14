const express = require('express');
const router = require('express').Router();
//!Modules 
const json = require('../../json');
const uuid = require('uuid');

//? /api/members - base routes url
//! rest api routes
//*Get All 
router.get('/', (req, res) => {
    res.json(json);
});

//* Get One
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

//*Create One 
router.post('/', (req, res) => {
    //? body will have name and email data from postman
    // res.send(req.body);

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    json.push(newMember);
    res.json(json);
});

module.exports = router;