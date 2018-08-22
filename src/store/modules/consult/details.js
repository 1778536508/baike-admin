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
  ConsultDetails: {
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
        imagesArr: [
          {
            imagesUrl: '',
            imagesUrlId: '',
            imagesState: ''
          },
          {
            imagesUrl: '',
            imagesUrlId: '',
            imagesState: ''
          },
          {
            imagesUrl: '',
            imagesUrlId: '',
            imagesState: ''
          }
        ]
      },
      Mydata1: {        // 开始时间
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
          value: '频道111111111111111111111',
          label: '频道111111111111111111111'
        }, {
          value: '频道2',
          label: '频道2'
        }, {
          value: '频道3',
          label: '频道3'
        }, {
          value: '频道4',
          label: '频道4'
        }, {
          value: '频道5',
          label: '频道5'
        }],
        value: '频道2',
      }
    },
    rules: window.Verification.rules,   // 验证数据
    // 弹窗
    MessageBox: {
      title: '',  // 弹窗标题
      dialogFormVisible: false,   // 弹窗状态
      DataReason: '',     // 审核原因
      contentMsg: false    // 弹窗内容状态
    },
    // 发布渠道
    ReleasePath: {
      newsMsg: false,    // 发布渠道显示状态
      isIndeterminate: true,   // 全选的不确定状态
      checkAll: false,     // 全选状态
      datas: [
        {
          codeId: 1,
          name: '非遗大百科',
          neWshow: false
        },{
          codeId: 2,
          name: '非遗大数据',
          neWshow: false,
        }
      ],
      newmessages: [],   // 初始化数据
      newIndex: []     // 初始化下标
    }
  }
};

/**
 * getters 定义属性
 */
const getters = {
  // 全部数据导出
  ConsultDetails (state) {
    return state.ConsultDetails
  },
  // 标题
  ConsultDetailsName (state) {
    return state.ConsultDetails.ruleForm.Myname.name
  },
  // 正文
  ConsultDetailsContent (state) {
    return state.ConsultDetails.ruleForm.Mycontent.createContent
  },
  // MessageBox审核不通过原因弹窗数据导出
  ConsultMessageBox (state) {
    return state.ConsultDetails.MessageBox
  },
  // 发布渠道数据导出
  ConsultReleasePath (state) {
    return state.ConsultDetails.ReleasePath
  }
};

/**
 *  actions  定义方法
 * @type {{detailsHttp({commit: *, state: *}): void}}
 */
const actions = {
  // 获取数据
  ConsultDetailsHttp (content, callpack) {
    content.commit('ConsultDetailsHttp',callpack)   // 编辑、查看、审核axios请求接口赋值
  },
  // // 重置数据
  ConsultDetailsReset (content, callpack) {
    content.commit ('ConsultDetailsReset',callpack);   // 添加赋值为空
  },
  // 上传图片成功回调
  ConsultSuccessClapack (content, file) {
    content.commit ('ConsultSuccessClapack', file)
  },
  // 上传图片删除回调
  ConsultHandleRemove (content, file) {
    content.commit ('ConsultHandleRemove', file)
  },
  // 上传图片失败回调
  ConsultErrorClapack (content, file) {
    content.commit ('ConsultErrorClapack', file)
  },
  // // 弹窗
  ConsultOpen (content, obj) {
    content.commit ('ConsultOpen', obj)
  },
  // 资讯发布
  ConsultBtnRelease (content, obj) {
    console.log(obj)
    if (obj.newmessages.length == 0) {
      obj.massType = 1
      content.commit ('ConsultOpen', obj)
    } else {
      obj.massType = 2
      content.commit ('ConsultOpen', obj)
    }
  },
  // 审核不通过
  ConsultNoExamine ({commit, state}) {
    commit ('ConsultNoExamine')
  },
  // 审核不通过原因 确认/取消
  ConsultBtnCacel (content, data) {
    content.commit ('ConsultBtnCacel', data)
  },
  // 发布渠道全选
  ConsultHandleCheckAllChange (content, val) {
    content.commit ('ConsultHandleCheckAllChange', val)
  },
  // 发布渠道单选
  ConsultHandleCheckedCitiesChange (content, val) {
    content.commit ('ConsultHandleCheckedCitiesChange', val)
  },
  // 发布渠道数据重置
  ConsultResetReleasePath ({commit, state}) {
    commit ('ConsultResetReleasePath')
  },
};

