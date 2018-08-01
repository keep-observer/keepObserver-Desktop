
import Vue from 'vue'
import Router from 'vue-router'



import layout from '@/components/app/common/layout/index'

//登录
import login from '@/components/app/common/login'
//首页
import index from '@/components/app/index'

//后台中心
import projectCenter from '@/components/app/projectCenter/route'


Vue.use(Router)

export default new Router({
  routes: [
    {
        path:'/',
        redirect:'/index'
    },{
        path:'/login',
        name:'login',
        component:login,
        meta:{
            title:'登录'
        }
    },{ 
        path:'/',
        component:layout,
        children:[
            {
                path:'/index',
                name:'index',
                component: index,
                meta:{
                    title:'首页'
                }
            },
            ...projectCenter,
            // ...userManage,
            // ...billManage,
            // ...systemManage,
            // ...watchCenterManger,
        ]
    }
  ]/**/
})