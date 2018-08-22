import api from './../../fetch/api'
import types from '../../types.js'
import utils from '../../../utils/utils.js'
const state = {
  materialName: "material",
  materialTotal: 0, // 总数据条数
  materialDatas: [], // 列表数据
	// 菜单数据
	materialQuery: {
    dateTime: [], // 时间查询
        selectSource: [], // 全部来源
        selectOperator: [], // 全部操作人
    },
  materialValue: {
       search: "", //搜索value
       dateTime: "", //按照创建日期、者最终修改日期 value
       datePicker: "", //起始日期至终止日期 value
       selectSource: "", // 全部来源
       selectOperator:"", // 全部操作人
       mySort: {
          ctime: {
            status: true, // true降序  false升序
            type: window.config.dateTerm.properties[0].value, 
          },
          utime: {
            status: true, // true降序  false升序
            type: window.config.dateTerm.properties[1].value,
          }
       },
       targetType: 5, // 咨询 、咨询下面分咨询、活动
       type: "",
       pageNo: 1,
       pageSize: 10,
    },
  materialOptions: {
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
}

const getters = {
  materialName: function(state) {
    return state.materialName;
  },
	materialQuery: function(state) {
		return state.materialQuery;
	},
	materialValue: function(state) {
		return state.materialValue;
	},
	materialOptions: function(state) {
		return state.materialOptions;
	},
	materialDatas: function(state) {
		return state.materialDatas;
	},
  materialTotal: function(state) {
    return state.materialTotal;
  }
}

const actions = {
	// 发送搜索参数
  materialSench(context) {
    context.dispatch('materialGetList'); 
  },

  // 分页查询
  materialGetListByPage(context, pageNo) {
    context.commit(types.UPDATA_MATERIAPAGANO, pageNo);
    context.dispatch('materialGetList'); // 获取数据
  }, 
 
  materialGetList(context) {
    var params = utils.bulidListParams(context.state.materialValue);
    console.log("params --- >", params);
    api.$http(window.config.app.getList, params, 1)
    .then(res => {
      console.log("res --- >", res);
      if(res.code == 0) {
        if(res.total != 0) {
          // 处理接口返回数据 构建列表数据格式
          context.commit(types.UPDATE_MATERIADATAS, utils.bulidListData(context.state.materialName, res)); // 数据
        } else {
          context.commit(types.UPDATE_MATERIADATAS, null); // 数据
        }
      } 
    })
  }

}

const mutations = {

  // 修改搜索项
  [types.UPDATA_MATERIALVALUE] (state, value) {
    state.materialValue = value;
  },

  // 修改列表数据集合
  [types.UPDATE_MATERIADATAS] (state, value) {
    state.materialDatas = (value != null ? value.data : []); // 修改页面数据
    state.materialTotal = (value != null ? parseInt(value.total) : 0); // 总数据数
  },

  // 修改分页
  [types.UPDATA_MATERIAPAGANO] (state, value) {
    state.materialValue.pageNo = value; // 总数据数
  },

  // 修改全部操作人
  [types.UPDATA_MATERIAOPERATOR] (state, value) {
    state.materialQuery.selectOperator = value;
  },

  // 修改全部来源
  [types.UPDATA_MATERIASOURCE] (state, value) {
    state.materialQuery.selectSource = value;
  },

  // 修改搜索项时间
  [types.UPDATA_MATERIAUPDATE] (state, value) {
    state.materialQuery.dateTime = value;
  },

  // 修改排序创建时间
  [types.UPDATA_MATERIACTIME] (state, value) {
    state.materialValue.mySort.ctime.status = !state.materialValue.mySort.ctime.status;
    console.log(state.materialValue.mySort.ctime.status)
  },

  // 修改排序修改事件
  [types.UPDATA_MATERIAUTIME] (state, value) {
    state.materialValue.mySort.utime.status = !state.materialValue.mySort.utime.status;
  }

	// ctime(state) {
	// 	state.value.stype.ctime = !state.value.stype.ctime;
	// },
	// utime(state) {
	// 	state.value.stype.utime = !state.value.stype.utime;
	// }
}

export default {
	state,
	getters,
	actions,
	mutations
}