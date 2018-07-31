
export default {
	//初始化筛选项数据
	filterDate:[
		{
			type: 'text',
			label: '手机号码',
			value: '',
			holder: '请输入手机号',
			width: 120
		},
		{
			type: 'select',
			label: '账号状态',
			value: null,
			data:[
				{
		            value: null,
		            label: '全部'
		        },{
		            value: 1,
		            label: '正常'
		        },{
		        	value: 2,
		        	label: '冻结'
		        }
	        ],
			width: 120
		},
		{
			type: 'select',
			label: '认证状态',
			value: null,
			data:[
				{
		            value: null,
		            label: '全部'
		        },{
		            value: 0,
		            label: '未认证'
		        },{
		        	value: 1,
		        	label: '已认证'
		        }
	        ],
			width: 120
		},
		{
			type: 'button',
			data:[
				{
		            value: '查询',
		            type:'primary',
		            event: 'searchList'
		        }
	        ]
		},
	],
	//表头数据
	tableHeader:[
	    {
	        name:'序号',
	        prop:'orderId'
	    },{
	        name:'注册时间',
	        prop:'createTime'
	    },{
	        name:'昵称',
	        prop:'nickname'
	    },{
	        name:'身份认证',
	        prop:'idCard'
	    },{
	        name:'真实姓名',
	        prop:'realname'
	    },{
	        name:'手机号',
	        prop:'username'
	    },{
	        name:'剩余果实',
	        prop:'gtcBanlance'
	    },{
	        name:'账号状态',
	        prop:'status'
	    }
	],
	//表格操作按钮
	buttonList:[
		{
	        eventName:'查看详情',
	        eventMethod:'detail',
	        type: "primary"
	    }
	]
}