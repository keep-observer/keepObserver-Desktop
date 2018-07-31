
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


}