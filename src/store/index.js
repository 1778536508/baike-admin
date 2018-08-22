import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import encyList from './modules/ency/list'
import consultList from './modules/consult/list'
import activityList from './modules/activity/list'
import materialList from './modules/material/list'
import login from './modules/login/index'
import userlist from './modules/login/loginlist'
import ConsultDetails from './modules/consult/details'
import ActivityDetails from './modules/activity/details'
import  loginbasic from './modules/login/loginadd'

// 引入 axios
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
	// state,
	getters,
	actions,
	modules:{
		login, // 登录
		encyList,
		consultList, // 咨询列表
    userlist, //账号管理列表
    activityList, // 活动列表
		materialList, // 抓取素材列表
    ConsultDetails,    // 资讯详情
    ActivityDetails,   // 活动详情
    loginbasic
	}

})
