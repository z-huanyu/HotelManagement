import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RoomList from '../views/RoomList.vue'
import RoomEdit from '../views/RoomEdit.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import UserList from '../views/UserList.vue'
import UserOrder from '../views/UserOrder.vue'

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
      { path: '/room/roomedit', component: RoomEdit},
      { path: '/room/roomedit/edit/:id', component: RoomEdit ,props: true},
      { path: '/room/roomlist', component: RoomList },
      
      { path: '/user/useredit', component: User },
      { path: '/user/userlist', component: UserList },

      { path: '/order/userorder', component: UserOrder },
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
