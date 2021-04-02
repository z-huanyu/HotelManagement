const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    level:{type:String},
    switch:{type:String},

    editer:{type:String},//编辑者
})

module.exports = mongoose.model('User', schema)