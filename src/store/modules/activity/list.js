/**
* Vuex 活动列表管理
* @author zhangtianci
*/
import api from './../../fetch/api'
import types from '../../types.js'
import utils from '../../../utils/utils.js'
const state = {
	activityName: "activity",
  activityTotal: 0, // 总数据条数
  activityDatas: [], // 列表数据
  // 菜单数据
	activityQuery: {
        dateTime: [
          {
            value: "0",
            label: "提审日期"
          },
          {
            value: "1",
            label: "发布日期"
          }
        ],
        selectStatus: [], // 全部状态
        selectOperator:[], // 全部操作人
    },
    activityValue: {
       search: "", //搜索value
       dateTime: "0", //按照创建日期、者最终修改日期 value
       datePicker: "", //起始日期至终止日期 value
       selectStatus: "", //全部来源
       selectOperator:"", //操作人
       stype: {  // 排序规则
         ctime: true, // 按创建时间排序， true降序  false升序
         utime: true, // 按最终修改时间排序， true降序  false升序
       },
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
       type: 1,
       pageNo: 1,
       pageSize: 10,
    },
    activityOptions: {
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
  activityName: function(state) {
    return state.activityName;
  },
	activityQuery: function(state) {
		return state.activityQuery;
	},
	activityValue: function(state) {
		return state.activityValue;
	},
	activityOptions: function(state) {
		return state.activityOptions;
	},
	activityDatas: function(state) {
		return state.activityDatas;
	},
  activityTotal: function(state) {
    return state.activityTotal;
  }
}

const actions = {
	// 发送搜索参数
  activitySench(context) {
    context.dispatch('activityGetList'); 
  },

  // 分页
  activityGetListByPage(context, pageNo) {
    console.log("pageNo --- ", pageNo);
    context.commit(types.UPDATA_MATERIAPAGANO, pageNo);
    context.dispatch('activityGetList'); // 获取数据
  },

  // 获取数据
  activityGetList(context) {
    var params = utils.bulidListParams(context.state.activityValue);
    api.$http(window.config.app.getList, params, 1)
    .then(res => {
      if(res.code == 0) {
        console.log(res)
        if(res.total != 0) {
          // 处理接口返回数据 构建列表数据格式
          context.commit(types.UPDATA_MATERIADATAS, utils.bulidListData(context.state.activityName, res)); // 数据
        } else {
          // 暂无数据
          context.commit(types.UPDATA_MATERIADATAS, null); // 数据
        }
      } 
    })
  }
}

const mutations = {

  // 修改搜索项
  [types.UPDATA_ACTIVITYVALUE] (state, value) {
    state.activityValue = value;
  },

  // 修改列表数据集合
  [types.UPDATA_MATERIADATAS] (state, value) {
    state.activityDatas = (value != null ? value.data : []); // 修改页面数据
    state.activityTotal = (value != null ? parseInt(value.total) : 0); // 总数据数
  },

  // 修改分页
  [types.UPDATA_MATERIAPAGANO] (state, value) {
    state.activityValue.pageNo = value; // 总数据数
  },

  // 修改全部状态
  [types.UPDATE_ACTIVITYSTATUS] (state, value) {
    state.activityQuery.selectStatus = value; 
  },

   // 修改全部操作人
  [types.UPDATA_ACTIVITYPERATOR] (state, value) {
    state.activityQuery.selectOperator = value;
  },

  // 修改 第一个时间
  [types.UPDATA_ACTIVITYCTIME] (state, value) {
     state.activityValue.mySort.ctime.status = !state.activityValue.mySort.ctime.status;
  },

  // 修改 第二个时间
  [types.UPDATA_ACTIVITYUTIME] (state, value) {
    state.activityValue.mySort.utime.status = !state.activityValue.mySort.utime.status;
  }
}

export default {
	state,
	getters,
	actions,
	mutations
}