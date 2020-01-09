const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Stats = require('../../models/stats');
/* GET stats on URL/stats */
router.get('/:userId', async function(req, res) {
    const id = req.params.userId;
    await Stats.findById(id)
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
});

router.post('/', async function(req, res) {
    const stats = Stats({
        _id: new mongoose.Types.ObjectId(),
        strength: req.body.strength,
        intelligence: req.body.intelligence,
        linguistics: req.body.linguistics,
        artistry: req.body.artistry,
    });
    await stats.save().then(() => console.log('Stats added'));
    res.send(stats);
});

router.patch('/', function(req, res) {});

module.exports = router;
