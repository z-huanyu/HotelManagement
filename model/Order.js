const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{type:String},
    userID:{type:String},
    phone:{type:String},
    arrivetime:{type: String},
    checkin_date:{type:Array},
    order_time:{type:String},
    remarks:{type:String},//备注
    paid:{type:String},//实付金额
    discountPaid:{type:String},//优惠金额

    roomID:{type:mongoose.SchemaTypes.ObjectId,ref:'Room'},
    webUserID:{type:mongoose.SchemaTypes.ObjectId,ref:'WebUser'},
    status:{type:String},//订单状态



})

module.exports = mongoose.model('Order',schema)