<template>
	<div class="common-table">
		<el-table
			border 
			:data="noPagination?tableContent:tableContent.data"
			stripe
			:style="tableWidth"
			:cellStyle="cellStyle || $parent.cellStyle">
			
			<!-- 表头数据 -->
			<el-table-column 
				v-for="item in tableHeader" 
				:prop="item.prop"
				:key="item.id" 
				:label="item.name"
				:className="item.className"
				:formatter="getFormat || $parent.getFormat"
				:width="item.width"
				align="center"
			>
			</el-table-column>
			
			<!-- 操作按钮 -->
			<el-table-column 
				v-if="buttonArray.length !== 0" 
				label="操作"
				align="center" 
				:width="100*buttonArray.length">
				<template slot-scope="scope">
					<el-button 
						size="mini"
						:type="item.type || 'primary'" 
						:key="item.eventName"							
						@click="click(scope.row,item.eventMethod)"
						v-if="item.showStatus ? scope.row[item.showStatus] === item.showValue : true"
						v-for="item in buttonArray">
						{{item.eventName}}
					</el-button>
				</template>	
			</el-table-column>
		</el-table>

		<!-- 表格组件自带分页信息 -->
		<el-pagination class="pagination" v-if="!noPagination"
	    	@size-change="pageSizeChange"
	    	@current-change="currentChange"
	    	:page-sizes="pageArray"
	    	:page-size="tableContent.pageSize"
	    	layout="total, sizes, prev, pager, next, jumper"
	    	:total="tableContent.totalCount"
	    	:current-page="tableContent.pageNo">
	    </el-pagination>

	</div>
</template>
<script> 


export default{
	name:'commonTable',
	props:[
		'tableHeader',
		'tableContent',
		'buttonList',
		'tableWidth',
		'getFormat',
		'cellStyle',
		'pageSizeChange',
		'currentChange',
		'noPagination'],
	data(){
		return{
			buttonArray:[],
			pageArray:[15]
		}
	},
	mounted(){
		if(!this.buttonList){
			this.buttonArray = []
		}else{
			this.buttonArray = this.buttonList
		}

	},
	methods:{
		click(row,eventMethod){
			switch(eventMethod){
				case 'edit':
					this.editRow(row);
				break;
				case 'delete':
					this.deleteRow(row);
				break;
				case 'detail':
					this.detailRow(row);
				break;
				case 'otherOption':
					this.otherOption(row);
				break;
			}
		},
		editRow:function(row){	
			this.$emit('editRow',row);
		},
		deleteRow:function(row){
			this.$emit('deleteRow',row)
		},
		detailRow:function(row){
			this.$emit('detailRow',row);
		},
		otherOption:function(row){
			this.$emit('otherOption',row);
		}
	},
}
</script>
<style lang="scss">
	@import './index.scss'
</style>

