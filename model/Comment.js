const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    comfortable: { type: Number },
    commentDate: { type: String },
    commentUsername: { type: String },
    environment: { type: Number },
    equipment: { type: Number },
    service: { type: Number },
    commentText: { type: String },
    generalComment: { type: Number },
    roomID: { type: mongoose.SchemaTypes.ObjectId, ref: 'Room' },

})

module.exports = mongoose.model('Comment', schema)