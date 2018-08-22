/**
* Vuex 咨询列表管理
* @author zhangtianci
*/
import api from './../../fetch/api'
import types from '../../types.js'
import utils from '../../../utils/utils.js'
const state = {
  consultName: "consult",
  consultTotal: 0, // 总数据条数
  consultDatas: [], // 列表数据
	// name
	consultQuery: {
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
    selectChannel: [], // 全部频道
    selectOperator: [], // 全部操作人
  },
  consultValue: {
    search: "", //搜索value
    dateTime: "0", //按照创建日期、者最终修改日期 value
    datePicker: "", //起始日期至终止日期 value
    selectStatus: "", // 全部状态
    selectChannel: "", // 全部频道
    selectOperator:"", // 全部操作人
    // stype: {  // 排序规则
    //   ctime: true, // 按创建时间排序， true降序  false升序
    //   utime: true, // 按最终修改时间排序， true降序  false升序
    // },
    mySort: {
      ctime: {
        status: true, // true降序  false升序
        type: window.config.dateTerm.properties[2].value, 
      },
      utime: {
        status: true, // true降序  false升序
        type: window.config.dateTerm.properties[3].value,
      }
    },
    targetType: 5, // 咨询 、咨询下面分咨询、活动
    type: 0,
    pageNo: 1,
    pageSize: 10,
  },
  consultOptions: {
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
  }
}

const getters = {
  consultName: function(state) {
    return state.consultName;
  },
	consultQuery: function(state) {
		return state.consultQuery;
	},
	consultValue: function(state) {
		return state.consultValue;
	},
	consultOptions: function(state) {
		return state.consultOptions;
	},
	consultDatas: function(state) {
		return state.consultDatas;
	},
  consultTotal: function(state) {
    return state.consultTotal;
  }
}

const actions = {
	// 发送搜索参数
  consultSench(context) {
    context.dispatch('consultGetList'); 
  },

  // 分页查询
  consultGetListByPage(context, pageNo) {
    context.commit(types.UPDATA_CONSULTPAGANO, pageNo);
    context.dispatch('consultGetList'); // 获取数据
  }, 

  // 获取数据
  consultGetList(context) {
    var params = utils.bulidListParams(context.state.consultValue);
    api.$http(window.config.app.getList, params, 1)
    .then(res => {
      if(res.code == 0) {
        if(res.total != 0) {
          console.log("res --- >", res.data)
          // 处理接口返回数据 构建列表数据格式
          context.commit(types.UPDATA_CONSULTDATAS, utils.bulidListData(context.state.consultName, res)); // 数据
        } else {
          // 暂无数据
          context.commit(types.UPDATA_CONSULTDATAS, null); // 数据
        }
      }
    })
  }, 
}

const mutations = {

  // 修改搜索项
  [types.UPDATA_CONSULTVALUE] (state, value) {
    state.consultValue = value;
  },

  // 修改列表数据集合
  [types.UPDATA_CONSULTDATAS] (state, value) {
    state.consultDatas = (value != null ? value.data : []); // 修改页面数据
    state.consultTotal = (value != null ? parseInt(value.total) : 0); // 总数据数
  },

  // 修改分页
  [types.UPDATA_CONSULTPAGANO] (state, value) {
    state.consultValue.pageNo = value; // 总数据数
  },

  // 修改全部频道
  [types.UPDATA_CONSULTCHANNEL] (state, value) {
     state.consultQuery.selectChannel = value; 
  },

  // 修改全部状态
  [types.UPDATA_CONSULTSTATUS] (state, value) {
     state.consultQuery.selectStatus = value; 
  },

  // 修改全部操作人
  [types.UPDATA_CONSULTOPERATOR] (state, value) {
    state.consultQuery.selectOperator = value;
  },

  // 修改 第一个时间
  [types.UPDATA_CONSULTCTIME] (state, value) {
    state.consultValue.mySort.ctime.status = !state.consultValue.mySort.ctime.status;
  },

  // 修改 第二个时间
  [types.UPDATA_CONSULTUTIME] (state, value) {
    state.consultValue.mySort.utime.status = !state.consultValue.mySort.utime.status;
  }
}




export default {
	state,
	getters,
	actions,
	mutations
}