
<template>
	<div class="timer-picker-box">
	    <el-date-picker
	      v-model="timeValue"
	      type="daterange"
	      align="left"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期"
      	  :picker-options="pickerOptions"
	      @change="changeTime">
	    </el-date-picker>
	</div>
</template>

<script>

import moment from 'moment'

export default{
	name:"timePicker",
	props:['startTime','endTime'],
	data(){
		return {
			timeValue: '',
	        pickerOptions: {
	            shortcuts: [{
	              text: '今天',
	              onClick(picker) {
	                const end = new Date();
              		const start = new Date();
	                picker.$emit('pick', [start, end]);
	              }
	            }, {
	              text: '最近三天',
	              onClick(picker) {
	                const end = new Date();
              		const start = new Date();
	                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
	                picker.$emit('pick', [start, end]);
	              }
	            }, {
	              text: '最近一周',
	              onClick(picker) {
	                const end = new Date();
              		const start = new Date();
	                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	                picker.$emit('pick', [start, end]);
	              }
	            }, {
	              text: '最近一个月',
	              onClick(picker) {
	                const end = new Date();
              		const start = new Date();
	                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	                picker.$emit('pick', [start, end]);
	              }
	            }, {
	              text: '最近三个月',
	              onClick(picker) {
	                const end = new Date();
              		const start = new Date();
	                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
	                picker.$emit('pick', [start, end]);
	              }
	            }]
			}
		}
	},
	created:function(){
		this.timeValue = this.startTime? [new Date(this.startTime),new Date(this.endTime)] : [null,null]
	    this.changeTime()
	},
	methods:{
		changeTime:function(){
			this.$emit('changeTime',this.timeValue);
		}
	}
}
</script>
<style scoped lang="scss">
	@import './index.scss';
</style>