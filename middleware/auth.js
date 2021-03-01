module.exports = options => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const WebUser = require('../model/WebUser')
  
    return async (req, res, next) => {
      const token = String(req.headers.authoriztion || '').split(' ').pop()
      // console.log(1,req.headers.authoriztion)
      assert(token, 401, '请先登录')
      const { id } = jwt.verify(token, req.app.get('secret'))
      // console.log(2,id)
      assert(id, 401, '请先登录')
      req.user = await WebUser.findById(id)
      // console.log(3,req.user)
      assert(req.user, 401, '请先登录')
      
      await next()
    }
  }