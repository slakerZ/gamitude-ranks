const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const rankSchema = mongoose.Schema({
    id: ObjectId,
    image: { type: String, required: true },
    tier: { type: String, required: true },
    name: { type: String, required: true },
});

const Rank = mongoose.model('Rank', rankSchema);
module.exports = Rank;
