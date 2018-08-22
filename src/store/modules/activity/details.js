import axios from '../../fetch/api'  // 公共配置接口
import dataProce from '../../../utils/detailsData' //处理数据
import _this from '../../../main'
/**
 * 查看、审核
 * 属性
 * @type {{dataObj: {params: {id: *}, stateMg: {dateMsg: string, regionMsg: string, optionsMsg: string, imagesMsg: string}, ruleForm: {name: string, imagesUrl: string, channel: string, timeDate: string, region: string, shortContent: *[], longContent: Array}}}}
 */
const state = {
  name: 'consult',
  // 编辑、查看、审核
  ActivityDetails: {
    // 获取数据接口
    params: {
      _url: window.config.domain + window.config.app.details,
      data: {
        informationId: ''
      },
      request: 1
    },
    // 初始化数据
    ruleForm: {
      Myname: {           // 标题
        name: '',
        nameId: '',
        nameStatus: ''
      },
      Myimages: {        // 背景图
        upimgId:'',
        VerifImage: '',   // 表单验证数据
        imagesArr: [
          // {
          //   imagesUrl: '',
          //   imagesUrlId: '',
          //   imagesState: ''
          // }
        ]
      },
      Mydate1: {        // 开始时间
        date1: '',
        date1Id: '',
        date1State: '',
      },
      Mydate2: {      // 结束时间
        date2: '',
        date2Id: '',
        date2State: ''
      },
      Myregion: {     // 地址
        region: '',
        regionId: '',
        regionState: ''
      },
      Mycontent: {      // 正文
        longContent: '',
        createContent: '',
        contentId: '',
        contentState: ''
      },
      channel: {    // 频道
        options: [{
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }],
        value: '',
      }
    },
    // window.Verification.rules
    rules: window.Verification.rules,   // 验证数据
    // 弹窗
    MessageBox: {
      title: '',  // 弹窗标题
      dialogFormVisible: false,   // 弹窗状态
      DataReason: '',     // 审核原因
      contentMsg: false    // 弹窗内容状态
    },
    // 发布渠道
    // ReleasePath: {
    //   newsMsg: false,    // 发布渠道显示状态
    //   isIndeterminate: true,   // 全选的不确定状态
    //   checkAll: false,     // 全选状态
    //   datas: [
    //     {
    //       codeId: 1,
    //       name: '非遗大百科',
    //       neWshow: false
    //     },{
    //       codeId: 2,
    //       name: '非遗大数据',
    //       neWshow: false,
    //     }
    //   ],
    //   newmessages: [],   // 初始化数据
    //   newIndex: []     // 初始化下标
    // }
  }
};

/**
 * getters 定义属性
 */
const getters = {
  // 全部数据导出
  ActivityDetails (state) {
    return state.ActivityDetails
  },
  // 标题
  ActivityDetailsName (state) {
    return state.ActivityDetails.ruleForm.Myname.name
  },
  // 开始时间
  ActivityDetailsDate1 () {
    return state.ActivityDetails.ruleForm.Mydate1.date1
  },
  // 结束时间
  ActivityDetailsDate2 () {
    return state.ActivityDetails.ruleForm.Mydate2.date2
  },
  // 地点
  ActivityDetailsRegion () {
    return state.ActivityDetails.ruleForm.Myregion.region
  },
  // 正文
  ActivityDetailsContent (state) {
    return state.ActivityDetails.ruleForm.Mycontent.createContent
  },
  // MessageBox审核不通过原因弹窗数据导出
  ActivityMessageBox (state) {
    return state.ActivityDetails.MessageBox
  },
};

/**
 *  actions  定义方法
 * @type {{detailsHttp({commit: *, state: *}): void}}
 */
