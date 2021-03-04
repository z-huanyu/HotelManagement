module.exports = app => {
    const express = require('express')
    const User = require('../../model/User')
    const Room = require('../../model/Room')
    const Order = require('../../model/Order')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        mergeParams: true,
        useFindAndModify:true
    })


    //=======================================================================================================通用接口

    //添加资源接口
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //查询资源列表接口
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Order') {//modelName大写M获取不了
            queryOptions.populate = 'room'
        }
        const model = await req.Model.find().setOptions(queryOptions)
        res.send(model)
    })
    //查询指定资源接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //删除资源接口
    router.delete('/:id', async (req, res) => {

        const model = await req.Model.findByIdAndDelete(req.params.id)//params对象存储着url中的参数
        // console.log(req.params)
        res.send({ success: true })//不给客户端放回数据会使客户端页面无法弹窗提示状态
    })
    // //修改资源接口
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //==================================================================================================通用接口

    //为每个通用接口添加中间键
    app.use('/api/admin/rest/:resource', async (req, res, next) => {
        const ModelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../model/${ModelName}`)
        next()
    }, router)


    //登录
    app.post('/api/admin/login', async (req, res) => {
        //验证用户名和密码
        const { username, password } = req.body
        const db_username = await User.findOne({ username }).select('password')
        assert(db_username, 432, '用户名不存在！')
        const isvalid = require('bcryptjs').compareSync(password, db_username.password)
        assert(isvalid, 432, '密码错误!')
        //返回token
        const token = jwt.sign({ id: db_username._id }, 'csadewyudaisd')//sgin(负载，密钥)
        res.send(token)
    })
    //上传文件接口
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })//dest是存储上传文件的位置
    app.post('/api/admin/upload', upload.single('file'), async (req, res) => {//express获取不到上传文件的数据，需要一个中间键multer去处理
        const file = req.file//req.file是upload.single('file')自动挂载file到req上的，前提是有upload.single('file')这段代码，file指客户端上传的文件名，可更改
        file.url = `http://localhost:5300/uploads/${file.filename}`
        res.send(file)
    })

    // 错误处理函数,err,req,res,next的顺序不能乱，否则报错
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}