const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},//房间名称
    number: { type: String },//房间号
    typeID: {type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
    prices: { type: String },
    breakfast: { type: String },
    cover: { type: String },//主图

    internet: { type: String },
    bedsize: { type: String },
    roomsize: { type: String },
    floorID:{type:mongoose.SchemaTypes.ObjectId,ref:'Floor'},
    window: { type: String },
    people: { type: String },
    switch: { type: String },//房间开放/冻结
    status: { type: String },
    img1:{type:String},
    img2:{type:String},
    img3:{type:String},
    commentID:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}]
})

module.exports = mongoose.model('Room', schema)
