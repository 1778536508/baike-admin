const state = {
	// 菜单数据
	list: {
        dateTime: [
          {
            value: "0",
            label: "创建日期"
          },
          {
            value: "1",
            label: "最终修改日期"
          }
        ],
        selectSource: [
          {
            value: "0",
            label: "全部来源"
          },
          {
            value: "1",
            label: "新华网"
          },
          {
            value: "2",
            label: "人民网"
          }
        ],
        operator:[
            {
                value:"0",
                label: "全部操作人"
            },
            {
                value:"1",
                label: "运营A"
            },
            {
                value:"2",
                label: "运营B"
            }
        ]
    },
    value: {
       search: "", //搜索value
       dateTime: "0", //按照创建日期、者最终修改日期 value
       datePicker: "", //起始日期至终止日期 value
       selectSource: "0", //全部来源
       operator:"0", //操作人
       stype: {  // 排序规则
         ctime: true, // 按创建时间排序， true降序  false升序
         utime: true, // 按最终修改时间排序， true降序  false升序
       }
    },
    pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
    },
    tableData: [
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
}

const getters = {
	list: function(state) {
		return state.list;
	},
	value: function(state) {
		return state.value;
	},
	pickerOptions: function(state) {
		return state.pickerOptions;
	},
	tableData: function(state) {
		return state.tableData;
	}
}

const actions = {
	// 发送搜索参数
    onSench({commit,state}) {
    	console.log(state.value);
    	// 得到参数发送AJAX  调用mutations
    },
    // // 修改排序参数
    // onSort({commit,state}, str) {
    // 	console.log("str -- >", str)
    //     switch (str) {
    //       case "ctime":
    //           commit('ctime');
    //           break;
    //       case "utime":
    //           commit('utime');
    //           break;
    //       default:
    //           break;
    //     }
    // },

    getPageNum({commit,state}, str) {
    	console.log(str)
    }
}

const mutations = {
	ctime(state) {
		state.value.stype.ctime = !state.value.stype.ctime;
	},
	utime(state) {
		state.value.stype.utime = !state.value.stype.utime;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}