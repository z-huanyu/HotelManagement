const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    number: { type: String },
    type: { type: String },
    prices: { type: String },
    type: { type: String },
    breakfast: { type: String },
    cover: { type: String },

    internet: { type: String },
    bedsize: { type: String },
    roomsize: { type: String },
    floor: { type: String },
    window: { type: String },
    people: { type: String },
    switch: { type: String },
    status: { type: String },
    img1:{type:String},
    img2:{type:String},
    img3:{type:String},
})

module.exports = mongoose.model('Room', schema)
