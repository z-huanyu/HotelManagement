import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RoomList from '../views/RoomList.vue'
import RoomEdit from '../views/RoomEdit.vue'
import Login from '../views/Login.vue'
<<<<<<< HEAD
import WebUser from '../views/WebUser.vue'
import Role from '../views/Role.vue'
import UserOrder from '../views/UserOrder.vue'
import AddRoomTypeFloor from '../views/AddRoomTypeFloor.vue'
import CommentList from '../views/CommentList.vue'
import Statistics from '../views/Statistics.vue'
=======
import User from '../views/User.vue'
import WebUser from '../views/WebUser.vue'
import UserOrder from '../views/UserOrder.vue'
import Comment from '../views/Comment.vue'
import Statistics from '../views/Statistics.vue'
import AddRoomType from '../views/AddRoomType.vue'
>>>>>>> master

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '/', redirect:'/order/userorder'},
      { path: '/room/roomedit', component: RoomEdit},
      { path: '/room/roomedit/edit/:id', component: RoomEdit ,props: true},//props接受传值
      { path: '/room/roomlist', component: RoomList },
<<<<<<< HEAD
      { path: '/room/addroomtypefloor', component: AddRoomTypeFloor },
      
      { path: '/user/webuser', component: WebUser },
      { path: '/user/role', component: Role },

      { path: '/order/userorder', component: UserOrder },

      { path: '/comment/commentlist', component: CommentList },

      { path: '/statistics', component: Statistics },
=======
      { path: '/room/addroomtype', component: AddRoomType },
      
      { path: '/user/useredit', component: User },
      { path: '/user/webUser', component: WebUser },

      { path: '/order/userorder', component: UserOrder },

      { path: '/comment/commentlist', component: Comment },

      { path: '/statistics/statisticstable', component: Statistics },
      
>>>>>>> master
    ]
    
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path === '/login') return next()

  if(!sessionStorage.token) return next('/login')
  next()
})


export default router
