const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { calc } = require('../../middleware/statsCalc');

const Stats = require('../../models/stats');
/* GET stats on URL/stats */
router.get('/:userId', async function(req, res) {
    const userid = req.params.userId;
    const stats = await Stats.find({ userId: { $eq: userid } });
    stats
        ? res.status(200).send({
              stats: stats,
          })
        : res.status(404).send({
              error: 'Stats not found!',
          });
});

router.post(
    '/',
    async function(req, res, next) {
        const userid = req.body.project.userId;
        const z = await Stats.find({ userId: { $eq: userid } });
        if (z.length !== 0) {
            res.locals.myObject = z;
            next();
        } else {
            const stats = Stats({
                userId: userid,
            });
            const newStats = await stats.save();
            if (newStats.length !== 0) {
                res.locals.newObject = newStats;
                next();
            } else {
                res.status(500).send();
            }
        }
    },
    calc,
    async function(req, res) {
        const statsid = req.body.project.userId;
        const statsUpdated = await Stats.findOneAndUpdate(
            { userId: { $eq: statsid } },
            res.locals.myObject,
            {
                new: true,
            }
        );
        statsUpdated
            ? res.status(200).send(statsUpdated)
            : res.status(404).send({
                  error: 'Stats not found!',
              });
    }
);

router.patch('/:statsId', async function(req, res) {
    const statsid = req.params.statsId;
    const stats = req.body;
    if (mongoose.Types.ObjectId.isValid(statsid)) {
        const statsUpdated = await Stats.findByIdAndUpdate(statsid, stats, {
            new: true,
        });
        statsUpdated
            ? res.status(200).send(stats)
            : res.status(404).send({
                  error: 'Stats not found!',
              });
    } else {
        res.status(400).send({
            error: 'statsId not valid!',
            status: 1,
        });
    }
});

router.delete('/:userId', async function(req, res) {
    const userid = req.params.userId;
    if (mongoose.Types.ObjectId.isValid(userid)) {
        const deleted = await Stats.findByIdAndRemove(userid);
        deleted
            ? res.status(200).send()
            : res.status(404).send({
                  error: 'Stats not found!',
              });
    } else {
        res.status(400).send({
            error: 'userId not valid!',
            status: 1,
        });
    }
});

module.exports = router;
