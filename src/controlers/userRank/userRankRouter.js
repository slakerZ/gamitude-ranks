const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { rankChange } = require('../../middleware/rankChange');

const UserRank = require('../../models/userRank');
const Stats = require('../../models/stats');
const Rank = require('../../models/rank');

router.get(
    '/:userId',
    async function(req, res, next) {
        const userid = req.params.userId;
        const stats = await Stats.find({ userId: { $eq: userid } });
        if (stats.length !== 0) {
            res.locals.myObject = stats;
            next();
        } else {
            res.status(404).send({
                error: 'Stats not found!',
            });
        }
    },
    rankChange,
    async function(req, res, next) {
        const rank = await Rank.findOne({ name: res.locals.myObject.name });
        if (rank.length !== 0) {
            res.locals.myObject = rank;
            next();
        } else {
            res.status(404).send({
                error: 'Rank not found!',
            });
        }
    },
    async function(req, res) {
        const userid = req.params.userId;
        const userRank = await UserRank.findOneAndUpdate(
            { userId: { $eq: userid } },
            { rankId: res.locals.myObject._id },
            { new: true }
        );
        userRank
            ? res.status(200).send({
                  userRank: userRank,
              })
            : res.status(404).send({
                  error: 'User not found!',
              });
    }
);

router.post('/', async function(req, res) {
    const userRank = UserRank({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        rankId: req.body.rankId,
    });
    const newUserRank = await userRank.save();
    newUserRank
        ? res.status(200).send({
              userRank: userRank,
          })
        : res.status(500).send();
});

module.exports = router;
