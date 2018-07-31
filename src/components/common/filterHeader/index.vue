<template>
	<div class="filert-header">
		<!-- 筛选过滤组件 -->
		<template v-for="item in filterDate">

			<!-- 文本框输入类型 -->
			<span v-if="item.type === 'text'" class="item">
				<label>{{item.label}}：</label>
				<el-input 
					type="text" 
					size="mini"
					v-model="item.value" 
					:placeholder="item.holder || ''" 
					:style="{'width': item.width + 'px'}">
				</el-input>
			</span>

			<!-- 数字框输入类型 -->
			<span v-if="item.type === 'number'" class="item">
				<label>{{item.label}}：</label>
				<el-input
					width="200px" 
					type="number" 
					size="mini"
					v-model="item.value" 
					:placeholder="item.holder || ''" 
					:style="{'width': item.width + 'px'}" class="item">
				</el-input>
			</span>

			<!-- 下拉选项框类型 -->
			<span v-if="item.type === 'select'" class="item">
				<label>{{item.label}}：</label>
				<el-select 
					placeholder="请选择" 
					size="mini"
					v-model="item.value" 
					:style="{'width': item.width + 'px'}"
				>
				    <el-option
				      v-for="value in item.data"
				      :key="value.value"
				      :label="value.label"
				      :value="value.value">
				    </el-option>
				</el-select>
			</span>

			<!-- 操作按钮绑定事件列表 -->
			<span v-if="item.type === 'button'" v-for="value in item.data" class="item">
				<el-button
					size="mini"
					:type="value.type"
					@click="click(value.event)"
				  >
				  	{{value.value}}
				</el-button>
			</span>
			

		</template>
	</div>
</template>


<script>

export default{
	name:'filterHeader',
	data(){
		return{
		}
	},
	props: ['filterDate'],
	components:{

	},
	methods:{
		//配置查询的操作按钮，固定事件名称
		click(eventName){
			switch(eventName){
				case 'searchList':
					this.searchList();
				break;
				case 'exportExcel':
					this.exportExcel();
				break;
			}
		},
		searchList:function(){
			this.$emit('searchList');
		},
		exportExcel:function(row){
			this.$emit('exportExcel')
		}
	}
}
</script>
<style lang="scss">
	@import './index.scss'
</style>