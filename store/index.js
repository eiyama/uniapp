import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: false,//是否需要强制登录
        hasLogin: false,
        userName: "",
        userId:'',
        token:'',
        pointId:'',
		appId:'',
    },
    mutations: {
        login(state, user) {
            state.userName = user.username || '';
            state.hasLogin = true;
            state.userId = user.id || '';
            state.token = user.token || '';
            state.pointId = user.pointId || '';
        },
        logout(state) {
           state.userName = "";
           state.hasLogin = false;
           state.userId = '';
           state.token = '';
           state.pointId = '';
        },
		TOKEN(state,data){
			state.token = data;
			uni.setStorageSync('token', data);
		},
		APPID(state,data){
			state.appId = data;
			// console.log(data)
			uni.setStorageSync('appId', data);
		}
		
    }
})
export default store