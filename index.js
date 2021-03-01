const express = require('express')

const app = express()

app.set('secret','msdaudiwdadaw')//设置token密钥

app.use(require('cors')())//解决跨越请求
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))//托管静态文件，即公开，使客户端能够访问该文件

require('./connect_db/db')(app)//连接数据库
require('./api/admin')(app)
require('./api/web')(app)

app.listen(5300 , ()=>{
    console.log('running at port 5300...')
})
