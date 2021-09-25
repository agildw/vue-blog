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
    component: () => import(/* webpackChunkName: "blogs" */ '../views/Blogs.vue')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blogs" */ '../views/Blog.vue'),
  },
  {
    path: '/post', name: 'post', component: () => import('../views/Post.vue')
  },
  {
    path: '/editblog/:id',
    name: 'EditBlog',
    component: () => import('../views/EditBlog.vue')
  }
  // {
  //   path: '/blog/:id',
  //   props: true,
  //   name: 'Blogid',
  //   component: () => import('../views/Post.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router