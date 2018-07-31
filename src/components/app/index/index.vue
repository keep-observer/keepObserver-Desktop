<template>
	<div class="common-wrap-container">

		<div class="common-header">
			<h3>首页内容</h3>
			<el-button size="mini" icon="el-icon-refresh" @click="refresh">刷新</el-button>
		</div>




		<div class="common-container">
			首页页面内容
		
			<!-- <headerFilter 
				:filterDate="filterDate"
				@searchList="searchList">
			</headerFilter>
		
			<commonTable 
				:tableHeader="tableHeader"
				:tableContent="userList"
				:buttonList="buttonList"
				:pageSizeChange="pageSizeChange"
				:currentChange="currentChange">
			</commonTable> -->
		
		</div>

	</div>
</template>
<script>
import moment from "moment";
import { MessageBox,Loading } from 'element-ui';

import headerFilter from '@/components/common/filterHeader'
import commonTable from '@/components/common/commonTable'

import { userModel } from '@/http/index.js'
import cacheRequestServices from '@/server/http/cache.js'

import configDate from './configDate.js'


export default{
	name:'index',
	data(){
		return{
			//列表对象 || 数组
			userList: {data:[]},
			...configDate
		}
	},
	components:{
		headerFilter,
		commonTable
	},
	created(){
		// this.initSearchList();
		// this.initParmas()
	},
	methods:{

		//根据缓存值初始化塞筛选字段的值
		initParmas(){
			var self = this;
        	var params = cacheRequestServices.getParams(userModel.getUserList);
	        if(params){
	            self.filterDate[0].value = typeof params.username !== 'undefined'? params.username: self.filterDate[0].value;
	            self.filterDate[1].value = typeof params.status !== 'undefined'?  params.status : self.filterDate[1].value;
	            self.filterDate[2].value = typeof params.isAuthentication !== 'undefined'?  params.isAuthentication : self.filterDate[2].value;
	            
	            self.userList.pageNo = typeof params.page!=='undefined'? params.page : self.userList.pageNo ;
	            self.userList.pageSize = typeof params.pageSize!=='undefined'? params.pageSize : self.userList.pageSize ;
	        }
		},

		//初始化请求身份审核列表
		initSearchList(){
			var self = this;
			cacheRequestServices.initRouteRequest(userModel.getUserList,function(data){
				self.userList = data.data;
			});
		},

		//查询列表
		searchList(){
			var self = this;
			var obj = {
				page: self.userList.pageNo,
				pageSize: self.userList.pageSize,
			}

			if(self.filterDate[0].value){
				obj.username = self.filterDate[0].value.trim();
			}
			if(self.filterDate[1].value !== null && self.filterDate[1].value !== undefined){
				obj.status = self.filterDate[1].value;
			}
			if(self.filterDate[2].value !== null && self.filterDate[2].value !== undefined){
				obj.isAuthentication = self.filterDate[2].value;
			}

        	var loading = Loading.service({text:'加载中...'});
			cacheRequestServices.request(userModel.getUserList,obj,function(data){
				loading.close();
	            if(data.pageCount && data.pageCount < self.userList.pageNo){
	                self.userList.pageNum = 1;
	                self.searchList();
	            }else{
	                self.userList = data
	            } 
	        });
		},

		//展示页数修改函数
		pageSizeChange(val){
			var self = this;
			self.userList.pageSize = val;
			this.searchList();
		},

		//展示页码修改函数
		currentChange(val){
			var self = this;
			self.userList.pageNo = val;
			this.searchList();
		},

		//页面刷新
		refresh(){
			location.reload()
		},

		//查看详情
		detail(){
			console.log(this.userList)
		},

		//格式化数据输出展示
		getFormat:function(row, column, cellValue, index){
			var self = this;
			var value = row[column.property];
			switch(column.label){
				case '序号':
					return (self.userList.pageNo - 1) * self.userList.pageSize + index+1;
				break;
				case '注册时间':
					return moment(value).format("YYYY-mm-DD HH:mm:ss")
				break;
				case '身份认证': case '真实姓名': case '剩余果实':
					return value ? value : '无'
				break;
				case '账号状态':
					return value === 0 ? '未认证' : value === 1 ? '已认证' : '未知状态'
				break;
				default:return value
			}	
		},
		//格式化数据样式
		cellStyle:function(item){
			var value = item.row[item.column.property];
			switch(item.column.label){
				case '账号状态':
					return value === 0 ? {color:'red'} : value === 1 ? {color:'green'} : ''
				break;
				default:return value
			}	
		},

	}
}
</script>
<style lang="scss">
	@import './index.scss'
</style>