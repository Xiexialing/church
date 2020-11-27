import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/system',
    component: Layout,
    menuName: '权限管理',
    children: [
      {
        path: "/system/user",
        component: (resolve) => require(['@/views/system/user'], resolve),
        meta: {title: "用户管理", icon: "user", noCache: false},
        menuName: "用户管理",
      },
      {
        component: (resolve) => require(['@/views/system/role/index'], resolve),
        meta: {title: "角色管理", icon: "peoples", noCache: false},
        menuName: "角色管理",
        path: "/system/role",
      },
      {
        component: (resolve) => require(['@/views/system/menu/index'], resolve),
        meta: {title: "菜单管理", icon: "tree-table", noCache: false},
        menuName: "菜单管理",
        path: "/system/menu",
      }
    ]
  },
  {
    path: '/church',
    component: Layout,
    menuName: '教堂管理',
    children: [
      {
        path: "/church/party",
        component: (resolve) => require(['@/views/church/party'], resolve),
        meta: {title: "聚会管理", icon: "user", noCache: false},
        menuName: "聚会管理",
      },
      {
        path: "/church/christian",
        component: (resolve) => require(['@/views/church/christian'], resolve),
        meta: {title: "信徒管理", icon: "peoples", noCache: false},
        menuName: "信徒管理",
      }
    ]
  },

  {
    path: '/login',
    menuName: '2222',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '*',
    redirect: '/church/christian',
    hidden: true
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
