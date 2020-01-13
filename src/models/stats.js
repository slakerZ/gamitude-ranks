const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const statsSchema = mongoose.Schema({
    id: ObjectId,
    strength: { type: Number, required: true, default: 0 },
    intelligence: { type: Number, required: true, default: 0 },
    fluency: { type: Number, required: true, default: 0 },
    creativity: { type: Number, required: true, default: 0 },
});

const Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats;
