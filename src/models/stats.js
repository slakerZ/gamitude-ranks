const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const statsSchema = mongoose.Schema({
    id: ObjectId,
    strength: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0 || value > 100) {
                throw new Error('Strength value must be between 0 and 100');
            }
        },
    },
    intelligence: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0 || value > 100) {
                throw new Error('Intelligence value must be between 0 and 100');
            }
        },
    },
    fluency: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0 || value > 100) {
                throw new Error('Fluency value must be between 0 and 100');
            }
        },
    },
    creativity: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0 || value > 100) {
                throw new Error('Creativity value must be between 0 and 100');
            }
        },
    },
});

const Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats;
