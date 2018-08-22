import api from './../../fetch/api';
import router from '../../../router/index'
const state = {
  accessToken: '',
  username:'',
  password:'',
  passwordend:'',
  ifempty:false,
  userType:1,
  iflogin:false
}

const getters = {
  accessToken: function(state) {
    return state.accessToken
  },
  username:function (state) {
    return state.username

  },
  password:function (state) {
    return state.password
  },
  iflogin:function (state) {
    return state.iflogin
  }
}
// 定义方法
const actions = {
  checkMes(context) {
    if(context.state.ifempty){
      //此处为对密码进行加密
      let passwordstep1=b64_md5(context.state.password);
      let stamp = (new Date()).valueOf();
      var url = $config.default.config;
      let passwordstep2 = context.state.username+passwordstep1+stamp+url.secretKey;
      context.state.passwordend = b64_md5(passwordstep2);

      //此处是要传的参数合集
      var commitmes = {account :context.state.username, password:context.state.passwordend, stamp:stamp};
      console.log(JSON.stringify(commitmes));
      document.cookie = "username="+context.state.username;

      //此处是给后台传参数
      api.$http(url.app.login, commitmes,1)
      .then(function (response) {
        //console.log(response);
        if(response.code==0){
          console.log('DENGLU --- >', response)
          url.accessToken = response.data.accessToken;
          context.state.accessToken =response.data.accessToken;
          document.cookie = "accessToken="+response.data.accessToken;
          document.cookie = "isLogin=true"; // 用户已经登录
          actions.axiosHeader(context)
          router.replace({path:'menu/welcome'});
          }
      })
    }
  },
  axiosHeader (context){
      var axiosheader = {};
    //console.log(context)
      axiosheader.Authorization = actions.getCookie("accessToken");
    //计算签名
     var stamp = (new Date()).valueOf();
     var signaturebefore = actions.getCookie("username")+actions.getCookie("accessToken")+stamp+$config.default.config.secretKey;
     var signatureafter = b64_md5(signaturebefore);
    //  console.log("username====>"+actions.getCookie("username"));
    // console.log("accesstoken====>"+actions.getCookie("accessToken"));
    // console.log("secretKey=====>"+$config.default.config.secretKey)
    axiosheader.diich =stamp+" "+signatureafter;
    //console.log(axiosheader);
    return axiosheader;

  },
  popwindow (mess){
    this.$alert(mess, '错误提示', {
      confirmButtonText: '确定',
    });
  },
  getCookie(name){
  var strCookie=document.cookie;
  var arrCookie=strCookie.split("; ");
  for(var i=0;i<arrCookie.length;i++){
    var arr=arrCookie[i].split("=");
    if(arr[0]==name)return arr[1];
  }
  return "";
},
  loginout(){
    alert(1)
    window.location.href = window.location.origin +"/login"
  }

}
//
const mutations = {
  updateUsername: function(state, value) {
    state.username = value;
    if(state.username==''&&state.password==''){
      state.ifempty = false;
    }else{
      state.ifempty = true
    }
  },
  updatePassword: function(state, value) {
    state.password = value;
    if(state.username==''&&state.password==''){
      state.ifempty = false;
    }else{
      state.ifempty = true
    }
  },
  "ifloginmethod":function (state,value) {
    state.iflogin = value;

  }
}


export default {
	state,
	getters,
	actions,
	mutations
}
