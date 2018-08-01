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
						<li class="active">log</li>
						<li @click="">network</li>
						<li @click="">system</li>
						<li @click="">vue</li>
					</ul>
				</div>
					
				<div class="tab-comtent">
					<p class="choose-time">
						<common-time-picker @changeTime="changeTime"></common-time-picker>&nbsp;&nbsp;
						<el-button type="primary">查询</el-button>
					</p>
					
					<commonTable 
						:tableHeader="logDateTableHeader"
						:tableContent="logDateTableList"
						:pageSizeChange="pageSizeChange"
						:currentChange="currentChange">
					</commonTable>
						<!-- :buttonList="buttonList"
						@detailRow="detailRow" -->
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



			// logDateTableList:{data:[]},
			startTime: '',
			endTime: '',
			type: 1,

			//果实生成记录表格配置
			logDateTableHeader:[
			    {
			        name:'序号',
			        prop:'orderId',
			        width: 80
			    },{
			        name:'ID',
			        prop:'id'
			    },{
			        name:'上报时间',
			        prop:'reportTime'
			    },{
			        name:'上报错误内容',
			        prop:'message'
			    },{
			        name:'页面位置',
			        prop:'localtion'
			    },{
			        name:'自定义参数',
			        prop:'customeInfo'
			    }
			],
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
		this.initParmas();
		this.initSearchList()
	},
	methods:{
		//根据缓存值初始化塞筛选字段的值
		initParmas(){
			var self = this;
        	var params = cacheRequestServices.getParams(commonModel.getQnzList);
	        if(params){
	            self.startTime = typeof params.startTime !== 'undefined'? params.startTime: self.startTime;
	            self.endTime = typeof params.endTime !== 'undefined'?  params.endTime : self.endTime;
	            self.type = typeof params.type !== 'undefined'?  params.type : self.type;
	            
	            self.logDateTableList.pageNo = typeof params.page!=='undefined'? params.page : self.logDateTableList.pageNo ;
	            self.logDateTableList.pageSize = typeof params.pageSize!=='undefined'? params.pageSize : self.logDateTableList.pageSize ;
	        }
		},

		//初始化请求身份审核列表
		initSearchList(){
			var self = this;
			var params = {
				type: self.type,
				pageNo: self.logDateTableList.pageNo || 10
			}
			cacheRequestServices.initRouteRequest(commonModel.getQnzList,function(data){
				self.logDateTableList = data.data;
			},params);
		},

		//查询列表
		searchList(){
			var self = this;
			var obj = {
				page: self.logDateTableList.pageNo,
				pageSize: self.logDateTableList.pageSize,
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
			cacheRequestServices.request(commonModel.getQnzList,obj,function(data){
				loading.close();
	            if(data.pageCount && data.pageCount < self.logDateTableList.pageNo){
	                self.logDateTableList.pageNo = 1;
	                self.searchList();
	            }else{
	                self.logDateTableList = data
	            } 
	        });
		},


		pageSizeChange(){

		},

		currentChange(){

		},
		//选择时间
		changeTime(timeValue,id){
			var self = this;
			var strat = moment(timeValue[0]).format("YYYY-MM-DD");
			var end = moment(timeValue[1]).format("YYYY-MM-DD");
			if(id === 1){
				self.fruteStartDay = strat;
				self.fruteEndDay = end
			}else{
				self.growthStartDay = strat;
				self.growthEndDay = end
			}
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