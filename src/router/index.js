import Vue from 'vue'
import VueRouter from 'vue-router'
import Room from '../views/Room.vue'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import RoomDetail from '../views/RoomDetail.vue'
import UserInformation from '../views/UserInformation.vue'
import MyInformation from '../views/MyInformation.vue'
import MyOrder from '../views/MyOrder.vue'
import Comments from '../views/Comments.vue'
import Member from '../views/Member.vue'
import MyOrderDetial from '../views/MyOrderDetial.vue'

//以下代码解决路由地址重复的报错问题
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/room', name: 'room', component: Room },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/roomdetail/:id', name: 'roomdetail', component: RoomDetail },
  { path: '/comments/:id', name: 'comments', component: Comments },
  { path: '/member', name: 'member', component: Member },
  {
    path: '/userinformation', name: 'userinformation', component: UserInformation,
    children: [
      { path: '/myinformation', name: 'myinformation', component: MyInformation},
      { path: '/myorder', name: 'myorder', component: MyOrder },
      { path: '/myorderdetial/:id', name: 'myorderdetial', component: MyOrderDetial },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
