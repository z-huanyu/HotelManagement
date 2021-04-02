module.exports = app => {
    const express = require('express')
    const mongoose = require('mongoose')
    const Room = require('./../../model/Room')
    const Category = require('./../../model/Category')
    const Floor = require('./../../model/Floor')
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
        const model = await Room.find(req.query).populate('floorID commentID typeID')//query是前端传参
        res.send(model)
    })
    //获取房间类型列表
    router.get('/roomtype', async (req, res) => {
        const model = await Category.find()
       
        res.send(model)
    })
    //获取房间楼层列表
    router.get('/roomfloor', async (req, res) => {
        const model = await Floor.find()
        res.send(model)
    })
    //筛选房间列表
    router.post('/roomlist', async (req, res) => {
        const model = await Room.find({
            $or: [
                { typeID: { $in: req.body.typeID } },
                { floorID: { $in: req.body.floorID } },
                { name: { $in: req.body.name } },
                { number: { $in: req.body.number } },
              ]
        }).populate('floorID commentID typeID')
        res.send(model)
    })
    //筛选房间列表
    router.post('/mainroomlist', async (req, res) => {
        const model = await Room.find({
            $and: [{ name: { $in: req.body.data } }, { switch: 1 }]
        }).populate('floorID commentID typeID')
        res.send(model)
    })
    //用户提交订单
    const authMiddleware = require('../../middleware/auth')//登录验证中间件,检测用户是否在登录情况下下单
    router.post('/roomorder',authMiddleware(), async (req, res) => {
        const model = await Order.create(req.body)
        res.send(model)
    })
    
    //获取用户订单
    router.post('/userorder',authMiddleware(), async (req, res) => {
        const model = await Order.find(req.body).populate('roomID')
        res.send(model)
    })
    //发起用户取消订单请求
    router.put('/checkout/:id', authMiddleware(), async (req, res) => {
        const model = await Order.findByIdAndUpdate(req.params.id, req.body)
        let roomID = model.roomID
        //改变预订的房间状态
        await Room.findByIdAndUpdate(roomID,{status:'空闲'})
        res.send(model)
    })
    //用户订房，改变被预订房间状态=>待入住
    router.put('/changeroomstatus/:id', authMiddleware(), async (req, res) => {
        const model = await Room.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //发起用户订单换房请求
    router.put('/changeroom/:id', authMiddleware(), async (req, res) => {
        const model = await Order.findByIdAndUpdate(req.params.id, req.body.changeData)
        //修改旧房间状态=>空闲
        let oldRoomID = req.body.oldRoomID
        await Room.findByIdAndUpdate(oldRoomID,{
            status:'空闲'
        })
        //修改新房间=>待入住
        await Room.findByIdAndUpdate(req.body.changeData.roomID,{
            status:'待入住'
        })
        res.send(model)
    })
    //付款
    router.put('/paid/:id', authMiddleware(), async (req, res) => {
        const model = await Order.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
     //修改用户信息
     router.put('/changeuserinformation', authMiddleware(), async (req, res) => {
        const model = await WebUser.findByIdAndUpdate(req.body._id, req.body)
        res.send(model)
    })
    //用户发表评论
    router.post('/comment', authMiddleware(), async (req, res) => {
        const model = await Comment.create(req.body)
        //给房间添加评论信息
        const backMessage = await Room.findById(req.body.roomID)
        let comments = backMessage.commentID
        comments.push(model._id)
        const endResult = await Room.findByIdAndUpdate(req.body.roomID,{commentID:comments})
        res.send(endResult)
    })
     //注册会员
     router.post('/addmember', authMiddleware(), async (req, res) => {
        //查询对应用户id
        const id = await WebUser.find({username : req.body.username})
        //新增会员信息
        const endResult = await WebUser.findByIdAndUpdate(id,req.body)
        res.send(endResult)
    })
    //根据id查询要评价的房间信息/订单信息
    router.get('/getcommentroom/:id', authMiddleware(), async (req, res) => {
        const model = await Order.findById(req.params.id)
        res.send(model)
    })
    //获取用户指定订单
    router.get('/getorder/:id', authMiddleware(), async (req, res) => {
        const model = await Order.findById(req.params.id).populate('roomID webUserID')
        res.send(model)
    })
    //获取用户个人信息
    router.post('/getuserinformation', authMiddleware(), async (req, res) => {
        const model = await WebUser.find(req.body)
        res.send(model)
    })
    //获取评论列表
    router.post('/getcommentlist', async (req, res) => {
        const model = await Comment.find(req.body) 
        res.send(model)
    })
    //获取订单列表
    router.get('/orderlist', async (req, res) => {
        const model = await Order.find().populate('roomID')
        res.send(model)
    })
    //获取指定房间信息
    router.get('/roomdetails/:id', async (req, res) => {
        const model = await Room.findById(req.params.id).populate('commentID typeID floorID')
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
        const db_username = await WebUser.findOne({ username })
        assert(db_username, 432, '用户名不存在！')
        const isvalid = require('bcryptjs').compareSync(password, db_username.password)
        assert(isvalid, 432, '密码错误!')
        //返回token
        const token = jwt.sign({ id: db_username._id }, app.get('secret'))//sgin(负载，密钥)
        res.send({ token: token, userInformation: db_username })
    })
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}