<template>
	<div class="nav-layout">			
		<el-menu
			ref="slider"
			:default-active="$route.path" 
			:router="true"
		    background-color="#2d303b"
		    text-color="#fff"
		    active-text-color="#409eff"
			class="el-menu-vertical-demo"
		>
		    <el-submenu v-for="(item,index) in menuList" :index="index+1+''" :key="index">
		    	<template slot="title">
					<i class="fa" :class="'fa-' + item.icoName"></i>
			        <span slot="title">{{item.name}}</span>
			    </template>
	    		<el-menu-item 
	    			ref="page.link"
	    			v-for="(page,id) in item.children" 
	    			:index="page.link.toString()" 
	    			:key="id"
    			>
	    			{{page.name}}
	    		</el-menu-item>
		    </el-submenu>
		</el-menu>	
    </div>	
</template>
<script>
export default{
	name:'navSlider',
	data(){
		return{
		};
	},
	props:['menuList'],
	methods:{
		handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	    },
	},
}
</script>
<style lang="scss">
	@import './slider.scss';
</style>