  /**
  * $http模块提供统一ajax异步请求、最核心的与后台交互工具模块
  * @module $http
  * @author zhangtianci
  */
  import axios from 'axios'
  import login from './../modules/login/index'
  import _this from '../../main.js'
  import utils from '../../utils/utils';
  import store from '../index'
  import { Message } from "element-ui";
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.baseURL = window.config.domain;
  let code = 0;
  //http request 拦截器
  axios.interceptors.request.use(
    config => {

       if(utils.getCookie('isLogin')) {
        // console.log(config);
         //login.actions.axiosHeader();
         //console.log("axios diich=====>"+login.actions.axiosHeader().diich)
         config.headers.Authorization = login.actions.axiosHeader().Authorization;
         config.headers.diich =login.actions.axiosHeader().diich;
       }else{
         //console.log(config);
         //判断是否是登录页面的接口，如果是的话，不需要进行任何拦截
         //alert("没有登录");
         if(config.url.indexOf("user/login") != -1 ){
          // alert("是登录接口，不需要跳转")
         }else{
           //非登录接口
           window.location.href = window.location.origin+"/#/login";
           return;
         }
         //window.location.href = window.location.origin+"/#/login"
         //return
      }

      //console.log("头部信息", axios.defaults.headers)
      //console.log("api----->",utils.getCookie('isLogin'));


      // console.log("store -- >", store);
      // if(store.state.login.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      //   config.headers.Authorization = ""
      // }
      // console.log("config ---", config)
      // const token = getCookie('名称'); //注意使用的时候需要引入cookie方法，推荐js-cookie
      // config.data = JSON.stringify(config.data);
      // config.headers = {
      //   'Content-Type':'application/x-www-form-urlencoded'
      // }
      // if(token){
      //   config.params = {'token':token}
      // }
      return config;
    },
    error => {
      return Promise.reject(error.data.error.message);
    }
  );


  //http response 拦截器
  axios.interceptors.response.use(
    response => {
      if(response.data.code != 0 && code == 0) {
        code = 1
        var msg = "错误码 code:"
        + response.data.code
        + " msg:"
        + response.data.msg
        + " 请联系管理员"
        _this.$alert(msg, '系统错误提示：', {
          confirmButtonText: '确定',
          callback: action => {
            code = 0;
          }
        })
      } else {
        return response;
      }
    },
    error => {
      if(code == 0) {
        code = 1
        _this.$alert("系统异常，请联系管理员", '系统异常提示：', {
          confirmButtonText: '确定',
          callback: action => {
            code = 0;
          }
        })
      } else {
        return Promise.reject(error)
      }
    }
  )

  /**
   * 统一封装ajax调用
   * @method fetch
   * @author zhangtianci
   * @param {url, params, methode} url 请求地址, params 请求参数, method : 请求方式 0:psot  1: get
   * @return 返回接口结果
  */
  export function fetch(url, params, method) {
      login.actions.axiosHeader();
      return new Promise((resolve, reject) => {
        console.log("url -- >", url, params)
          if(method == 0) {
            axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
          } else {
            // console.log("xxx-url :", url,  "params :", params)
            axios.get(url, {params: params})
            .then(response => {
              if(!response.data) {
                response.data = {};
              }
              resolve(response.data)
            })
          }
      })
  }
  export default {
    // 获取我的页面的后台数据
    $http(url, params, method) {
      return fetch(url, params, method)
    }
  }