const actions = {
  // 获取数据
  ActivityDetailsHttp (content, callpack) {
    content.commit('ActivityDetailsHttp',callpack)   // 编辑、查看、审核axios请求接口赋值
  },
  // 重置数据
  ActivityDetailsReset (content, callpack) {
    content.commit ('ActivityDetailsReset',callpack);   // 添加赋值为空
  },
  // 上传图片成功回调
  ActivitySuccessClapack (content, file) {
    content.commit ('ActivitySuccessClapack', file)
  },
  // 上传图片删除回调
  ActivityHandleRemove (content, file) {
    content.commit ('ActivityHandleRemove', file)
  },
  // 上传图片失败回调
  ActivityErrorClapack (content, file) {
    content.commit ('ActivityErrorClapack', file)
  },
  // // 弹窗
  ActivityOpen (content, obj) {
    content.commit ('ActivityOpen', obj)
  },
  // 资讯发布
  // ActivityBtnRelease ({commit, state}) {
  //   var obj = {
  //     name: '发布',    //名字
  //     massType: '',    //弹窗类型  2带确定、取消的弹窗   1只有确定
  //     btnType: 3    // 保存1   提交审核2   发布3
  //   };
  //   if (state.ActivityDetails.ReleasePath.newmessages.length == 0) {
  //     obj.massType = 1
  //     commit ('ActivityOpen', obj)
  //   } else {
  //     obj.massType = 2
  //     commit ('ActivityOpen', obj)
  //   }
  // },
  // 审核不通过
  ActivityNoExamine ({commit, state}) {
    commit ('ActivityNoExamine')
  },
  // 审核不通过原因 确认/取消
  ActivityBtnCacel (content, data) {
    content.commit ('ActivityBtnCacel', data)
  },
  // 发布渠道全选
  ActivityHandleCheckAllChange (content, val) {
    content.commit ('ActivityHandleCheckAllChange', val)
  },
  // 发布渠道单选
  ActivityHandleCheckedCitiesChange (content, val) {
    content.commit ('ActivityHandleCheckedCitiesChange', val)
  },
};

/**
 * mutations  定义动作
 * @type {{detailsHttp(*): void}}
 */
