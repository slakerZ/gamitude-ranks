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
    res.send(statsList);
});

router.post('/', function(req, res) {
    res.send(req.body);
});

router.put('/:id', function(req, res) {
    let x = req.param('id');
    res.send(x);
});

module.exports = router;
