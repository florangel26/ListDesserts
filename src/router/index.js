import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { currentUserPromise } from "../firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
    
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      auth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name:'register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( async(to, from, next) => {

  const requireAuth = to.meta.auth;
  const user = await currentUserPromise();
 

  if (requireAuth) {
      if (user) {
          
          next();
      } else {
        
          next("/login");
      }
  } else {
     
      next();
  }
});;

export default router
