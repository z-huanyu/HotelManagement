module.exports = app =>{
    const express = require('express')
    const mongoose = require('mongoose')
    const Room = require('./../../model/Room')
    const Order = require('./../../model/Order')
    const router = express.Router({
        mergeParams: true
    })
    //获取房间列表
    router.get('/roomlist',async(req,res)=>{
        const model = await Room.find()
        res.send(model)
    })
    //用户提交订单
    router.post('/roomorder',async(req,res)=>{
        const model = await Order.create(req.body)
        res.send(model)
    })
    //获取订单列表
    router.get('/orderlist',async(req,res)=>{
        const model = await Order.find().populate('room')
        res.send(model)
    })

    //为每个接口添加中间键
    app.use('/api/web',router)
    //错误处理函数，捕获错误信息并统一返回给客户端
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}