const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const userRankSchema = mongoose.Schema({
    id: ObjectId,
    userId: {
        type: String,
        required: true,
    },
    rankId: {
        type: ObjectId,
        ref: 'Rank',
    },
});

const userRank = mongoose.model('UserRank', userRankSchema);
module.exports = userRank;
