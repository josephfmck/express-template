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

    //sends back json
    res.json(json);
});

//*Update One
router.put('/:id', (req, res) => {
    // ? gives back id param #
    // res.send(req.params.id);

    //? checks if id exists in json, returns t/f
    const found = json.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updateMember = req.body;
        json.forEach(member => {
            
            //find member with id, update name and email
            if(member.id === parseInt(req.params.id)) {
                // if updateMember.name exists, set member.name to updateMember.name, 
                    //?else set to current member.name
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                //sends back msg and updated json
                res.json({msg: 'Member updated', member});
            }
        });
    }
    else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});


module.exports = router;