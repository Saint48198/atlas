// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/atlas-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// create mongoose model
const User = mongoose.model('User', userSchema);


//_ GET api listing. _/
router.get('/api/', (req, res) => {
    res.send('api works');
});

//_ GET all users. _/
router.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

//_ GET one users. _/
router.get('/api/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

//_ Create a user. _/
router.post('/api/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

module.exports = router;
