const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    roomType: { type: String },
})

module.exports = mongoose.model('Category', schema)