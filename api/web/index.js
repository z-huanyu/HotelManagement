module.exports = app => {
    const express = require('express')
    const mongoose = require('mongoose')
    const Room = require('./../../model/Room')
    const Order = require('./../../model/Order')
    const WebUser = require('./../../model/WebUser')
    const Comment = require('./../../model/Comment')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })
    //获取房间列表
    router.get('/roomlist', async (req, res) => {
        const model = await Room.find(req.query).populate('comment')//query是前端传参
        res.send(model)
    })
    //筛选房间列表
    router.post('/roomlist', async (req, res) => {
        const model = await Room.find(req.body)
        res.send(model)
    })
    //用户提交订单
    const authMiddleware = require('../../middleware/auth')//登录验证中间件,检测用户是否在登录情况下下单
    router.post('/roomorder',authMiddleware(), async (req, res) => {
        const model = await Order.create(req.body)
        res.send(model)
    })
    //给房间新增评论数据
    // router.post('/addroomcommnet',authMiddleware(), async (req, res) => {
    //     const model = await Room.findByIdAndUpdate(req.body)
    //     res.send(req.body)
    // })
    //获取用户订单
    router.post('/userorder',authMiddleware(), async (req, res) => {
        const model = await Order.find(req.body).populate('room')//根据id关联查询room
        res.send(model)
    })
    //发起用户订单退房请求
    router.put('/checkout/:id', authMiddleware(), async (req, res) => {
        const model = await Order.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //发起用户订单换房请求
    router.put('/changeroom/:id', authMiddleware(), async (req, res) => {
        const model = await Order.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //用户发表评论
    router.post('/comment', authMiddleware(), async (req, res) => {
        const model = await Comment.create(req.body)
        //给房间添加评论信息
        const backMessage = await Room.findById(req.body.room)
        let comments = backMessage.comment
        comments.push(model._id)
        const endResult = await Room.findByIdAndUpdate(req.body.room,{comment:comments})
        res.send(endResult)
    })
    //根据id查询要评价的房间信息/订单信息
    router.get('/getcommentroom/:id', authMiddleware(), async (req, res) => {
        const model = await Order.findById(req.params.id).populate('room')
        res.send(model)
    })
    //获取评论列表
    router.post('/getcommentlist', async (req, res) => {
        const model = await Comment.find(req.body) 
        res.send(model)
    })
    //获取订单列表
    router.get('/orderlist', async (req, res) => {
        const model = await Order.find().populate('room')
        res.send(model)
    })
    //获取指定房间信息
    router.get('/roomdetails/:id', async (req, res) => {
        const model = await Room.findById(req.params.id).populate('comment')
        res.send(model)
    })
    //用户注册
    router.post('/register', async (req, res) => {
        const model = await WebUser.create(req.body)
        res.send(model)
    })
    //为每个接口添加中间键
    app.use('/api/web', router)
    //错误处理函数，捕获错误信息并统一返回给客户端

    //登录
    app.post('/api/web/login', async (req, res) => {
        //验证用户名和密码
        const { username, password } = req.body
        const db_username = await WebUser.findOne({ username }).select('password')
        assert(db_username, 432, '用户名不存在！')
        const isvalid = require('bcryptjs').compareSync(password, db_username.password)
        assert(isvalid, 432, '密码错误!')
        //返回token
        const token = jwt.sign({ id: db_username._id }, app.get('secret'))//sgin(负载，密钥)
        res.send(token)
    })
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}