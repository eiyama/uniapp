<template>
	<view class="content">
		<!-- <view></view> -->
		<view>
			<text class="title">欢迎登录{{organizationName}}</text>
			<view class="userName">
				<view class="title">用户名：</view>
				<input class="uni-input" type="text" v-model="requestLogin.userName" placeholder="请输入" />
			</view>
			<view class="userName">
				<view class="title">密码：</view>
				<input class="uni-input" password type="text" v-model="requestLogin.password" placeholder="请输入" />
			</view>
			<button type="primary" @click="submitBtn">提交</button>
		</view>
		<view>
			还没有账号？
		</view>
		<button type="primary" @click="register">注册</button>
	</view>
</template>

<script>
	// import isssg from './../../utils/http-request/index.js';
	import {http,test} from './../../../common/request-http';
	// const http = new Request();
	export default {
		data() {
			return {
				requestLogin: {
					userName: '',
					password: ''
				},
				appid: '',
				organizationName:''
			};
		},
		onLoad(option) {
			// console.log(this.$store.commit('APPID',this.appid));
			if (option.appId) {
				this.appid = option.appId;
				uni.setStorageSync('appId', this.appid);
				this.$store.commit('APPID',this.appid)
			}
			if(uni.getStorageSync('appId')){
				this.appid = uni.getStorageSync('appId');
				this.$store.commit('APPID',this.appid)
			}
			http.get('apis/apps/' + this.appid + '/H5').then(res => {
					this.organizationName = res.result.name;
				})
				.catch(err => {});

		},
		methods: {

			submitBtn() {
				http.post('/token', this.requestLogin)
					.then(res => {
						if (res) {
							this.$store.commit('TOKEN', res.result.token);
							uni.setStorageSync('token', res.result.token);
							uni.switchTab({
								url: '/pages/home/index',
								 success: function (e) {
								   let page = getCurrentPages().pop();  //跳转页面成功之后刷新页面
								   if (!page) return;  
								   page.onLoad();
								    }
							});
						}
					})
					.catch(err => {});
			},
			register(){
				uni.navigateTo({
				    url: '../register/register'
				});
			}
		}
	};
</script>

<style>
	.userName {
		display: flex;
		justify-content: space-between;
		padding: 5px 15px;
		align-items: center;
	}

	.content {
		padding: 15px;
	}

	#tel_input {}
</style>
