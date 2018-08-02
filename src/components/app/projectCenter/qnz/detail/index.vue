<template>
	<div class="common-wrap-container">

		<div class="common-header">
			<h3>日志详情</h3>
		</div>

		<div class="common-container" v-if="detail">
				<p class="label">
					日志类型:
					<span>{{filterType(detail.type)}}</span>
				</p>
				<p class="label">
					上报位置:
					<span>{{detail.localtion}}</span>
				</p>
				<p class="label">
					上报时间 :
					<span>{{filterDate(detail.reportTime)}}</span>
				</p>
				<div class="content">
					<p class="title">上报内容:</p>
					<div class="text">
						{{detail.message}}
					</div>
				</div>
		</div>

	</div>
</template>
<script>
import moment from "moment";
import { MessageBox,Loading } from 'element-ui';

import { commonModel } from '@/http/index.js'


export default{
	name:'qnzDetail',
	data(){
		return{
			detail:false,
		}
	},
	methods:{
		filterDate(date){
			return moment(date).format('YYYY-MM-DD hh:mm:ss')
		},
		filterType(type){
			switch(type){
				case 1:
					return 'log'
				case 2:
					return 'network'
				case 3:
					return 'system'
				case 4:
					return 'vue'
				default:
					return 'nokown'
			}
		}
	},
	mounted(){
		var self = this;
		var loading = Loading.service({text:'加载中...'});
		commonModel.getQnzDetail({
			type:parseInt(self.$route.params.type),
			id:self.$route.params.id,
		}).then(function(data){
			loading.close();
	        if(data.code === '00000'){
                self.detail = data.data;
            }else{
                MessageBox({
                    title: '错误提示',
                    type: 'error',
                    message: data.message || '请求失败！',
                    callback: function(){}
                })
                return false
            }		})
	},
}
</script>
<style lang="scss">
	@import './index.scss'
</style>