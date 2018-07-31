<template>
    <div class="login-page">
        <div class="login-container">
            <img src="../../../../images/login.png" alt="">
            <div class="login-form">
                <h1>在线监控平台服务系统</h1>
                <form name="loginForm" novalidate="novalidate" autocomplete="off">
                    <div class="form-group">
                        <i class="cicon icon-user-login"></i>
                        <div class="form-input">
                            <input type="text" placeholder="请输入登录账号" v-model="userName" maxlength="11" minlength="11" />
                        </div>
                    </div>
                    <div class="form-group">
                        <i class="cicon icon-user-pwd"></i>
                        <div class="form-input">
                            <input type="password" placeholder="请输入密码" v-model="password"/>
                            <!-- <span v-if="!hasSendVcode" @click="getVcode">获取验证码</span> -->
                            <!-- <span class="time" v-if="hasSendVcode">{{time}} 后重新获取验证码</span> -->
                        </div>
                    </div>
                    <button @click="submit">登录</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { MessageBox, Loading } from 'element-ui';

import dataStoreServer from '@/server/dataStore/index';

import { commonModel } from '@/http/index.js'

export default {
    name:'login',
    data(){
        return{
            hasSendVcode: false,
            userName:'',
            password:'',
            time: 60,
        }
    },
    methods:{

        getVcode(){
            var self = this;
            //校验手机号格式
            if(!/^1[\d]{10}$/.test(self.userName)){
                MessageBox({
                    title: '提示',
                    type: 'error',
                    message: '请输入正确的手机号',
                    callback: function(){}
                })
                return false
            }
            //手机格式正确发验证码
            var obj = {
                mobile: self.userName,
                type: 10
            }
            commonModel.getVcode(obj).then(function(data){
                if(data.code === '00000'){
                    self.hasSendVcode = true;
                    var timer = setInterval(function(){
                        self.time--;
                        if(self.time < 0){
                            clearInterval(timer);
                            self.time = 60;
                            self.hasSendVcode = false;
                        }
                    }, 1000);
                }else{
                    MessageBox({
                        title: '提示',
                        type: 'error',
                        message: data.message || '获取验证码失败！',
                        callback: function(){}
                    })
                    return false
                }
            })
        },

        submit(){
            var self = this;
            var obj = {
              userName : self.userName,
              password : self.password
            }
            var loading = Loading.service({text:'加载中...'});
            commonModel.useLogin(obj).then(function(data){
                console.log(data)
                loading.close()
                if(data.code === '00000'){
                    dataStoreServer.setLongData('token',data.data)
                    console.log(data.data)
                    self.$router.push({name:'index'})
                }else{
                    
                    MessageBox({
                        title: '提示',
                        type: 'error',
                        message: data.message || '账号或者密码错误',
                        callback: function(){}
                    })
                    return false
                }
            },function(err){
                console.log(err)
            })
        }
        
    },
    created(){
        dataStoreServer.removeLongData('token')
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import './index.scss'
</style>
