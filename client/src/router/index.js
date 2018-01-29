import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pc/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      component: resolve => require(['@/webapp/pages/LogReg.vue'], resolve),
      children:[
        {
          path:'/',
          component: resolve => require(['@/webapp/components/Login.vue'], resolve)
        },
        {
          path:'/regist',
          component: resolve => require(['@/webapp/components/Regist.vue'], resolve)
        }
      ]
    },
    {
      path: '/daily',
      component: resolve => require(['@/webapp/pages/Daily.vue'], resolve),
      children:[
        {
          path:'/',
          component: resolve => require(['@/webapp/components/Daily1.vue'], resolve)
        },
        {
          path:'/daily2',
          component: resolve => require(['@/webapp/components/Daily2.vue'], resolve)
        },
        {
          path:'/daily3',
          component: resolve => require(['@/webapp/components/Daily3.vue'], resolve)
        },
      ]
    },
  ]
})
