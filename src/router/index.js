import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import auth from '../store/auth'
import store from '@/store';

Vue.use(VueRouter)

// const authStatus = store.getters['auth/guest'];
const authUser = store.getters['auth/token'];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import('../views/Blog.vue'),
  },
  {
    path: '/create', name: 'post',
    component: () => import('../views/Post.vue'),
    beforeEnter: (to, from, next) => {
      if (authUser == '') {
        alert('Silahkan login dahulu')
        next({ name: 'Home' });
      } else {
        next();
      }
    }
  },
  {
    path: '/edit/:id',
    name: 'EditBlog',
    component: () => import('../views/EditBlog.vue'),
    beforeEnter: (to, from, next) => {
      if (authUser == '') {
        alert('Silahkan login dahulu')
        next({ name: 'Home' });
      } else {
        next();
      }
    }
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  store
})

export default router