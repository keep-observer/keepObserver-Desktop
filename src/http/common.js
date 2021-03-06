
import httpRequestServer from '@/server/http/index';



export default {
    
    // 用户登录
    useLogin : function(data){
        return httpRequestServer({
            method: 'POST',
            url: '/admin/auth/login',
            data: data
        })
    },

    
    // 监控日志统计
    indexStat: function(data){
        return httpRequestServer({
            method: 'GET',
            url: '/admin/statistics/all',
            data: data
        })
    },
    
    // 全能赚监控数据列表
    getQnzList: function(data){
        return httpRequestServer({
            method: 'POST',
            url: '/admin/project/qnz',
            data: data
        })
    },

    //全能赚监控数据详情
    getQnzDetail:function(data){
        return httpRequestServer({
            method: 'POST',
            url: '/admin/project/qnz/detail',
            data: data
        })
    }

}