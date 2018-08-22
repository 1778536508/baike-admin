import configUtils from './utils'
import _thisMess from '../main'
// 请求头
import headers from '../store/modules/login/index'

/**
 * 图片上传配置参数
 */
window.uploadView = {
  _url: window.config.domain + window.config.app.upImage,    // 域名
  imagefile: 'imagefile',          // 上传图片统一name
  data: {
    type: 'information'     // 图片存放路径(文件夹名称)
  },
  headers: {                // 请求头参数
    Authorization: headers.actions.axiosHeader().Authorization,
    diich: headers.actions.axiosHeader().diich
  },
  remarks: {       // 图片备注
    size: '<em>图片尺寸比例&nbsp;[&nbsp;<b>224</b>&nbsp;<i class="el-icon-loading"></i>&nbsp;<b>138</b>&nbsp;]&nbsp;</em>',
    text: '<em>且只允许上传一张或者三张图片在或者不上传</em>'
  }
}



/**
 * Element-UI
 *    公共表单检验数据
 * @type {{rules: {Myname: {name: *[]}, Myimages: {VerifImage: *[]}, Mydate1: {date1: *[]}, Mydate2: {date2: *[]}, Myregion: {region: *[]}, channel: {value: *[]}, Mycontent: {longContent: *[], createContent: *[]}}}}
 */
window.Verification = {
  rules: {
    Myname: {       // 标题
      name:[
          {required: true, message: '请输入标题名称', trigger: 'blur' },        // 非空验证
          // {min: 1, max: 15, message: '长度在 1 到 15 个字符'},           // 字符长度验证
          // {pattern: /^1[34578]\d{9}$/, message: '手机号只能为数字并且为11位的整数'}  // 自定义验证
        ],
    },
    Myimages: {       // 活动头图
      VerifImage: [
        { required: true, message: '请上传一张头图', trigger: 'change' }
      ]
    },
    Mydate1: {      // 开始时间
      date1:[
        { required: true, message: '请选择开始日期时间', trigger: 'change' }
      ]
    },
    Mydate2: {      // 结束时间
      date2:[
        { required: true, message: '请选择结束日期时间', trigger: 'change' }
      ]
    },
    Myregion: {     // 地点
      region: [
        { required: true, message: '请输入地点名称', trigger: 'blur' },
      ]
    },
    channel: {      // 频道
      value: [
        { required: true, message: '请选择频道', trigger: 'change' }
        ]
    },
    Mycontent: {    // 正文
      longContent: [
        { required: true, message: '请输入正文', trigger: 'blur' },
        ],
      createContent: [
        { required: true, message: '请输入正文', trigger: 'blur' },
        ],
    }
  },
};


/**
 * 新增 （重置）数据
 * @param type
 * @returns {{dataStatus: string, type: number, Myname: {name: string, nameId: string, nameStatus: string}, Myimages: {VerifImage: string, upimgId: string, imagesArr: Array}, Mydate1: {date1: string, date1Id: string, date1State: string}, Mydate2: {date2: string, date2Id: string, date2State: string}, Myregion: {region: string, regionId: string, regionState: string}, Mycontent: {longContent: string, createContent: string, contentId: string, contentState: string}, channel: {options: *[], value: string, label: string}}}
 * @constructor
 */
