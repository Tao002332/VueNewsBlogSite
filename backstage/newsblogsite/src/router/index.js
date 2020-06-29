import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/userModel',
    component: Layout,
    redirect: '/userModel',
    name: 'user',
    meta: { title: '用户模块', icon: 'example' },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/table/admin'),
        meta: { title: '管理员管理', icon: 'table' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/table/user'),
        meta: { title: '用户管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/baseModel',
    component: Layout,
    redirect: '/baseModel',
    name: 'friend',
    meta: { title: '基础模块', icon: 'example' },
    children: [
      {
        path: 'city',
        name: 'City',
        component: () => import('@/views/table/city'),
        meta: { title: '城市管理', icon: 'table' }
      },
      {
        path: 'label',
        name: 'Label',
        component: () => import('@/views/table/label'),
        meta: { title: '标签管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/newsModel',
    component: Layout,
    redirect: '/newsModel',
    name: 'news',
    meta: { title: '新闻模块', icon: 'example' },
    children: [
      {
        path: 'news',
        name: 'News',
        component: () => import('@/views/table/news'),
        meta: { title: '新闻管理', icon: 'table' }
      },
      {
        path: 'share',
        name: 'Share',
        component: () => import('@/views/table/share'),
        meta: { title: '分享管理', icon: 'table' }
      },
      {
        path: 'channel',
        name: 'Channel',
        component: () => import('@/views/table/channel'),
        meta: { title: '频道管理', icon: 'table' }
      },
      {
        path: 'column',
        name: 'Column',
        component: () => import('@/views/table/column'),
        meta: { title: '专栏管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/gatheringModel',
    component: Layout,
    redirect: '/gatheringModel',
    name: 'gathering',
    meta: { title: '活动模块', icon: 'example' },
    children: [
      {
        path: 'gathering',
        name: 'Gathering',
        component: () => import('@/views/table/gathering'),
        meta: { title: '活动管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/commentModel',
    component: Layout,
    redirect: '/commentModel',
    name: 'comment',
    meta: { title: '评论模块', icon: 'example' },
    children: [
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/table/comment'),
        meta: { title: '评论管理', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
