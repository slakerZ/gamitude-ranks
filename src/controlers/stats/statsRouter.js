const express = require('express');
const router = express.Router();
const statsList = {
    id: 2,
    strength: 14,
    intelligence: 30,
    linguistics: 4,
    artistry: 10,
};
/* GET stats on URL/stats */
router.get('/', function(req, res) {
    let response = statsList;

    res.send(response);
});

router.post('/', function(req, res) {
    const id = req.body.id;
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