var ResetData = function (type) {
  var obj = {
    dataStatus: 'a',  // 新增
    type: 0,   // 资讯0   活动1
    Myname: {           // 标题
      name: '',
      nameId: '',
      nameStatus: ''
    },
    Myimages: {        // 背景图
      VerifImage: '',
      upimgId:'',
      imagesArr: [
        // {
        //   imagesUrl: '',
        //   imagesUrlId: '',
        //   imagesState: ''
        // },
      ]
    },
    Mydate1: {      // 开始时间
      date1: '',
      date1Id: '',
      date1State: '',
    },
    Mydate2: {        // 结束时间
      date2: '',
      date2Id: '',
      date2State: ''
    },
    Myregion: {       // 地址
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
    channel: {      // 频道
      options: [{     // 所有频道
        // value: '',   // 每个频道name
        // label: ''    // 每个频道ID
      }],
      value: '',    // 选中频道name
      label: ''     // 选中频道ID
    },
  };
  return obj;
};







/**
 * 定义当前频道ID
 * @type {string}
 */
var channelId = '';   // 当前资讯频道ID

/**
 * 详情页构建数据
 * @param data
 * @returns {{type: string, name: string, imagesUrl: Array, channel: string, date1: string, date2: string, timeDate: {date1: string, date2: string}, region: string, longContent: string, createContent: string}}
 * @constructor
 */
var DataProce = function (data) {
  var oss = window.config.oss;
  var ossUrl = oss.url + oss.type.image + oss.name;
  console.log('交互到的数据===============>',data)
  // vue 数据
  var obj = {
    id: '',   //当前详情ID
    type: '',   //类型、 资讯/活动
    channel: '',    // 频道
    Myname: {
      name: '',
      nameId: '',
      nameStatus: ''
    },
    Myimages: {
      upimgId:'',
      VerifImage: '',
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
    Mydate1: {
      date1: '',
      date1Id: '',
      date1State: '',
    },
    Mydate2: {
      date2: '',
      date2Id: '',
      date2State: ''
    },
    Myregion: {
      region: '',
      regionId: '',
      regionState: ''
    },
    Mycontent: {
      longContent: '',
      createContent: '',
      contentId: '',
      contentState: ''
    }
  };
  var json = data.data

  // 频道ID
  channelId = json.categoryId ? json.categoryId : '';
  // 详情类型
  obj.type = json.type;
  // 当前详情的ID
  obj.id = json.id
  json.attributeList.forEach((v, i) => {

    // 标题
    if (v.id == 186) {
      obj.Myname.name = v.contentFragmentList[0].content ? v.contentFragmentList[0].content : '';
      obj.Myname.nameId = v.contentFragmentList[0].id
    }

    // 背景图
    if (v.id == 159) {
      if (v.contentFragmentList[0].resourceList) {
        obj.Myimages = {
          upimgId: v.contentFragmentList[0].id,
          VerifImage: v.contentFragmentList[0].resourceList[0] ? v.contentFragmentList[0].resourceList[0].uri.indexOf("http://") < 0 ? ossUrl + v.contentFragmentList[0].resourceList[0].uri : v.contentFragmentList[0].resourceList[0].uri : '',
          imagesArr: [
            {
              imagesUrl: v.contentFragmentList[0].resourceList[0] ? v.contentFragmentList[0].resourceList[0].uri.indexOf("http://") < 0 ? ossUrl + v.contentFragmentList[0].resourceList[0].uri : v.contentFragmentList[0].resourceList[0].uri : '',
              imagesUrlId: v.contentFragmentList[0].resourceList[0] ? v.contentFragmentList[0].resourceList[0].id : '',
              imagesState: ''
            },
            {
              imagesUrl: v.contentFragmentList[0].resourceList[1] ? v.contentFragmentList[0].resourceList[1].uri.indexOf("http://") < 0 ? ossUrl + v.contentFragmentList[0].resourceList[1].uri : v.contentFragmentList[0].resourceList[1].uri : '',
              imagesUrlId: v.contentFragmentList[0].resourceList[1] ? v.contentFragmentList[0].resourceList[1].id : '',
              imagesState: ''
            },
            {
              imagesUrl: v.contentFragmentList[0].resourceList[2] ? v.contentFragmentList[0].resourceList[2].uri.indexOf("http://") < 0 ? ossUrl + v.contentFragmentList[0].resourceList[2].uri : v.contentFragmentList[0].resourceList[2].uri : '',
              imagesUrlId: v.contentFragmentList[0].resourceList[2] ? v.contentFragmentList[0].resourceList[2].id : '',
              imagesState: ''
            },
          ]
        }
      } else {
        obj.Myimages = {
          upimgId: v.contentFragmentList[0].id,
          imagesArr: [
            {
              imagesUrl:  '',
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
            },
          ]
        }
      }

    }

    // 活动开始时间
    if (v.id == 211) {
      if (v.contentFragmentList) {
        if (v.contentFragmentList.length == 0) {
          obj.Mydate1.date1 = '';
          obj.Mydate1.date1Id = null
        } else {
          obj.Mydate1.date1 = v.contentFragmentList[0].content ? v.contentFragmentList[0].content : '';
          obj.Mydate1.date1Id = v.contentFragmentList[0].id
        }
      } else {
        obj.Mydate1.date1 = '';
        obj.Mydate1.date1Id = null;
      }
    }

    // 活动结束时间
    if (v.id == 212) {
      if (v.contentFragmentList) {
        if (v.contentFragmentList.length == 0) {
          obj.Mydate2.date2 = '';
          obj.Mydate2.date2Id = null;
        } else {
          obj.Mydate2.date2 = v.contentFragmentList[0].content ? v.contentFragmentList[0].content : '';
          obj.Mydate2.date2Id = v.contentFragmentList[0].id
        }
      } else {
        obj.Mydate2.date2 = '';
        obj.Mydate2.date2Id = null;
      }
    }

    // 地址
    if (v.id == 187) {
      if (v.contentFragmentList) {
        if (v.contentFragmentList.length == 0) {
          obj.Myregion.region = '';
          obj.Myregion.regionId = null;
        } else {
          obj.Myregion.region = v.contentFragmentList[0].content ? v.contentFragmentList[0].content : '';
          obj.Myregion.regionId = v.contentFragmentList[0].id;
        }
      } else {
        obj.Myregion.region = '';
        obj.Myregion.regionId = null;
      }
    }

    // 正文
    if (v.id == 163) {
      obj.Mycontent.longContent = v.contentFragmentList[0].content ? v.contentFragmentList[0].content : '';
      obj.Mycontent.createContent = v.contentFragmentList[0].content ? v.contentFragmentList[0].content : '';
      obj.Mycontent.contentId = v.contentFragmentList[0].id;
      // v.contentFragmentList.forEach((val, index) => {
      //   // 正文
      //   var objText = {
      //     maxtitle: val.subTitle,   // 子标题
      //     text: val.content,       // 内容
      //     images: [],    // 图片
      //   }
      //   val.resourceList.forEach((item, key) => {
      //     objText.images.push({
      //       _url: ossUrl + item.uri,
      //       title: item.description
      //     })
      //   })
      //   obj.longContent.push(objText)
      // })
    }
  });
  return obj;
};

/**
 * 获取资讯 编辑、查看、审核 ；  频道
 * @param data  获取的频道
 * @param code  新增为2： 不需要选中频道     其他为1： 需要根据获取的ID查到选中频道
 * @returns {{options: Array, value: string, label: string}}
 */
var channelData = function (data, code) {
  console.log('资讯频道//////////',  data, channelId)
  var channel = {
    options: [],
    value: '',
    label:''
  };

  data.forEach((item, index) => {
    channel.options.push(
      {value: item.value, label: item.label}
    );
    if(String(channelId) == item.value) {
      channel.label = item.label
    }
    if (code == 1) {
      channel.value = String(channelId)
    } else {
      channel.value = ''
    }
  })
  return channel;
};


/**
 * 保存、审核数据
 * @param data
 * @returns {{dataStatus: string, id: number, categoryId: number, lang: string, type: number, attributeList: *[]}}
 * @private
 */
var _setDataDetails = function (data) {
  console.log('需要的数据',data);
  // 初始化数据
  var obj = {
    "dataStatus": "",
    "id": "",      // 新增传null  编辑传当前的id
    "categoryId": "",   // 频道ID
    "lang": "chi",    // 默认chi中文  固定
    "type": "",
    "attributeList": [
      {
        "id": 186,               // 标题
        "contentFragmentList": [
          {
            "dataStatus": "",   // 当前为 资讯 / 活动
            "attributeId":"186",   // 属性ID 固定
            "id": '',                  // 标题ID
            "subTitle": null,     // 子标题
            "seq": null,        // 图片标题
            "dataTypeId": 0,
            "content": ""
          }
        ]
      },
      {
        "id": 211,          // 活动开始时间
        "contentFragmentList": [
          {
            "dataStatus": "",
            "attributeId":"211",
            "id": '',
            "subTitle": null,
            "seq": null,
            "dataTypeId": 0,
            "content": ""
          }
        ]
      },
      {
        "id": 212,          // 结束开始时间
        "contentFragmentList": [
          {
            "dataStatus": "",
            "attributeId":"212",
            "id": '',
            "subTitle": null,
            "seq": null,
            "dataTypeId": 0,
            "content": ""
          }
        ]
      },
      {
        "id": 187,          // 地址
        "contentFragmentList": [
          {
            "dataStatus": "",
            "attributeId":"187",
            "id": '',
            "subTitle": null,
            "seq": null,
            "dataTypeId": 0,
            "content": ""
          }
        ]
      },
      {
        "id": 163,   //图文
        "contentFragmentList": [
          {
            "dataStatus": "",
            "attributeId":"163",
            "id": "",
            "subTitle": null,
            "seq": null,
            "dataTypeId": 5,
            "content": ""
          }
        ]
      },
      {
        "id": 159,   // 图片
        "contentFragmentList": [
          {
            "dataStatus": "e",
            "attributeId":"159",
            "id": "",
            "subTitle": null,
            "seq": null,
            "dataTypeId": "7",
            "content": "",
            "resourceList": [
              // {
              //   "dataStatus": "u",
              //   "id": "",
              //   "type": 0,
              //   "uri": "",
              //   "resOrder": null,
              //   "description": null
              // }
            ]
          }
        ]
      }
    ]
  };

  // 赋值数据
  obj.dataStatus = data.dataStatus ? data.dataStatus : '';
  obj.categoryId = data.channel.value;
  obj.type = data.type;
  obj.id = data.id;

  obj.attributeList.forEach((item, index) => {
    // item.contentFragmentList[0].dataStatus = data.dataStatus;
    if (item.id == 186) {   // 标题
      item.contentFragmentList[0].id = data.Myname.nameId ? data.Myname.nameId : null;
      item.contentFragmentList[0].content = data.Myname.name ? data.Myname.name : null;
      item.contentFragmentList[0].dataStatus = data.Myname.nameStatus ? data.Myname.nameStatus : '';
    }
    if (item.id == 211) {   // 开始时间
      item.contentFragmentList[0].id = data.Mydate1.date1Id ? data.Mydate1.date1Id : null;
      item.contentFragmentList[0].content = data.Mydate1.date1 ? configUtils.FormatDate(data.Mydate1.date1, 1) : null;
      item.contentFragmentList[0].dataStatus = data.Mydate1.date1State ? data.Mydate1.date1State : ''
    }
    if (item.id == 212) {   // 结束时间
      item.contentFragmentList[0].id = data.Mydate2.date2Id ? data.Mydate2.date2Id : null;
      item.contentFragmentList[0].content = data.Mydate2.date2 ? configUtils.FormatDate(data.Mydate2.date2, 1) : null;
      item.contentFragmentList[0].dataStatus = data.Mydate2.date2State ? data.Mydate2.date2State : ''
    }
    if (item.id == 187) {  // 地址
      item.contentFragmentList[0].id = data.Myregion.regionId ?  data.Myregion.regionId : null;
      item.contentFragmentList[0].content = data.Myregion.region ? data.Myregion.region : null;
      item.contentFragmentList[0].dataStatus = data.Myregion.regionState ? data.Myregion.regionState : ''
    }
    if (item.id == 163) {  // 图文
      item.contentFragmentList[0].id = data.Mycontent.contentId ?  data.Mycontent.contentId : null;
      item.contentFragmentList[0].content = data.Mycontent.createContent ? data.Mycontent.createContent : null;
      item.contentFragmentList[0].dataStatus = data.Mycontent.contentState ? data.Mycontent.contentState : ''
    }


    if (item.id == 159) {  // 头图
      item.contentFragmentList[0].id = data.Myimages.upimgId ?  data.Myimages.upimgId : null;
      item.contentFragmentList[0].resourceList = [];   // 初始化图片数据
      data.Myimages.imagesArr.forEach((val, key) => {
        item.contentFragmentList[0].resourceList.push(
          {
            dataStatus: val.imagesState ? val.imagesState : '',
            id: val.imagesUrlId ?  val.imagesUrlId : null,
            type: 0,
            uri: val.imagesUrl ? val.imagesUrl : "",
            resOrder: null,
            description: null
          }
        )
      })
    }
  });
  return obj;
};


// 成功消息提示
var SeccessMessage = function (name) {
  _thisMess.$message({
    type: 'success',
    message: name + '成功!'
  });
  setTimeout(function () {
    _thisMess.$router.go(-1)
  },500)
}
// 失败消息提示
var ErrorMessage = function (name) {
  _thisMess.$message({
    showClose: true,
    message: name + '失败',
    type: 'error'
  });
}
// 取消消息提示
var CancelMessage = function (name) {
  _thisMess.$message({
    type: 'info',
    message: '已取消' + name
  });
}









export default {
  DataProce,
  channelData,
  _setDataDetails,
  ResetData,
  SeccessMessage,
  ErrorMessage,
  CancelMessage
}
