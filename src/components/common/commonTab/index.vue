<template>
	<div class="component-tab">
		<!-- 共用tab组件 -->
		<template v-if="tabDate.data && tabDate.data.length > 0">
			<el-tabs :type="tabDate.type || ''" v-model="tabDate.currentName">
				<el-tab-pane v-for="item in tabDate.data" :label="item.label" :name="item.name" :key="item.name">
					<slot :name="item.name"></slot>
				</el-tab-pane>
			</el-tabs>
		</template>
	</div>
</template>


<script>


export default{
	name:'commonTab',
	data(){
		return{
		}
	},
	props:['tabDate']
}
</script>
<style scoped lang="scss">
	@import './index.scss'
</style>