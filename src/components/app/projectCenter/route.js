
import qnz from '@/components/app/projectCenter/qnz/list/index'
import qnzDetail from'@/components/app/projectCenter/qnz/detail/index'




export default [
    {
        path:'/qnz',
        name:'qnz',
        component: qnz,
        meta:{
            title:'全能赚项目监控数据'
        }
    },

    {
        path:'/qnzDetail/:type/:id',
        name:'qnzDetail',
        component: qnzDetail,
        meta:{
            title:'全能赚项目监控数据'
        }
    },
]
