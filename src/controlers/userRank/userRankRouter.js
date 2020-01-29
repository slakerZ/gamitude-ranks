const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { rankChange } = require('../../middleware/rankChange');

const UserRank = require('../../models/userRank');

router.get('/:userId', async function(req, res) {
    const userid = req.params.userId;
    const userRank = await UserRank.find({ userId: { $eq: userid } });
    userRank
        ? res.status(200).send({
              userRank: userRank,
          })
        : res.status(404).send({
              error: 'User not found!',
          });
});

module.exports = router;
