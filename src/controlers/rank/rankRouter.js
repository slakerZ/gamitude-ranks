const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Rank = require('../../models/rank');
/* GET stats on URL/stats */
router.get('/:rankId', async function(req, res) {
    const id = req.params.rankId;
    await Rank.findById(id)
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
});

router.post('/', async function(req, res) {
    const rank = Rank({
        _id: new mongoose.Types.ObjectId(),
        image: req.body.image,
        level_of_rank: req.body.level_of_rank,
        name: req.body.name,
    });
    await rank.save().then(() => console.log('Stats added'));
    res.send(rank);
});

router.delete('/:rankId', async function(req, res) {
    const id = req.params.rankId;
    Rank.remove({ _id: id })
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
