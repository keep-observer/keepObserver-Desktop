<template>
	<div class="common-trend-chart">

		<!-- 趋势图共用组件 -->
		<div class="line-char-container" :id="elId"></div>

	</div>
</template>


<script>

import Highcharts from 'highcharts/highstock';

export default{
	name:'commonTrendChart',
	data(){
		return{
			// highcharts: null,
		}
	},
	// elId -- 展示的元素ID
	//xAxis -- X轴展示数据
	//listDate -- 展示数据数组，每一项的对象为：
	//  name: 项目名称
	//  data: data数组，展示的数据数组
	props: ['elId','xAxis','listDate'],

	components:{

	},
	mounted(){
		this.initHighcharts();
		// console.log(this.xAxis)
		// console.log(this.listDate)
	},
	methods:{
		//初始化height对象
		initHighcharts(){
			var self = this;
			var highcharts = {
		        chart: {
		            renderTo: self.elId,
		            type: 'line',
		        },
		        title: {
		            text: ''
		        },
		        yAxis: {
		            title: {
		                text: ''
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },

		        xAxis: {
		            categories: self.xAxis,
		        },

		        series: self.listDate
		    };
		    
		    Highcharts.chart(highcharts);
		}
	}
}
</script>
<style lang="scss">
	@import './index.scss'
</style>