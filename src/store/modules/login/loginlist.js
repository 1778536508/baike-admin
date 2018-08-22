import api from './../../../store/fetch/api';
import login from "./index";
const state = {
  logintableData:[],
  aosmsg:{pageNo:'1',pageSize:"10"},
  logintotal:0
}

const getters = {
  userlist: function(state) {
    return state.logintableData
  },
  aosmsg:function (state) {
    return state.aosmsg

  },
  logintotal:function (state) {
    return state.logintotal

  },

}

const actions = {
  getlist(context){
    console.log(context)
   // console.log(login.actions.axiosHeader(context));
    var url = $config.default.config;
    var logintableData=[];
   // console.log(url.app.userlist);
    //console.log(context.state.aosmsg);
    //login.actions.axiosHeader();
    //console.log(login.actions.axiosHeader());
    console.log("获取列表所传数据",context.state.aosmsg)
    api.$http(url.app.userlist,context.state.aosmsg,1).then(function (response) {
      console.log(response);
      logintableData=[];
      var importantmsg = {};
      context.state.logintotal = Number(response.total);
      for(var i = 0;i<response.data.length;i++){
        importantmsg={};
        importantmsg.userId = response.data[i].loginName;
        importantmsg.username = response.data[i].name ;
        importantmsg.createdTime = actions.getdate(actions.timeFormat(response.data[i].createTime))[0];
        importantmsg.id = response.data[i].id;
        //0代表可以使用  1代表停用
        var controlstatus = response.data[i].status;
        if(controlstatus==0){
          importantmsg.state=1;
        }else if(controlstatus==1){
          importantmsg.state=0;
        }
        logintableData.push(importantmsg);
        }
      console.log(logintableData);
      context.state.logintableData= logintableData;
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
  //0代表是使用 1代表是停用状态
  //停用
  updateuse (context,ind){
    var url = $config.default.config;
    console.log("ind===="+ind);
    console.log(context.state.logintableData[ind]);
    let updatemsg = {};
    updatemsg.id = context.state.logintableData[ind].id;
    updatemsg.userType =1;
    updatemsg.status = context.state.logintableData[ind].state;
    console.log(updatemsg);
    console.log(login.actions.getCookie("username"));
   let usernamelocal = login.actions.getCookie("username")
    login.actions.axiosHeader();
   let ifuseonelogin = false;
   if(usernamelocal == context.state.logintableData[ind].userId&&updatemsg.status == 1){
     ifuseonelogin = true;
   }
   console.log(context.state.logintableData[ind].userId)
    api.$http(url.app.updatebtn,updatemsg,0).then(function (reponse) {
      console.log(reponse);
      //alert("success")
      if(ifuseonelogin){
          //document.cookie = "isLogin = ";
          window.location.href= window.location.origin +"/login";
          //document.cookie = "isLogin = ";
          //window.location.reload()
      // window.location.location = window.location.origin +"/login"
      }
        actions.getlist(context)


    })
  },


}

const mutations = {

}




export default {
  state,
  getters,
  actions,
  mutations
}

