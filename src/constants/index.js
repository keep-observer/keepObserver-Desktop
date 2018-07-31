'use strict'
// 定义全局变量，配置请求服务器地址


//接口地址
if(process.env.NODE_ENV === 'production'){
    //正式环境启用 以下配置
    var host = 'http://120.79.123.216:8080/qnche-admin'
}else{
    //测试环境
    var host = 'http://api.pzhwangkai.com'
}





export default {
    //请求地址
    host : host,
}
