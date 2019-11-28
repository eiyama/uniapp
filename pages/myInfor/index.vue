<template>
	<view class="content">
		<view class="content_header">
			<view class="head-info" @click="modify">
				<!-- <div>
				 <img class="ico-head" :src="headImageUrl ? headImageUrl: avatar" alt="" @click="uploadHeadImg">
				    <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" /> 
				</div> -->
				<h2>{{ accountName }}</h2>
				<image :src="rightImg" style="position: absolute;left:90%;width:20px;height:20px;"></image>
				<text style="color:#E5E5E5" v-show="userName">{{ userName }}</text>
				<br />
				<text style="color:#E5E5E5" v-show="sellerName">{{ sellerName }} - {{ sellerDeptName }}</text>
			</view>
		</view>
		<!-- <view @click="toLogin">退出登录</view> -->
	</view>
</template>

<script>
import { http, test } from './../../common/request-http';
export default {
	data() {
		return {
			accountName: '',
			sellerName: '',
			userName: '',
			sellerOrgName: '',
			sellerDeptName: '',
			userId: '',
			rightImg: '/static/images/w-right.png'
		};
	},
	async onLoad() {
		if (uni.getStorageSync('userId')) {
			this.userId = uni.getStorageSync('userId');
		}
		await http.get('Users/Me').then(res => {
			if (res.result) {
				if (res.result.userId) {
					uni.setStorageSync('userId', res.result.userId);
				}
				this.accountName = res.result.accountName;
				this.userName = res.result.accountName;
				this.sellerName = res.result.sellerOrgName;
				this.sellerDeptName = res.result.sellerDeptName;
				this.sellerOrgName = res.result.sellerOrgName;
				this.userId = res.result.userId;
			}
		});
		await http.get('Users/' + this.userId + '/Salesman').then(res => {
			if (res.result) {
				this.accountName = res.result.name;
				this.userName;
			}
		});
	},
	methods: {
		toLogin() {
			uni.removeStorageSync('token');
			uni.removeStorageSync('appId');
			uni.navigateTo({
				url: '/pages/home/login/login'
			});
		},
		modify() {
			uni.navigateTo({
				url: '/pages/myInfor/myinfor'
			});
		}
	}
};
</script>

<style>
.content_header {
	padding-left: 30px;
	padding-top: 50px;
	padding-bottom: 130px;
	background-color: #2d54ff;
}

.ico-head {
	float: left;
	width: 72px;
	height: 72px;
	background-color: #f0f0f0;
	border-radius: 50%;
}

.content_header .head-info {
	float: left;
	margin-left: 14px;
	color: #fff;
}

.content_header .head-info h3 {
	font-weight: bold;
	font-size: 16px;
	color: #fff;
}
</style>
