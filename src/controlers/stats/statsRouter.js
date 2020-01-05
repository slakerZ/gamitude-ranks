const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const statsList = {
    id: 2,
    strength: 14,
    intelligence: 30,
    linguistics: 4,
    artistry: 10,
};

const Stats = require('../../models/stats');
/* GET stats on URL/stats */
router.get('/:userId', function(req, res) {
    const id = req.params.userId;
    Stats.findById(id);
});

router.post('/', async function(req, res) {
    const stats = Stats({
        id: new mongoose.Types.ObjectId(),
        strength: req.body.strength,
        intelligence: req.body.intelligence,
        linguistics: req.body.linguistics,
        artistry: req.body.artistry,
    });
    await stats.save().then(() => console.log('Stats added'));
    res.send(stats);
});

router.put('/', function(req, res) {
    const id = req.body.id;
    if (id === 2) {
        const strength = req.body.strength;
        const intelligence = req.body.intelligence;
        const linguistics = req.body.linguistics;
        const artistry = req.body.artistry;

        let response = statsList;

        response['id'] = id;
        response['strength'] = strength;
        response['intelligence'] = intelligence;
        response['linguistics'] = linguistics;
        response['artistry'] = artistry;

        res.send(response);
    } else {
        res.send('Brak użytkownika o danym id');
    }
});

module.exports = router;
