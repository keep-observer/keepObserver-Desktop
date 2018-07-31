<template>
	<div class="nav-header">

		<div class="logo-header">
			<img src="../../../../../../images/logo.png" alt="">
			<span>共创森林<br>后台管理系统</span>
		</div>

		<el-menu
			class="el-menu-header"
			mode="horizontal" 
			background-color="#2d303b"
  			active-text-color="#409eff"
			text-color="#fff"
			menu-trigger="click"
		>

			<el-menu-item v-for="(item,index) in menuList" :index="index + ''" :key="index" @click="chooseList(index)">
				<i class="fa fa-lg" :class="'fa-' + item.icoName"></i>
				{{item.name}}
			</el-menu-item>

			<el-submenu class="el-logout" index="3">
				<template slot="title">Hi，KaoLaqi&nbsp;<i class="el-icon-setting"></i></template>
				<el-menu-item @click="logout" index="3-2"><i class="el-icon-information"></i>退出登录</el-menu-item>
			</el-submenu>

		</el-menu>
	

	</div>
</template>
<script>

import { MessageBox,Loading } from 'element-ui';


export default{
	name:'navHeader',
	data(){
		return{
		}
	},
	props: ['menuList'],
	methods:{
		chooseList(index){
			this.$emit('toggleSubmitMenu',index)
		},
		logout(){
			var self = this;
			MessageBox({
                title: '提示',
                type: 'warning',
                showCancelButton: true,
                message: '确定要退出当前登录吗？'
            }).then(() => {
	          	self.$router.push({name: 'login'})
	        }).catch(() => {});
		}
	}
}
</script>
<style lang="scss">
	@import './index.scss'
</style>