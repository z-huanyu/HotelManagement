const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{type:String},
    userID:{type:String},
    phone:{type:String},
    arrivetime:{type: String},
    checkin_date:{type:Array},
    order_time:{type:String},
    remarks:{type:String},

    room:{type:mongoose.SchemaTypes.ObjectId,ref:'Room'},
    webUser:{type:String},
    status:{type:String},



})

module.exports = mongoose.model('Order',schema)