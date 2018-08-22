/**
 公共配置
 */
window.config = {
  //用于密码传输的最后一位的加密
  secretKey: "103648046131812lhsxr",
  accessToken: "",
  domain: "http://192.168.1.205:8080", // 测试名地址
  // domain: "http://192.168.1.130:8080", // 测试名地址
  // domain: "http://192.168.1.39:8081", // 测试名地址 勿删tianci测试用
  // domainImages: "http://192.168.1.181:8080", // 测试上传图片域名地址
  //domain: "http://192.168.1.183:8080", // 测试名地址 勿删tianci测试用
  // domain: "http://192.168.1.192:8080", // 测试详情页域名地址
  //domain: "http://192.168.1.39:8081", // 测试名地址 勿删tianci测试用

  app:{
    login: "/user/login",
    getList: "/information/searchListByCondition",
    details: "/information/get", // 详情页接口
    upImage: "/file/upImage",  // 上传图片接口
    detailsUpload: "/information/save",   // 详情页上传接口
    userlist:'user/getUserList',      //获取账户列表页面
    saveAndSubmit: "/information/saveAndSubmit",  // 提交审核接口
    publish: "/information/publish",   // 发布接口
    unapprove: "/information/unapprove",  // 审核不通过接口
    channel: "/ichCategory/getInformationCategory", // 获取全部频道
    operater: "/user/getAllOperaterList", // 获取全部操作人
    source: "/dictionary/selectSourceListByType", // 获取全部来源
    updatebtn:"/user/updateUser",    //更新按钮，停用用户或者启动用户按钮
    getpartment:"/department/getAllDepartment",  //获取部门的信息
    register:"/user/register"  , //注册保存
    editstore:"/user/updateUser"  //账号编辑保存
  },
  oss: {
    url: "http://diich-resource.oss-cn-beijing.aliyuncs.com/",   // 域名
    type: {                             // 文件类型
      image: "image/"                   // 图片
    },
    name: "information/"              // 资讯、活动 文件夹名称
  },
  examine: {
    PUBLISH: 0,
    DELETED: 1,
    DRAFT: 2,
    TOAUDIT: 3,
    DISQUALIFICATION: 4,
    OVERDUE: 5,
    WITHDRAW: 6,
    CHECKED: 7,
    STANDARD: 10,
    properties: {
      // show 0不限  1显示
      0: {label: "已发布", value: 0, show: 1},
      1: {label: "已经删除", value: 1, show: 0},
      2: {label: "未提审", value: 2, show: 1},
      3: {label: "待审核", value: 3, show: 1},
      4: {label: "审核不通过", value: 4, show: 1},
      5: {label: "版本过期作废状态", value: 5, show: 0},
      6: {label: "已撤回", value: 6, show : 1},
      7: {label: "已审核", value: 7, show: 0},
      10: {label: "标杆案例", value: 10, show: 0}
    }
  },
  dateTerm: {
    creationTime: 0,
    updateTime: 1,
    trialTime: 2,
    release: 3,
    properties: {
      0: {label: "创建日期", value: 0, show: 1},
      1: {label: "最终修改日期", value: 1, show: 1},
      2: {label: "提审日期", value: 2, show: 1},
      3: {label: "发布日期", value: 3, show: 1},
    }
  }
};

export default {
  config,
}


