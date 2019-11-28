import Vue from 'vue'
import App from './App'
// import api from '@/common/vmeitime-http/'
import Common from './common/common'
import store from './store/index.js'
import './static/theme.css'
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.Common = Common

const app = new Vue({
    store,
	...App
})
app.$mount()
