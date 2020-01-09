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

router.patch('/:userId', async function(req, res) {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.stat] = ops.value;
    }
    await Stats.update({ _id: id }, { $set: updateOps })
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.delete('/:userId', async function(req, res) {
    const id = req.params.userId;
    await Stats.remove({ _id: id })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
