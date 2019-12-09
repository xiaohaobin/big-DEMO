import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import demo1 from '@/components/demo1'
import bigChild from '@/components/bigChild'
import routerParam from '@/components/routerParam'
import routerParam2 from '@/components/routerParam2'
import demoChild1 from '@/components/demoChild1'
import demoChild2 from '@/components/demoChild2'
import demoChild3 from '@/components/demoChild3'
import i18 from '@/components/i18'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: demo1,
      beforeEnter:(to, from, next) => {//路由未进入之前的回调函数
        next();//继续执行函数
        console.log("go on function","11213213");
      },
      children:[
        {
          path: 'demochild1',
          name: 'demoChild1',
          component: demoChild1
        },
        {
          path: 'demochild2',
          name: 'demoChild2',
          component: demoChild2
        },
        {
          path: 'demochild3',
          name: 'demoChild3',
          component: demoChild3
        },
      ]
    },
    {
      path: '/bigChild',
      name: 'bigChild',
      component: bigChild,
      beforeEnter:(to, from, next) => {//
        next();//继续执行函数
        console.log("go on bigChild","bigChild");
      }
    },
    {
      path: '/routerParam/:id',
      name: 'routerParam',
      component: routerParam,
      beforeEnter:(to, from, next) => {//
        next();//继续执行函数
        console.log("go on routerParam","routerParam");
      }
    },
    {
      path: '/routerParam2/:id/post/:pid',
      name: 'routerParam2',
      component: routerParam2,
      beforeEnter:(to, from, next) => {//
        next();//继续执行函数
      }
    },
    {
      path: '/i18',
      name: 'i18',
      component: i18,
      beforeEnter:(to, from, next) => {//
        next();//继续执行函数
        console.log("go on i18","i18");
      }
    },
  ]
})