const mutations = {
  // 获取数据
  ActivityDetailsHttp (state, callpack) {
    // 参数
    var paramsObj = {
      _url: state.ActivityDetails.params._url,
      data: state.ActivityDetails.params.data,
      request: state.ActivityDetails.params.request
    };
    // console.log('passssss',paramsObj)
    // 交互
    axios.$http(paramsObj._url, paramsObj.data, paramsObj.request).then((res) => {
      state.ActivityDetails.ruleForm = dataProce.DataProce(res);   // 调取处理数据方法
      state.ActivityDetails.ruleForm.updateSate = true;
      console.log(')))))))))', state.ActivityDetails.ruleForm)
      callpack() && callpack();
    })
  },
  // 重置数据
  ActivityDetailsReset (state, callpack){
    state.ActivityDetails.ruleForm = dataProce.ResetData(1);
    callpack() && callpack()
  },
  // 资讯频道
  consultDateilsChannel (state, data) {
    state.ActivityDetails.ruleForm.channel = dataProce.channelData(data, 1);
  },
  // 新增资讯频道
  consultDateilsChannelCreate (state, data) {
    state.ActivityDetails.ruleForm.channel = dataProce.channelData(data, 2);
  },


  // 上传图片成功回调
  ActivitySuccessClapack (state, file) {
    console.log('上传了',file)
    state.ActivityDetails.ruleForm.Myimages.VerifImage = file.data.uri;    // 验证所需
    state.ActivityDetails.ruleForm.Myimages.imagesArr.push(
      {
        imagesUrl: file.data.uri,
        imagesUrlId: file.data.id,
        imagesState: 'a'
      }
    )
  },
  // 上传图片删除回调
  ActivityHandleRemove (state, file) {
    console.log('删除了',file)
    // state.ActivityDetails.ruleForm.Myimages.imagesArr[0].imagesUrl = '';
    if (file.response) {
      state.ActivityDetails.ruleForm.Myimages.VerifImage = '';    // 验证所需
      state.ActivityDetails.ruleForm.Myimages.imagesArr.forEach((item, index) => {
        if (item.imagesUrlId == file.response.data.id) {
          item.imagesState = 'd';
          item.imagesUrl = '';
        }
      })
    } else {
      state.ActivityDetails.ruleForm.Myimages.VerifImage = '';    // 验证所需
      state.ActivityDetails.ruleForm.Myimages.imagesArr.forEach((item, index) => {
        if (item.imagesUrlId == file) {
          item.imagesState = 'd';
          item.imagesUrl = '';
        }
      })
    }

  },
  // 上传图片失败回调
  ActivityErrorClapack (state, file) {
    console.log('图片上传失败error====>',file, fileList)
  },
  // 弹窗
  ActivityOpen (state, obj) {
    console.log('=======================',state.ActivityDetails.ruleForm);
    // 判断是否发布显示不同的弹窗 1 2
    if (obj.massType == 1) {
      _this.$alert('请选择发布渠道', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    } else {
      _this.$confirm('确认'+obj.name+'吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        switch(obj.btnType){
          case 1:    // 保存
            var params = {
              _url: window.config.domain + window.config.app.detailsUpload,
              data: dataProce._setDataDetails(state.ActivityDetails.ruleForm),
              request: 0
            };
            console.log('params==>', params)
            axios.$http(params._url, params.data, params.request).then((res) => {
              if (res.code == 0) {
                dataProce.SeccessMessage(obj.name)
              } else {
                dataProce.ErrorMessage(obj.name)
              }
            })
            break;
          case 2:   // 提交审核
            var params = {
              _url: window.config.domain + window.config.app.saveAndSubmit,
              data: dataProce._setDataDetails(state.ActivityDetails.ruleForm),
              request: 0
            };
            console.log('params==>', params)
            axios.$http(params._url, params.data, params.request).then((res) => {
              console.log('res===>', res)
              if (res.code == 0) {
                dataProce.SeccessMessage(obj.name)
              } else {
                dataProce.ErrorMessage(obj.name)
              }
            });
            break;
          case 3:   //发布
            var params = {
              _url: window.config.domain + window.config.app.publish,
              data:{
                id: state.ActivityDetails.ruleForm.id,
                isWiki: state.ActivityDetails.ReleasePath.datas[0].neWshow ? 1 : 0,   // 百科 1发布  0不发布
                isDiich: state.ActivityDetails.ReleasePath.datas[1].neWshow ? 1 : 0   // 大数据 1发布  0不发布
              },
              request: 1
            };
            console.log('params==>', params)
            axios.$http(params._url, params.data, params.request).then((res) => {
              console.log('res===>', res)
              if (res.code == 0) {
                dataProce.SeccessMessage(obj.name)
              } else {
                dataProce.SeccessMessage(obj.name)
              }
            });
            break;
          default:
            break;
        }
      }).catch(() => {
        dataProce.CancelMessage(obj.name);
      });


    }
  },
  // 审核不通过
  ActivityNoExamine (state) {
    state.ActivityDetails.MessageBox.dialogFormVisible = true;
    state.ActivityDetails.MessageBox.title = '审核不通过原因';
    state.ActivityDetails.MessageBox.contentMsg = false;
  },
  // 审核不通过原因
  ActivityBtnCacel (state, datas) {
    console.log('====>',datas)
    state.ActivityDetails.MessageBox.dialogFormVisible = datas.msg
    // 确认审核不通过
    if (datas.data.text !== '') {
      state.ActivityDetails.MessageBox.DataReason = datas.data.text
      // alert(datas.data.text)

      var params = {
        _url: window.config.domain + window.config.app.unapprove,
        data:{
          id: state.ActivityDetails.ruleForm.id,
          reason: datas.data.text
        },
        request: 1
      };
      console.log('params==>', params)
      axios.$http(params._url, params.data, params.request).then((res) => {
        console.log('res===>', res)

        if (res != 0) {
          dataProce.SeccessMessage('审核不通过')
        } else {
          dataProce.ErrorMessage('审核不通过')
        }
      });
    } else {
      // 取消
      dataProce.CancelMessage('审核不通过原因');
    }
  },
  // 发布渠道全选
  ActivityHandleCheckAllChange (state, val) {
    state.ActivityDetails.ReleasePath.isIndeterminate = !state.ActivityDetails.ReleasePath.isIndeterminate
    state.ActivityDetails.ReleasePath.datas.map((item, i) => {
      item.neWshow = val
    })
    state.ActivityDetails.ReleasePath.newmessages = []  // 初始化数据
    if (val == true) {
      state.ActivityDetails.ReleasePath.newmessages.push(state.ActivityDetails.ReleasePath.datas)
    } else {
      state.ActivityDetails.ReleasePath.newmessages = []
    }
    console.log('--全选--',state.ActivityDetails.ReleasePath.newmessages)
  },
  // 发布渠道单选
  ActivityHandleCheckedCitiesChange (state, val) {
    // console.log('--单选--', val)
    if (val.neWshow == true) {
      state.ActivityDetails.ReleasePath.newmessages.push(val)
    } else {
      state.ActivityDetails.ReleasePath.newmessages.forEach((v, i) => {
        if (v.codeId == val.codeId) {
          state.ActivityDetails.ReleasePath.newmessages.splice(i, 1)
          state.ActivityDetails.ReleasePath.newIndex.splice(i, 1)
        }
      })
    }
    for (var i = 0; i < state.ActivityDetails.ReleasePath.datas.length; i++) {
      if (state.ActivityDetails.ReleasePath.datas[i].neWshow == false) {
        state.ActivityDetails.ReleasePath.isIndeterminate = true
        state.ActivityDetails.ReleasePath.checkAll = false
        break
      } else {
        state.ActivityDetails.ReleasePath.isIndeterminate = false
        state.ActivityDetails.ReleasePath.checkAll = true
      }
    }
    console.log('--单选--',state.ActivityDetails.ReleasePath.newmessages)
  }
};

// 导出
export default {
  state,
  getters,
  actions,
  mutations
}

