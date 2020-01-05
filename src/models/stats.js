const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const statsSchema = mongoose.Schema({
    id: ObjectId,
    strength: { type: Number },
    intelligence: { type: Number },
    linguistics: { type: Number },
    artistry: { type: Number },
});

const Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats;