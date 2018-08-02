<template>
	<div class="common-wrap-container">

		<div class="common-header">
			<h3>全能赚在线统计</h3>
			<el-button size="mini" icon="el-icon-refresh" @click="refresh">刷新</el-button>
		</div>

		<div class="common-container index-stat">
			<div class="common-toggle-tab">
				<div class="tab-header">
					<ul>
						<li :class="{active:type ===1}" @click="tabChange(1)">log</li>
						<li :class="{active:type ===2}" @click="tabChange(2)">network</li>
						<li :class="{active:type ===3}" @click="tabChange(3)">system</li>
						<li :class="{active:type ===4}" @click="tabChange(4)">vue</li>
					</ul>
				</div>
					
				<div class="tab-comtent">
					<p class="choose-time">
						<common-time-picker 
							:startTime="startTime"
							:endTime="endTime"
							@changeTime="changeTime"
						>		
						</common-time-picker>&nbsp;&nbsp;
						<el-button type="primary">查询</el-button>
					</p>
					
					<commonTable 
						:tableHeader="logDateTableHeader"
						:tableContent="logDateTableList"
						:pageSizeChange="pageSizeChange"
						:currentChange="currentChange"
						:getFormat="getFormat"
						:buttonList="buttonList"
						@detailRow="detailRow" >
					</commonTable>

				</div>
			</div>

		</div>

	</div>
</template>
<script>
import moment from "moment";
import { MessageBox,Loading } from 'element-ui';

import commonTab from '@/components/common/commonTab'
import commonTable from '@/components/common/commonTable'
import commonTimePicker from '@/components/common/commonTimePicker'
import commonLineChart from '@/components/common/commonLineChart'

import { commonModel } from '@/http/index.js'
import cacheRequestServices from '@/server/http/cache.js'



export default{
	name:'qnz',
	data(){
		return{
			startTime: '',
			endTime: '',
			type: 1,
			//记录表格配置
			logDateTableHeader:[
				{
			        name:'序号',
			    },
			    {
			        name:'上报时间',
			        prop:'reportTime'
			    },{
			        name:'上报内容',
			        prop:'message',
			        height:150,
			    },{
			        name:'页面位置',
			        prop:'localtion'
			    },{
			        name:'自定义参数',
			        prop:'customeInfo',
			        height:150,
			    }
			],
			buttonList:[{eventName:'查看详情',eventMethod:'detail'}],
			logDateTableList: {data:[]},
		}
	},
	components:{
		commonTab,
		commonTable,
		commonTimePicker,
		commonLineChart,
	},
	created(){
		this.startTime = moment().subtract(7, 'days').valueOf();
		this.endTime = moment().valueOf();
		this.initParmas();
		this.initSearchList();
	},
	methods:{
		//根据缓存值初始化塞筛选字段的值
		initParmas(){
			var self = this;
        	var params = cacheRequestServices.getParams(commonModel.getQnzList);
	        if(params){
	            self.type = typeof params.type !== 'undefined'?  params.type : self.type;
	            self.logDateTableList.pageNo = typeof params.page!=='undefined'? params.page : 1 ;
	            self.logDateTableList.pageSize = typeof params.pageSize!=='undefined'? params.pageSize : 15 ;
	        }
		},

		//初始化请求身份审核列表
		initSearchList(){
			var self = this;
			var params = {
				type: self.type,
				pageNo: self.logDateTableList.pageNo || 1,
				pageSize: self.logDateTableList.pageSize || 15,
				startTime:null,
				endTime:null,
			}
			cacheRequestServices.initRouteRequest(commonModel.getQnzList,function(data){
				self.logDateTableList.data = data.data.list
				self.logDateTableList.pageNo = data.data.pageNo
				self.logDateTableList.pageSize = data.data.pageSize
				self.logDateTableList.totalCount = data.data.total
			},params);
		},

		//查询列表
		searchList(){
			var self = this;
			var obj = {
				type:self.type,
				pageNo: self.logDateTableList.pageNo,
				pageSize: self.logDateTableList.pageSize,
			}

			if(self.startTime !== null && typeof self.startTime === 'number'){
				obj.startTime = self.startTime;
			}

			if(self.endTime !== null && typeof self.startTime === 'number'){
				obj.endTime = self.endTime;
			}


        	var loading = Loading.service({text:'加载中...'});
			cacheRequestServices.request(commonModel.getQnzList,obj,function(data){
				loading.close();
	            if(data.pageCount && data.pageCount < self.logDateTableList.pageNo){
	                self.logDateTableList.pageNo = 1;
	                self.searchList();
	            }else{
	                self.logDateTableList.data = data.list
					self.logDateTableList.pageNo = data.pageNo
					self.logDateTableList.pageSize = data.pageSize
					self.logDateTableList.totalCount = data.total
	            } 
	        });
		},


		detailRow(item){
			this.$router.push({name:'qnzDetail',params:{
				type:this.type,
				id:item.id
			}})
		},


		pageSizeChange(val){
			this.logDateTableList.pageSize = val;
			this.searchList();
		},


		currentChange(val){
			this.logDateTableList.pageNo = val;
			this.searchList();
		},


		getFormat(row, column, cellValue, index){
			var self = this;
			var value = row[column.property];
			index = index? index: 0;
			switch(column.label){
				case '序号':
					return (self.logDateTableList.pageNo - 1) * self.logDateTableList.pageSize+index+1;
				break;
				case '上报时间':
					return moment(value).format("YYYY-MM-DD HH:mm:ss")
				break;
				default:return value
			}
		},
		

		//table改变
		tabChange(type){
			var self = this;
			if(self.type === type){
				return false;
			}
			self.type = type;
			self.searchList();
		},


		//选择时间
		changeTime(timeValue,id){
			var self = this;
			var strat = timeValue[0].getTime();
			var end = timeValue[1].getTime();
		 	self.startTime = strat
            self.endTime = end 
            self.searchList();
		},
		

		//页面刷新
		refresh(){
			location.reload()
		},


	}
}
</script>
<style lang="scss">
	@import './index.scss'
</style>