
import axios from 'axios';
import qs from 'qs';

import constants from '../../constants/index';
import dataStoreServer from '@/server/dataStore/index';

export default function request(config,callback){

    return new Promise(function(resolve,reject){
        
        //发送配置
        var requestConfig = {
            method:config.method,
            url:config.url,
            baseURL: constants.host,
            // withCredentials: true,
            timeout:30000,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            },
        }


        if(dataStoreServer.getLongData('token')){
            requestConfig.headers.authorization = dataStoreServer.getLongData('token').token
        }


        if(config.method.toUpperCase() === 'GET' && config.data){
            requestConfig.params = config.data
        }else if(config.data){
            requestConfig.data = config.data
        }
        
        console.log(requestConfig)
        // return;


        axios(requestConfig).then(function(res){
            //登录失效，重新登录
            if(res.status === 403 || res.status === 302){
                dataStoreServer.removeLongData('token');
                location.hash = '#/login'
            }
            if(res.data.returnCode === 401){
                tokenServer.removeToken();
                res.data = {
                    code:'99999',
                    message:'授权身份已过期,请关闭重试',
                }
            }
            //返回数据
            if(callback){
                //回调函数处理请求的数据后再返回
                resolve(callback(res.data));
            }else{
                resolve(res.data);
            }
        }).catch(function(err){
            reject(err);
        });
            
        
    })
}
















