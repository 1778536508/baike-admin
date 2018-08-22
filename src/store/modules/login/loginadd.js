
import api from './../../fetch/api';
import login from "./index";
const state = {
  loginbasicmsg:{
    basic:{
      loginaddname: '',
      loginaddpassword:'',
      loginaddregion: '',
      loginaddrealname:''
    },
    rules: {
      loginaddname: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 1, max: 20, message: '长度需在1到20个字符', trigger: 'blur' },
        {pattern: "^[A-Za-z0-9]+$", message: '账号仅可输入英文、数字'}
      ],
      loginaddpassword:[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' },
        {pattern: "^[A-Za-z0-9]+$", message: '密码仅可输入英文、数字'}
      ],
      loginaddrealname: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' },
        {pattern: "^[\u4E00-\u9FA5]{1,10}$", message: '姓名仅可输入汉字'}

      ],
    },

  },

  logindepartment:[]

};

const getters = {
  loginbasicmsg: function(state) {
    return state.loginbasicmsg
  },
  logindepartment:function (state) {
    return state.logindepartment
  },


}

const actions = {

//新增账号
  commitmsg(context){
    var url = $config.default.config;
   let comitmsg = {};
    comitmsg.loginName = context.state.loginbasicmsg.basic.loginaddname;
    comitmsg.name = context.state.loginbasicmsg.basic.loginaddrealname;
    comitmsg.password = b64_md5(context.state.loginbasicmsg.basic.loginaddpassword);
    comitmsg.deptId = context.state.loginbasicmsg.basic.loginaddregion;
    console.log(JSON.stringify(comitmsg));
    //console.log(url.app.register)
    login.actions.axiosHeader();
   api.$http(url.app.register,comitmsg,0).then(function (response) {
     console.log(response);
     window.location.href = window.location.origin +"/#/menu/usermanage"
     //
   })

  },
//编辑的保存按钮
  editstoremsg(context){
    var url = $config.default.config;
    let comitmsg = {};
    comitmsg.loginName = context.state.loginbasicmsg.basic.loginaddname;
    comitmsg.name = context.state.loginbasicmsg.basic.loginaddrealname;
   if(context.state.loginbasicmsg.basic.loginaddpassword ){
     comitmsg.password = b64_md5(context.state.loginbasicmsg.basic.loginaddpassword);
   }

   comitmsg.deptId = context.state.loginbasicmsg.basic.loginaddregion;
    comitmsg.id = login.actions.getCookie("clickuserId");
    console.log(JSON.stringify(comitmsg));
    //console.log(url.app.register)
    login.actions.axiosHeader();
    api.$http(url.app.editstore,comitmsg,0).then(function (response) {
      console.log(response);
      window.location.href = window.location.origin +"/#/menu/usermanage"
    })
  },
//时间戳转换
  add0(m){return m<10?'0'+m:m },
  timeFormat(timestamp){
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year+'-'+actions.add0(month)+'-'+actions.add0(date)+' '+actions.add0(hours)+':'+actions.add0(minutes)+':'+actions.add0(seconds);
  },
  getdate(value){
    return   /\d{4}-\d{1,2}-\d{1,2}/g.exec(value)
  },
  //获取部门信息
  getdeparment(context){
    //console.log("----6666>",context)
    var url = $config.default.config;
    login.actions.axiosHeader();
    api.$http(url.app.getpartment,{},1).then(function (response) {
      //console.log(response);
    //console.log(context)
      context.state.logindepartment=response.data;
      //console.log(context.state.logindepartment)
     context.state.loginbasicmsg.basic.loginaddregion = response.data[0].id;
    })
  },
  //获取基本信息，然后回填//编辑页面
  getuserMsg (context){
    var clickId = login.actions.getCookie("clickuserId");

    //console.log("点击信息",userdata);
    var clickmsg = {};
    clickmsg.id = clickId;
    var url = $config.default.config;
    login.actions.axiosHeader();
    api.$http(url.app.userlist,clickmsg,1).then(function (response) {
      console.log("账号的基本信息",response);
      //window.location.href = window.location.origin +"/userlist#/usermanage"
      var targetmsg = context.state.loginbasicmsg.basic;
      targetmsg.loginaddname = response.data[0].loginName;
      targetmsg.loginaddrealname=response.data[0].name;
      targetmsg.loginaddpassword = '';
      targetmsg.loginaddregion=response.data[0].deptId;
      console.log("传给编辑的信息",targetmsg)

      //window.location.href = window.location.origin+"/userlist#/usermanage"
    });


  },
  //新增时候清空信息
  clearMsg(context){
    var targetmsg = context.state.loginbasicmsg.basic;
    targetmsg.loginaddname = '';
    targetmsg.loginaddrealname='';
    targetmsg.loginaddpassword = '';
    //actions.getdeparment();
    context.dispatch("getdeparment")
  }


}

const mutations = {
  registername:function(state, value) {
    state.loginbasicmsg.basic.loginaddname = value;
  },
  registerpassword:function (state,value) {
    state.loginbasicmsg.basic.loginaddpassword = value;
  },
  registeregion:function (state,value) {
    state.loginbasicmsg.basic.loginaddregion = value;
  },
  registerrealname:function (state,value) {
    state.loginbasicmsg.basic.loginaddrealname = value;
  }

}




export default {
  state,
  getters,
  actions,
  mutations
}

