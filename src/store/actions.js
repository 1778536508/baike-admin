/**
* 公共调用actions
* @author zhangtianci
*/
import api from './fetch/api'
import types from './types.js'

const actions = {

  /**
   * 获取所有频道
   * @method getChannel
   * @author zhangtianci
   * @param {name} name 模块名称
   * @return 返回接口结果
  */
  getChannel(content, name) {
    api.$http(window.config.app.channel, null, 1)
    .then(res => {
      // console.log("获取频道 -- 》", res)
      if(res.code == 0) {
        if(res.data.length > 0) {
          var arr = res.data;
          var newArr = [];
          for(var i = 0; i < arr.length; i++) {
            var obj = {};
            obj['value'] = arr[i]['id'].toString();
            obj['label'] = arr[i]['name'];
            newArr.push(obj);
          }
          // 根据标示进行分发
          switch (name) {
      			case "consult":
      			    content.commit("UPDATA_CONSULTCHANNEL", [{label: "全部频道", value: "", show: 1}].concat(newArr)); // 咨询
      			    break;
      			case "activity":
      			    break;
            case "detailsEdit":
                content.commit('consultDateilsChannel', [].concat(newArr)); // 资讯详情频道
              break;
            case "detailsCreate":
              content.commit('consultDateilsChannelCreate', [].concat(newArr)); // 资讯添加详情频道
              break;
      			default:
      			    break;
      		}

        }
      }
    })
  },

  /**
   * 获取所有状态
   * @method getStatus
   * @author zhangtianci
   * @param {name} name 模块名称
   * @return 返回接口结果
  */
  getStatus(content, name) {
    var data = window.config.examine.properties;
    var newArr = [];
    // 过滤
    for(let i in data) {
      if(data[i]['show'] == 1) {
         newArr.push(data[i]);
      }
    }
    // 根据标示进行分发
    switch (name) {
      case "consult":
        content.commit("UPDATA_CONSULTSTATUS", [{label: "全部状态", value: "", show: 1}].concat(newArr)); // 咨询
        break;
      case "activity":
        content.commit("UPDATE_ACTIVITYSTATUS", [{label: "全部状态", value: "", show: 1}].concat(newArr));
        break;
      default:
        //
        break;
    }
  },

  /**
   * 获取全部操作人
   * @method getOperater
   * @author zhangtianci
   * @param {name} name 模块名称
   * @return 返回接口结果
  */
  getOperater(content, name) {
    api.$http(window.config.app.operater, null, 1)
    .then(res => {
      if(res.code == 0) {
        if(res.data.length > 0) {
          var arr = res.data;
          var newArr = [];
          for(var i = 0; i < arr.length; i++) {
            var obj = {};
            obj['value'] = arr[i]['id'].toString();
            obj['label'] = arr[i]['name'];
            newArr.push(obj);
          }
          // 根据标示进行分发
          switch (name) {
            case "consult":
                content.commit("UPDATA_CONSULTOPERATOR", [{label: "全部操作人", value: "", show: 1}].concat(newArr)); // 资讯
                break;
            case "material":
                content.commit("UPDATA_MATERIAOPERATOR", [{label: "全部操作人", value: "", show: 1}].concat(newArr)); // 抓取素材
                break;
            case "activity":
                content.commit("UPDATA_ACTIVITYPERATOR", [{label: "全部操作人", value: "", show: 1}].concat(newArr)); // 活动
                break;
            default:
                //
                break;
          }

        }
      } 
    })
    
  },

  /**
   * 获取全部来源
   * @method getOperater
   * @author zhangtianci
   * @param {name} name 模块名称
   * @return 返回接口结果
  */
  getSource(content, name) {
    api.$http(window.config.app.source, null, 1)
    .then(res => {
      console.log("获取来源 -- 》", res)
      if(res.code == 0) {
        if(res.data.length > 0) {
          var arr = res.data;
          var newArr = [];
          for(var i = 0; i < arr.length; i++) {
            var obj = {};
            obj['value'] = arr[i]['code'].toString();
            obj['label'] = arr[i]['name'];
            newArr.push(obj);
          }
          // 根据标示进行分发
          switch (name) {
            case "material":
                content.commit("UPDATA_MATERIASOURCE", [{label: "全部来源", value: "", show: 1}].concat(newArr)); // 咨询
                break;
            default:
                break;
          }
        }
      }
    })
  },

  // 获取时间
  getDateTerm(content, name) {
    var data = window.config.dateTerm.properties;
    var newArr = [];
    
    // 根据标示进行分发
    switch (name) {
      case "material":
        for(let i in data) {
          if(data[i]['value'] == 0) {
            newArr.push(data[i])
          }
          if(data[i]['value'] == 1) {
            newArr.push(data[i])
          }
        }
        content.commit("UPDATA_MATERIAUPDATE", newArr);
        break;
      default:
        // 
        break;
    }

  },

   /**
   * 排序统一管理
   * @method onSort
   * @author zhangtianci
   * @param {name} name 模块名称
  */
  onSort(content, params) {
    console.log("params --- >", params)
    switch (params.name) {
      case "material": // 抓取素材
        params.sort.value == 0 && content.commit("UPDATA_MATERIACTIME");
        params.sort.value == 1 && content.commit("UPDATA_MATERIAUTIME");
        break;
      case "consult": // 抓取素材
        params.sort.value == 0 && content.commit("UPDATA_CONSULTCTIME");
        params.sort.value == 1 && content.commit("UPDATA_CONSULTUTIME");
        break;
      case "activity":
        params.sort.value == 0 && content.commit("UPDATA_ACTIVITYCTIME");
        params.sort.value == 1 && content.commit("UPDATA_ACTIVITYUTIME");
        break;
      default:
        break;
    }
  }
  
}
export default actions;
