import router from './router'
import store from './store'
import Layout from '@/layout'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

const _import = require('./router/_import_development.js') // 获取组件的方法

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          if (store.getters.menus.length < 1) {
            global.antRouter = []
            next()
          }

          const menus = filterAsyncRouter(store.getters.menus) // 1.过滤路由

          console.log(menus,221133)

          router.addRoutes(menus) // 2.动态添加路由
          console.log(router,1132232)
          global.antRouter = menus // 3.将路由数据传递给全局变量，做侧边栏菜单渲染工作
          next({
            ...to,
            replace: true
          })

        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

//  遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(router => {
    if (router.component) {
      const component = router.component
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
      router.component = _import(component)
      }
    }
    router.hidden = false
    // if (router.hidden) {
    //   // eslint-disable-next-line eqeqeq
    //   if (router.hidden === '1') {
    //     router.hidden = false
    //     // eslint-disable-next-line eqeqeq
    //   } else if (router.hidden === '0') {
    //     router.hidden = true
    //   }
    // }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
  console.log(accessedRouters,555555)
  return accessedRouters
}