/**
 * mutations  定义动作
 * @type {{detailsHttp(*): void}}
 */
const mutations = {
  // 获取数据
  ConsultDetailsHttp (state, callpack) {
    // 参数
    var paramsObj = {
      _url: state.ConsultDetails.params._url,
      data: state.ConsultDetails.params.data,
      request: state.ConsultDetails.params.request
    };
    // console.log('passssss',paramsObj)
    // 交互
    axios.$http(paramsObj._url, paramsObj.data, paramsObj.request).then((res) => {
      state.ConsultDetails.ruleForm = dataProce.DataProce(res);   // 调取处理数据方法
      state.ConsultDetails.ruleForm.updateSate = true;
      console.log(')))))))))', state.ConsultDetails.ruleForm)
      callpack() && callpack();
    })
  },
  // 新增（重置）数据
  ConsultDetailsReset (state, callpack){
    state.ConsultDetails.ruleForm = dataProce.ResetData(0);
    callpack() && callpack()
  },
  // 资讯频道
  consultDateilsChannel (state, data) {
    state.ConsultDetails.ruleForm.channel = dataProce.channelData(data, 1);
  },
  // 新增资讯频道
  consultDateilsChannelCreate (state, data) {
    state.ConsultDetails.ruleForm.channel = dataProce.channelData(data, 2);
  },
  // 上传图片成功回调
  ConsultSuccessClapack (state, file) {
    console.log('上传了',file)
    // state.ConsultDetails.ruleForm.Myimages.imagesArr[0].imagesUrl = file.data
    state.ConsultDetails.ruleForm.Myimages.imagesArr.push(
      {
        imagesUrl: file.data.uri,
        imagesUrlId: file.data.id,
        imagesState: 'a'
      }
    )
  },
  // 上传图片删除回调
  ConsultHandleRemove (state, file) {
    console.log('删除了',file)
    // state.ConsultDetails.ruleForm.Myimages.imagesArr[0].imagesUrl = '';
    if (file.response) {
      state.ConsultDetails.ruleForm.Myimages.imagesArr.forEach((item, index) => {
        if (item.imagesUrlId == file.response.data.id) {
          item.imagesState = 'd';
          item.imagesUrl = '';
        }
      })
    } else {
      state.ConsultDetails.ruleForm.Myimages.imagesArr.forEach((item, index) => {
        if (item.imagesUrlId == file) {
          item.imagesState = 'd';
          item.imagesUrl = '';
        }
      })
    }

  },
  // 上传图片失败回调
  ConsultErrorClapack (state, file) {
    console.log('图片上传失败error====>',file, fileList)
  },
  // 弹窗
  ConsultOpen (state, obj) {
    console.log('=======================',state.ConsultDetails.ruleForm);
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
            // 存储数据接口调用
            var params = {
              _url: window.config.domain + window.config.app.detailsUpload,
              data: dataProce._setDataDetails(state.ConsultDetails.ruleForm),
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
          case 2:   // 提交审核
            var params = {
              _url: window.config.domain + window.config.app.saveAndSubmit,
              data: dataProce._setDataDetails(state.ConsultDetails.ruleForm),
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
                id: state.ConsultDetails.ruleForm.id,
                isWiki: state.ConsultDetails.ReleasePath.datas[0].neWshow ? 1 : 0,   // 百科 1发布  0不发布
                isDiich: state.ConsultDetails.ReleasePath.datas[1].neWshow ? 1 : 0   // 大数据 1发布  0不发布
              },
              request: 1
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
          default:
            break;
        }

        // // 成功
        // function _getSeccess() {
        //   _this.$message({
        //     type: 'success',
        //     message: obj.name + '成功!'
        //   });
        //   setTimeout(function () {
        //     _this.$router.go(-1)
        //   },500)
        // };
        // // 失败
        // function _getError() {
        //   _this.$message({
        //     showClose: true,
        //     message: '失败',
        //     type: 'error'
        //   });
        // };
      }).catch(() => {
        dataProce.CancelMessage(obj.name);
        // _this.$message({
        //   type: 'info',
        //   message: '取消' + obj.name
        // });
      });


    }
  },
  // 审核不通过
  ConsultNoExamine (state) {
    state.ConsultDetails.MessageBox.dialogFormVisible = true
    state.ConsultDetails.MessageBox.title = '审核不通过原因'
    state.ConsultDetails.MessageBox.contentMsg = false
  },
  // 审核不通过原因
  ConsultBtnCacel (state, datas) {
    console.log('====>',datas)
    state.ConsultDetails.MessageBox.dialogFormVisible = datas.msg
    // 确认审核不通过
    if (datas.data.text !== '') {
      state.ConsultDetails.MessageBox.DataReason = datas.data.text
      // alert(datas.data.text)  unapprove

      var params = {
        _url: window.config.domain + window.config.app.unapprove,
        data:{
          id: state.ConsultDetails.ruleForm.id,
          reason: datas.data.text
        },
        request: 1
      };
      console.log('params==>', params)
      axios.$http(params._url, params.data, params.request).then((res) => {
        console.log('res===>', res)
        if (res != 0) {
          // 成功
          dataProce.SeccessMessage('审核不通过')
        } else {
          // 失败
          dataProce.ErrorMessage('审核不通过')
        }
      });
    } else {
      // 取消
      dataProce.CancelMessage('审核不通过原因');
    }
  },
  // 发布渠道全选
  ConsultHandleCheckAllChange (state, val) {
    state.ConsultDetails.ReleasePath.isIndeterminate = !state.ConsultDetails.ReleasePath.isIndeterminate
    state.ConsultDetails.ReleasePath.datas.map((item, i) => {
      item.neWshow = val
    })
    state.ConsultDetails.ReleasePath.newmessages = []  // 初始化数据
    if (val == true) {
      state.ConsultDetails.ReleasePath.newmessages.push(state.ConsultDetails.ReleasePath.datas)
    } else {
      state.ConsultDetails.ReleasePath.newmessages = []
    }
    console.log('--全选--',state.ConsultDetails.ReleasePath.datas)
  },
  // 发布渠道单选
  ConsultHandleCheckedCitiesChange (state, val) {
    // console.log('--单选--', val)
    if (val.neWshow == true) {
      state.ConsultDetails.ReleasePath.newmessages.push(val)
    } else {
      state.ConsultDetails.ReleasePath.newmessages.forEach((v, i) => {
        if (v.codeId == val.codeId) {
          state.ConsultDetails.ReleasePath.newmessages.splice(i, 1)
          state.ConsultDetails.ReleasePath.newIndex.splice(i, 1)
        }
      })
    }
    for (var i = 0; i < state.ConsultDetails.ReleasePath.datas.length; i++) {
      if (state.ConsultDetails.ReleasePath.datas[i].neWshow == false) {
        state.ConsultDetails.ReleasePath.isIndeterminate = true
        state.ConsultDetails.ReleasePath.checkAll = false
        break
      } else {
        state.ConsultDetails.ReleasePath.isIndeterminate = false
        state.ConsultDetails.ReleasePath.checkAll = true
      }
    }
    console.log('--单选--',state.ConsultDetails.ReleasePath.datas)
  },
  // 发布渠道数据重置
  ConsultResetReleasePath (state) {
    state.ConsultDetails.ReleasePath = {
      newsMsg: false,    // 发布渠道显示状态
      isIndeterminate: true,   // 全选的不确定状态
      checkAll: false,     // 全选状态
      datas: [
        {
          codeId: 1,
          name: '非遗大百科',
          neWshow: false
        },{
          codeId: 2,
          name: '非遗大数据',
          neWshow: false,
        }
      ],
      newmessages: [],   // 初始化数据
      newIndex: []     // 初始化下标
    };
  }
};

// 导出
export default {
  state,
  getters,
  actions,
  mutations
}

