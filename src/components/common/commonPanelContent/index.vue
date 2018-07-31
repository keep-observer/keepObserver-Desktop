<template>
	<div class="component-panel-content">
		<!-- 数据展示面板组件 -->
		<div class="component-header">
			<span class="title">{{panelDate.title}}</span>
			<common-time-picker @changeTime="changeTime"></common-time-picker> &nbsp;&nbsp;
			<el-button size="mini" type="success" @click="panelDate.buttonOption">{{panelDate.buttonText}}</el-button>
		</div>
		<div class="component-content">
			<slot></slot>
		</div>
		
	</div>
</template>


<script>

import commonTimePicker from '@/components/common/commonTimePicker'

export default{
	name:'commonPanelContent',
	data(){
		return{
		}
	},
	props:['panelDate'],
	components:{
		commonTimePicker
	},
	methods:{
		changeTime(timeValue){
			var self = this;
			self.$parent.changeTime(timeValue,self.panelDate.id);
		}
	}
}
</script>
<style lang="scss">
	@import './index.scss'
</style>