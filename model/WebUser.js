const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String},
    password: {
        type: String,
        set(val){//存储进数据库前加密密码
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    
    Level: { type: String },//等级
    LevelName: { type: String },//等级名称
    LevelDiscount: { type: String },//折扣
    prices: { type: String },//购买当前会员的价格
    userID: { type: String },//身份证
    phone: { type: String },
    switch: { type: Boolean },//是否启用会员身份

    editer:{type:String},//修改者
})

module.exports = mongoose.model('WebUser',schema)