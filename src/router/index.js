import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)


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
    path: '/create', name: 'post', component: () => import('../views/Post.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditBlog',
    component: () => import('../views/EditBlog.vue')
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

})

export default router