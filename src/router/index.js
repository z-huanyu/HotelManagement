import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'main',
    children:
      [
        { path: 'main', name: 'main', component: Main },
        { path: 'room', name: 'room', component: Room },
      ],
  }


]

const router = new VueRouter({
  routes
})

export default router
