<template>
	<div class="common-wrap-container">

		<div class="common-header">
			<h3>首页统计指标</h3>
			<el-button size="mini" icon="el-icon-refresh" @click="refresh">刷新</el-button>
		</div>




		<div class="common-container">
			<div class="stat-item">
				<h2>log</h2>
				<div class="line-content">
					<common-line-chart></common-line-chart>
				</div>
			</div>
		
		</div>

	</div>
</template>
<script>
import moment from "moment";
import { MessageBox,Loading } from 'element-ui';

import commonLineChart from '@/components/common/commonLineChart'
import commonTable from '@/components/common/commonTable'

// import { userModel } from '@/http/index.js'
import cacheRequestServices from '@/server/http/cache.js'

import configDate from './configDate.js'


export default{
	name:'index',
	data(){
		return{
			...configDate,

			allStateDate:{},
			dateList:[]
		}
	},
	components:{
		commonLineChart
	},
	created(){

	},
	methods:{
		getStatDate(){
			var self = this;
			self.allStateDate = {
		        log : [
		            {
		                date:"2018-04-23",
		                project:"qnz",
		                count: 90,
		            },
		            {
		                date:"2018-04-23",
		                project:"netcar",
		                count: 110,
		            },
		            {
		                date:"2018-04-23",
		                project:"qnche",
		                count: 50,
		            },
		        ],
		        vue : [
		            {
		                date:"2018-04-23",
		                project:"qnz",
		                count: 110,
		            },
		            {
		                date:"2018-04-23",
		                project:"netcar",
		                count: 110,
		            },
		            {
		                date:"2018-04-23",
		                project:"qnche",
		                count: 110,
		            },
		        ],
		        error:[
		            {
		                date:"2018-04-23",
		                project:"qnz",
		                count: 110,
		            },
		            {
		                date:"2018-04-23",
		                project:"netcar",
		                count: 110,
		            },
		            {
		                date:"2018-04-23",
		                project:"qnche",
		                count: 110,
		            },
		        ],
		    }

			fruteArr: [],
			fruteRateList: [{
				name: '果实汇率',
				data: []
			}],


		    for(var key in self.allStateDate){
		    	var item = {};
		    	item.title = key;
		    	// item.date = self.allStateDate[key],
		    	item[key] = [];

		    	item.date = [];

		    	for(var i = 0, len = self.allStateDate[key].length; i < len; i++){
		    		item[key].push(self.allStateDate[key][i].date);
		    		var lineList = {},
		    		lineList.name = lineList.

		    		item[key + 'List'].push(self.allStateDate[key][i].count)
		    	}



		    }
		}


	}
}
</script>
<style lang="scss">
	@import './index.scss'
</style>