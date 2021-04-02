const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    roomFloor: { type: String },
})

module.exports = mongoose.model('Floor', schema)