const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    gameNumber: {
        type: Number,
        required: false
    },
    winner: {
        type: String,
        required: false
    },
    moves: [{
        row: {
            type: Number,
            required: false
        },
        column: {
            type: Number,
            required: false
        }
    }]
})

module.exports = mongoose.model('Game', gameSchema)
