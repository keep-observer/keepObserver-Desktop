<template>
	<div class="common-wrap-container">

		<div class="common-header">
			<h3>首页统计指标</h3>
			<el-button size="mini" icon="el-icon-refresh" @click="refresh">刷新</el-button>
		</div>

		<div class="common-container index-stat">
			<div class="stat-item" v-for="item in dateList">
				<h2>{{item.title}}</h2>
				<div class="line-content">
					<p class="red tip" v-if="item.date.length === 0">没有统计数据</p>
					<common-line-chart v-if="item.date.length > 0" :elId="item.title" :xAxis="item[item.title]" :listDate="item.date"></common-line-chart>
				</div>
			</div>
		
		</div>

	</div>
</template>
<script>
import moment from "moment";
import { MessageBox,Loading } from 'element-ui';

import commonLineChart from '@/components/common/commonLineChart'

import { commonModel } from '@/http/index.js'
import cacheRequestServices from '@/server/http/cache.js'



export default{
	name:'index',
	data(){
		return{
			dateList:[]//四项统计数据
		}
	},
	components:{
		commonLineChart
	},
	created(){
		this.getStatDate()
	},
	methods:{
		getStatDate(){
			var self = this;
        	var loading = Loading.service({text:'加载中...'});
            commonModel.indexStat().then(function(data){
            	loading.close();
                if(data.code === '00000'){
                	var statList = data.data;

                	for(var key in statList){
				    	var item = {};
				    	item.title = key;
				    	// 统计项目
				    	item[key] = [];//日期数组
				    	item.date = [];//配置对象数组

				    	if(Array.isArray(statList[key]) && statList[key].length > 0){
				    		var firstData = statList[key][0]
				    		for(var objKey in firstData.project){
				    			item.date.push({
				    				name: '',
				    				data:[]
				    			})
				    		}
				    	}
				    	//这个循环生成 [{name:'',date:[]},{name:'',date:[]}]
				    	for(var i = 0, len = statList[key].length; i < len; i++){
				    		item[key].push(statList[key][i].date);					//日期数组添加项
				    		var k = 0;
				    		for(var objKey in statList[key][i].project){
				    			item.date[k].name = objKey;
				    			item.date[k].data.push(statList[key][i].project[objKey]);
				    			k++;
				    		}
				    		
				    	}
				    	self.dateList.push(item)
				    }

                }else{
                    MessageBox({
                        title: '提示',
                        type: 'error',
                        message: data.message || '查询数据失败！',
                        callback: function(){}
                    })
                    return false
                }
            })
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