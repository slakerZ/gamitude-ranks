const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { rankChange } = require('../../middleware/rankChange');

const Rank = require('../../models/rank');
/* GET rank on URL/rank */
router.get('/:rankId', async function(req, res) {
    const rankid = req.params.rankId;
    const rank = await Rank.findById(rankid);
    rank
        ? res.status(200).send({
              rank: rank,
          })
        : res.status(404).send({
              error: 'Rank not found!',
          });
});

router.get('/name/:rankName', async function(req, res) {
    const rankname = req.params.rankName;
    const rank = await Rank.findOne({ name: rankname });
    rank
        ? res.status(200).send({
              rank: rank,
          })
        : res.status(404).send({
              error: 'Rank not found!',
          });
});

router.post('/', rankChange, async function(req, res) {
    const rank = Rank({
        _id: new mongoose.Types.ObjectId(),
        image: req.body.image,
        tier: req.body.tier,
        name: req.body.name,
    });
    const prank = await rank.save();
    prank
        ? res.status(200).send({
              rank: rank,
          })
        : res.status(500).send();
});

router.delete('/:rankId', async function(req, res) {
    const rankid = req.params.rankId;
    if (mongoose.Types.ObjectId.isValid(rankid)) {
        const deleted = await Rank.findByIdAndRemove(rankid);
        deleted
            ? res.status(200).send()
            : res.status(404).send({
                  error: 'Rank not found!',
              });
    } else {
        res.status(400).send({
            error: 'rankId not valid!',
            status: 1,
        });
    }
});

module.exports = router;
