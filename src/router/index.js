import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js' // 引入Vuex 集中管理数据
import Layout from '@/views/layout/layout'
import utils from '../utils/utils'
Vue.use(Router)

const router = new Router({
    routes: [
      // 根目录配置
      {
        path: '/',
        redirect: '/login',
      },
      // 登录
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login')
      },
      // 功能配置
      {
        path: '/menu',
        name: 'Menu',
        component: Layout,
        redirect: '/menu/material',
        meta: { title: '编辑发布', icon: 'example' },
        children: [
          {
            path: 'welcome',
            naeme: 'Welcome',
            meta: {
              requireAuth: true
            },
            component: () => import('@/views/welcome/index'),
          },
          // 抓取素材
          {
            path: 'material',
            name: 'MaterialList',
            meta: {
              requireAuth: true
            },
            component: () => import('@/views/material/list'),
          },
          // 咨询
          {
            path: 'consult',
            name: 'Consult',
            meta: {
              requireAuth: true
            },
            component: () => import('@/views/consult/list'),
          },
          // 活动
          {
            path: 'activity',
            name: 'Activity',
            meta: {
              requireAuth: true
            },
            component: () => import('@/views/activity/list'),
          },
          // 资讯详情
          {
            path: 'consultdetails',
            name: 'Consultdetails',
            meta: {
              requireAuth: true
            },
            component: () => import('@/views/consult/details'),
          },
          // 活动详情
          {
            path: 'activitydetails',
            name: 'Activitydetails',
            meta: {
              requireAuth: true
            },
            component: () => import('@/views/activity/details'),
          },
          {
            path: 'usermanage',
            name: 'Usermanage',
            meta: {
              requireAuth: true
            },
            component: () => import('@/views/usemanage/userList'),
          },
          {
            path: 'user/:type',
            name: 'User',
            meta: {
              requireAuth: true
            },
            component: () => import('@/views/usemanage/user'),
          },
        ]
      }
    ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    if(utils.getCookie('isLogin')) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
})

export default router;
