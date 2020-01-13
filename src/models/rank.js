const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const rankSchema = mongoose.Schema({
    id: ObjectId,
    image: { type: String },
    tier: { type: String },
    name: { type: String },
});

const Rank = mongoose.model('Rank', rankSchema);
module.exports = Rank;
