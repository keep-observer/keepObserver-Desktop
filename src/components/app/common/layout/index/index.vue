<template>
	<div class="page-container">
		<nav-header :token="token" :menuList="menuList" @toggleSubmitMenu="updateMenu"></nav-header>
		<nav-slider :menuList="secondMenu"></nav-slider>
		<div class="main-container">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>

import navHeader from '../header/index';
import navSlider from '../slider/slider';

import dataStoreServer from '@/server/dataStore/index';


import { MessageBox,Loading } from 'element-ui';

export default{
	name:'layoutIndex',
	data(){
		return{
			token: null,
			menuList:[
				{
					icoName: 'home',
					name: '首页统计',
					idnexPageName: 'index',
					children: [
						{
							icoName: 'address-book-o',
							name: '用户管理',
							children:[
								{
									icoName: '',
									name: '用户列表',
									link: '/userList'
								}
							]
						},
						{
							icoName: 'life-saver',
							name: '运营管理',
							children:[
								{
									icoName: '',
									name: '注入设置',
									link: '/injectSet'
								},
								{
									icoName: '',
									name: '注入日志',
									link: '/injectLog'
								},
								{
									icoName: '',
									name: '内容管理',
									link: ''
								}
							]
						},
					]
				}
			],
			secondMenu: null,
		}
	},
	components:{
		navHeader,
		navSlider
	},
	created(){
		//判断是否登录，没有登录就直接跳转到登录页
		if(!dataStoreServer.getLongData('token')){
			// this.$router.push({name: 'login'})
		}
		this.secondMenu = this.menuList[0].children;
	},
	methods:{
		updateMenu(index){
			this.secondMenu = this.menuList[index].children;
			if(this.menuList[index].idnexPageName){
				this.$router.push({name: this.menuList[index].idnexPageName})
			}
		}
	}
}
</script>
<style lang="scss">
	@import './index.scss';
</style>