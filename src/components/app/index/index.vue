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
			
		}
	}
}
</script>
<style lang="scss">
	@import './index.scss'
</style>