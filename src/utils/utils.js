/**
* 全局工具类
* @author zhangtianci
*/
import store from '../store/index.js'
/*
 *	格式化时间
 */
function FormatDate(time, hms) {
	var date = new Date(time);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = date.getDate() < 10 ? '0'+ date.getDate() : date.getDate();
	if (hms) {
    var h = date.getHours() > 9 ? date.getHours() + ':' : '0' + date.getHours() + ':';
    var m = date.getMinutes() > 9 ? date.getMinutes() + ':' : '0' + date.getMinutes() + ':';
    var s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    // console.log(Y+M+D+h+m+s);
    return Y+M+D+ ' ' + h+m+s
  } else {
    return Y+M+D;
  }
}

/*
 *	构建列表参数
 */
function bulidListParams(obj) {
	console.log("obj --- >", obj);
	var params = {
		offSet: obj.pageNo, // 分页页数
		pageSize: obj.pageSize // 分页每页条数
	};
	if(obj['targetType'] != null && obj['targetType'].toString() != "") {
		params['targetType'] = obj['targetType']
	}
	if(obj['type'] != null && obj['type'].toString() != "") {
		params['type'] = obj['type']
	}
	if(obj['search'] != null && obj['search'].toString() != "") {
		params['keywords'] = obj['search']
	}
	// 频道
	if('selectChannel' in obj && obj['selectChannel'].toString() != "") {
		params['categoryId'] = obj['selectChannel']
	}
	// 状态
	if('selectStatus' in obj && obj['selectStatus'].toString() != "") {
		params['status'] = obj['selectStatus']
	}
	// 操作人
	if('selectOperator' in obj && obj['selectOperator'].toString() != "") {
		params['operatorId'] = obj['selectOperator']
	}
	// 来源
	if('selectSource' in obj && obj['selectSource'].toString() != "") {
		params['sourceCode'] = obj['selectSource']
	}
	// 时间检索
	if('datePicker' in obj && obj['datePicker'].length > 0 && 'dateTime' in obj && obj['dateTime'].toString() != "") {
		params['dateType'] = obj['dateTime'];
		params['searchDateStart'] = FormatDate(new Date(obj['datePicker'][0]).getTime());
		params['searchDateEnd'] = FormatDate(new Date(obj['datePicker'][1]).getTime());
	}

	// 排序 第一个
	switch (obj.mySort.ctime.type) {
		case window.config.dateTerm.properties[0].value:
			params['orderFirstParameter'] = 0;// 按创建时间排序
			break;
		case window.config.dateTerm.properties[2].value:
			params['orderFirstParameter'] = 1;// 按提审时间排序
		default:
			break;

	}
	// 排序 第二个
	switch (obj.mySort.utime.type) {
		case window.config.dateTerm.properties[1].value:
			params['orderSecondParameter'] = 0;// 最终修改时间
			break;
		case window.config.dateTerm.properties[3].value:
			params['orderSecondParameter'] = 1;// 发布时间
		default:
			break;
	}
	params['firstOrderType'] = (obj.mySort.ctime.status ? 1 : 0); // 创建时间、提审时间排序规则
	params['secondOrderTyp'] = (obj.mySort.utime.status ? 1 : 0); // 修改时间、发布时间排序规则
	return params;
}


/**
*	构建列表展示数据
*/
function bulidListData(code, res) {
	var arr = res.data;
	var arrData = []; // 返回数据

	// 内部函数 获取提审、发布时间、状态
	function getField(obj) {
		var newObj = {};
		// 状态
	    var data = window.config.examine.properties;
		// 过滤
		for(let j in data) {
		    if(obj['status'] == data[j]['value']) {
		    	newObj['status'] = data[j]['label'];
		    	newObj['statusCode'] = data[j]['value'];
		    }
		}
	    if('ichObjectStatusRecordList' in obj && obj['ichObjectStatusRecordList'].length > 0) {
	    	var arr = obj['ichObjectStatusRecordList'];
	    	for(var i = 0; i < arr.length; i++) {
				if(arr[i]['processStatus'] == 0) {
					newObj['releaseTime'] = FormatDate(arr[i]['actionTime']); // 发布日期
				}

				if(arr[i]['processStatus'] == 3) {
					newObj['trialTime'] = FormatDate(arr[i]['actionTime']); // 提审日期
				}
	    	}
		    // console.log("处理过的 -- 》", newObj)
	    }
	    return newObj;
	}

	// 构建数据
	for(var i = 0; i < arr.length; i++) {
		var obj = {}; // 返回数组中的对象
		obj['id'] = arr[i]['id']; // 数据id
		obj['operator'] = arr[i]['user'] ? arr[i]['user']['name'] : ""; // 操作人
		obj['type'] = arr[i]['type'];
		// console.log(arr[i]['user'] ? "1" : "2")
		switch (code) {
			case "consult":
				obj['channel'] = arr[i]['ichCategory']['name']; // 频道
				obj = Object.assign(obj, getField(arr[i])); // 获取提审、发布时间、状态并且合并对象
				break;
			case "material":
				obj['createdTime'] = FormatDate(arr[i]['createTime']); // 创建时间
				obj['updateTime'] = FormatDate(arr[i]['updateTime']); // 最终修改时间
				break;
			case "activity":
				obj = Object.assign(obj, getField(arr[i])); // 获取提审、发布时间、状态并且合并对象
				break;
			default:
				break;
		}
		obj = Object.assign(obj, bulidAttribute(code, arr[i].attributeList)); // 获取attribute内容并且合并
		arrData.push(obj);
	}
	res.data = arrData;
	return res;
}

// 循环所有attribute  获取所需内容
function bulidAttribute(name, attributes) {
	var obj = {};
	for(var j = 0; j < attributes.length; j++) {
		if('contentFragmentList' in attributes[j] && attributes[j]['contentFragmentList'].length > 0) {
			// 数据title
	        if(attributes[j]['id'] == "186") {
	        	obj['title'] = attributes[j]['contentFragmentList'][0]['content'];
	        }
	        // 数据 来源
	        if(attributes[j]['id'] == "214") {
	        	var source = store.state.materialList.materialQuery.selectSource
	        	for(var i = 0; i < source.length; i++) {
	        		if(source[i]['value'] == attributes[j]['contentFragmentList'][0]['content']) {
	        			obj['source'] = source[i]['label'];
	        			break;
	        		}
	        	}
	        }
		}

    }
    return obj;
}

// 根据key 获取 cookie 中的数据
function getCookie(name){
	var arr,reg=new RegExp("(^| )*"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
     	return unescape(arr[2]);
    } else {
    	return null
    }
}

function xx() {
	var params = {

	}
	return params;
}


export default {
	FormatDate,
	bulidListParams,
	bulidListData,
	getCookie
}
