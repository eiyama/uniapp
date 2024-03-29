import Request from './request'
import {mapState,mapMutations} from 'vuex'
import store from './../../store/index.js'
const test = new Request()

var appId ,token ;
	if(uni.getStorageSync("appId") || store.state.appId ){
	 appId =  uni.getStorageSync("appId") || store.state.appId
	}
	
	if (uni.getStorageSync("token") || store.state.token ) {
	  token = uni.getStorageSync("token") || store.state.token;
	  token = token.replace(appId + '_', '');
	}
	// uni.getStorage({
	// 	key:'appId',
	// 	success: function (res) {
	// 	        appId = res.data;
	// 	    }
	// });
	// uni.getStorage({
	// 	key:'token',
	// 	success: function (res) {
	// 	        token = res.data;
	// 			 token = token.replace(appId + '_', '')
	// 	    }
	// });
	
	var root = '';
	// 判断是否为微信
if(process.env.NODE_ENV ==='development' && uni.getSystemInfoSync().platform ==='devtools'){
	// console.log(process.env.NODE_ENV)
	root = 'http://apis.bandins.cn/'
	
	}

test.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = root;
  config.header = {
    ...config.header,
  }
  return config
})


test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	  if(appId){
		config.header = {
			 ...config.header,
			"x-appid": appId
		}
	  }
	  if (token) {
	    token = token.replace(appId + '_', '');
		config.header= {
			 ...config.header,
			"Authorization": token			
		} 
	  }
	  
  // config.header = {
  //   ...config.header,
  //   a: 3
  // }
  
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Object } response - 请求响应体（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
test.validateStatus = (response) => {
  return response.statusCode === 200
}

test.interceptor.response((response) => { /* 请求之后拦截器 */
	


  return response
}, (response) => { // 请求错误做点什么
  return response
})

const http = new Request()


http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = root /* 根域名不同 */
  config.header = {
    ...config.header,
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Object } response - 请求响应体（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (response) => {
  return response.statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */

if(uni.getStorageSync("appId") || store.state.appId ){
	 appId =  uni.getStorageSync("appId") || store.state.appId
	}
	
	if (uni.getStorageSync("token") || store.state.token ) {
	  token = uni.getStorageSync("token") || store.state.token;
	  token = token.replace(appId + '_', '');
	}
 if(appId){
 		config.header = {
 			 ...config.header,
 			"x-appid": appId
 		}
 }

 if (token) {
   token = token.replace(appId + '_', '');
 		config.header= {
 			 ...config.header,
 			"Authorization": token			
 		} 
 }

  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
  return response.data
}, (response) => { // 请求错误做点什么
  return response.data
})

export {
  http,
  test
}
