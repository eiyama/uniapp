<template>
		<!-- <div class="quoteInfo" style="background-color:#FFF">
		<div>
		  <div class="mint-wrap" :class="{ 'toQuote': isSelectIns }">
			<div class="fixed-navbar" :style="{ width: size + '%' }" v-show="isSelectIns"></div>
			<mt-navbar class="quote-tab" fixed v-model="selected" v-show="isSelectIns">
			  <mt-tab-item class="nav-item" id="1"><span class="t-dot">1</span>填车辆信息</mt-tab-item>
			  <mt-tab-item :class="{ 'nav-item': isScheme }" id="2"><span class="t-dot">2</span>选车险方案</mt-tab-item>
			  <mt-tab-item :class="{ 'nav-item': isResult }" id="3"><span class="t-dot">3</span>看报价结果</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected">
			
			  <mt-tab-container-item id="1">
				<vehicleInfo v-show="isSelectIns" ref="vehicleInfo" v-on:child-vehicle="getListenVehicle"></vehicleInfo>
			  </mt-tab-container-item>
			 
			  <mt-tab-container-item id="2">
				<insureScheme ref="insureScheme" v-on:child-scheme="getListenScheme"></insureScheme>
			  </mt-tab-container-item>
			
			  <mt-tab-container-item id="3">
				<quoteList ref="quoteList" v-on:child-list="getListenList"></quoteList>
			  </mt-tab-container-item>
			</mt-tab-container>
		  </div>
		</div>
	  </div> -->
		<view>
			<view class="fixedHeader">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4A66FE"></uni-segmented-control>
			</view>
			<!-- <hr width="100%" color="#f5f5f5" size="1" style="margin-top: 15px ;" /> -->
			<view class="seleContent">
				<view v-show="current === 0"><vehicleInfo v-show="isSelectIns" ref="vehicleInfo" v-on:child-vehicle="getListenVehicle" :homeApp="homeApp"></vehicleInfo></view>
				<view v-show="current === 1"><insureScheme ref="insureScheme" v-on:child-scheme="getListenScheme"></insureScheme></view>
				<view v-show="current === 2"><quoteList ref="quoteList" v-on:child-list="getListenList"></quoteList></view>
			</view>
		</view>
</template>
<script>
import vehicleInfo from './vehicleInfo';
import insureScheme from './insureScheme';
import quoteList from './quoteList';
// import selectIns from './selectIns';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	name: 'quoteInfo',
	data() {
		return {
			selected: '1',
			btnSelIns: false,
			size: 66.66,
			isResult: false,
			isScheme: false,
			isSelectIns: true,
			renewalCode: '',
			cityCode: '',
			cityName: '',
			appId: '',
			from: '',
			customerId: '',
			items: ['1填写车辆信息', '2选车险方案', '3看报价结果'],
			current: 0,
			homeApp:{}
		};
	},
	components: {
		vehicleInfo,
		insureScheme,
		quoteList,
		uniSegmentedControl
	},
	methods: {
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		},
		closeBack: function() {
			if (this.from == 'cust') {
				this.$router.push({ path: '/customerManagement/custDetail?customerId=' + this.customerId });
			} else if (this.from == 'policyList') {
				this.$router.push({ path: '/quoteManagement/insList' });
			} else if (this.from == 'carInCustomers') {
				this.$router.push({ path: '/quoteManagement/carInCustomers' });
			} else {
				var appIdParam = {
					appId: this.appId
				};
				this.$router.push({ path: '/', query: appIdParam });
			}
		},
		goBack() {
			if (this.selected == '3') {
				this.selected = '2';
				return;
			}
			if (this.selected == '2') {
				this.selected = '1';
				return;
			}
			if (this.selected == '1') {
				// console.log(this.selected)
				this.closeBack();
				// break;
			}
		},
		getListenVehicle: function(data) {
			this.selected = data.num;
			this.size = data.size;
			this.isScheme = data.isScheme;
		},
		getListenList: function(data) {
			this.isSelectIns = data.isSelectIns;
			if (data.num) this.selected = data.num;
			if (data.size) this.size = data.size;
			if (data.isResult) this.isResult = data.isResult;
			if (data.btnSelIns) this.btnSelIns = data.btnSelIns;
			if (data.renewalCode) this.renewalCode = data.renewalCode;
			if (data.cityCode) this.cityCode = data.cityCode;
			if (data.cityName) this.cityName = data.cityName;
		},
		getListenScheme: function(data) {
			this.isSelectIns = data.isSelectIns;
			if (data.num) this.selected = data.num;
			if (data.size) this.size = data.size;
			if (data.isResult) this.isResult = data.isResult;
			if (data.cityCode) this.cityCode = data.cityCode;
			if (data.cityName) this.cityName = data.cityName;
		}
	},
	onLoad(option) {
		this.homeApp = option;
		// console.log(this.homeApp);
		// var self = this;
		// var quoteInfoStatus = localStorage.getItem('quoteInfoStatus');
		// self.appId = localStorage.getItem('appId');
		// self.from = self.$route.query.from;
		// self.customerId = self.$route.query.customerId;
		// self.isSelectIns = true;
		// if (quoteInfoStatus) {
		// 	quoteInfoStatus = JSON.parse(quoteInfoStatus);
		// 	if (quoteInfoStatus.status) {
		// 		Indicator.close();
		// 		self.isSelectIns = true;
		// 		self.selected = quoteInfoStatus.status.num;
		// 		self.size = quoteInfoStatus.status.size;
		// 		self.isScheme = quoteInfoStatus.status.isScheme;
		// 		self.isResult = quoteInfoStatus.status.isResult;
		// 		self.renewalCode = quoteInfoStatus.status.renewalCode;
		// 		self.cityCode = quoteInfoStatus.status.cityCode;
		// 		self.cityName = quoteInfoStatus.status.cityName;
		// 	}
		// }
	}
};
</script>
<style scoped>
.quoteInfo .mint-wrap.toQuote {
	padding-top: 100px;
}

.quoteInfo .mint-navbar.is-fixed {
	top: 44px;
}

.quoteInfo .fixed-navbar {
	position: fixed;
	top: 44px;
	right: 0;
	width: 100%;
	height: 59px;
	text-align: right;
	z-index: 2;
}
.fixedHeader {
	position: fixed;
	left: 0;
	right: 0;
	height: 45px;
	background: #fff;
	z-index: 99;
}
.seleContent{
	padding-top: 48px;
}
</style>
