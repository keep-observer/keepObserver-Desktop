
import dataStore from '../dataStore/index.js';

import {MessageBox, Loading } from 'element-ui'

class CacheRequestServer {

    constructor() {
        this.data = dataStore.get('cacheRequestParams')?dataStore.get('cacheRequestParams'):{};
    }

    request(request,params,callback){
        // console.log(params)
        this.data[request.name] = params;

        // var loading = Loading.service({text:'加载中...'});
        request(params).then(function(data){
            // loading.close();
            if(data.code === '00000'){
                callback(data.data);
            }else{
                MessageBox({
                    title: '错误提示',
                    type: 'error',
                    message: data.message || '请求失败！',
                    callback: function(){}
                })
                return false
            }
        },function(err){
            console.log(err)
            MessageBox({
                title: '错误提示',
                type: 'error',
                message: err || '请求错误！',
                callback: function(){}
            })
            return false
        });
        dataStore.set('cacheRequestParams',this.data);
    }

    initRouteRequest(request,callback,params){
        var initParams  = {};

        if(this.data[request.name]){
            initParams=this.data[request.name];
        }

        if(params){
            for (var k in params){
                initParams[k] = params[k]
            }
            this.data[request.name] = initParams;
        }

        dataStore.set('cacheRequestParams',this.data);
        
        var loading = Loading.service({text:'加载中...'});
        return request(initParams).then(function(data){
                loading.close();
                if(data.code === '00000'){
                    callback(data)
                }else{
                    MessageBox({
                        title: '错误提示',
                        type: 'error',
                        message: data.message || '请求失败！',
                        callback: function(){}
                    })
                    return false
                }
            },function(err){
                MessageBox({
                    title: '错误提示',
                    type: 'error',
                    message: err || '请求失败！',
                    callback: function(){}
                })
                return false
            }
        )
    }

    getParams(request){
        return this.data[request.name];
    }
}

export default new CacheRequestServer()


