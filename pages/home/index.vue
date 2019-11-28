<template>
	<view class="content">
		<image class="bg-banner" src="/static/images/bg-banner.png"></image>
		<view class="text-area">
			<text style="color:#f44;font-size: 12px;">注：目前仅支持9座以下非营运客车</text>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left" style="padding-left:0px ;">
					<image style="height: 18px;width:28px" :src="locationIcon" mode=""></image>投保地区：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="selector" :range="CityShortName" @change="cityChange">
						<view class="uni-list-cell">
							<input class="uni-input" placeholder="请选择" v-model="cityValue" disabled="true" />
							<image :src="rightImg" style="width:20px;height:20px;"> </image>
						</view>
					</picker>
				</view>
			</view>
			<view class="tabs">
				<view class="tabsBox uni-list-cell">
					<view class="tab" :class="{active:showPlant}" @click="tabPlant">
						车牌号
					</view>
					<view class="tab" :class="{active:showVin}" @click="tabVin">
						车架号
					</view>
				</view>

				<view v-show="showPlant" class="uni-list-cell-db">
					<view class="uni-list-cell">
						<input class="uni-input" type="text" v-model="city.plateNo" placeholder="请输入车牌号" />
						<image style="height:28px;width:28px;" src="../../static/images/icon-Photo.png" mode="" @click="scanOcrFile('Plate')"></image>
					</view>
				</view>
				<view v-show="showPlant" class="uni-list-cell">
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" v-model="city.ownerIdCardNo" placeholder="请输入证件号后六位" />
					</view>
				</view>
				<view v-show="showVin" class="uni-list-cell-db">
					<view class="uni-list-cell">
						<input class="uni-input" type="text" v-model="city.vin" placeholder="请输入车架号" />
						<image style="height:28px;width:28px;" src="../../static/images/icon-Photo.png" mode="" @click="scanOcrFile('Vin')"></image>
					</view>
				</view>
				<view v-show="showVin" class="uni-list-cell">
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" v-model="city.engineNo" placeholder="请输入发动机编号" />
						<!-- <image src="../../static/images/icon-Photo.png" mode=""></image> -->
					</view>
				</view>
			</view>
			<button type="primary" @click="toQuota">立即报价</button>
		</view>
	</view>
</template>

<script>
	import {
		http,
		test
	} from './../../common/request-http';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				title: 'Hello',
				appid: '',
				organizationName: '',
				cityData: [],
				cityValue: '',
				CityShortName: [], //城市名称
				CityCodeList: [], //城市code
				cityCode: '',
				rightImg: '/static/images/right.png',
				locationIcon: '/static/images/ic-location.png',
				buildItem: [],
				plantNo: '',
				vin: '',
				showPlant: true,
				showVin: false,
				idNumber: '',
				engineNo: '',
				plantBase64: '',
				Ocrresult: '',
				city: {
					insCityCode: "", //投保地区编码
					insCityShortName: "",
					plateNo: "", //车牌号
					ownerIdCardNo: "",
					vin: "", //车辆VIN码
					engineNo: "" //发动机号
				},
			}
		},
		onShow(option) {
			this.appid = uni.getStorageSync('appId');
			http.get('apis/apps/' + this.appid + '/H5').then(res => {
					this.organizationName = res.result.name;
				})
				.catch(err => {});
			var self = this;
			// 城市获取；
			http.get('/vi/insuranceCompanies').then(function(res) {
					if (res.status == 200) {
						/* 城市和城市代码去重*/
						self.cityData = self.companiesSuccess(res);
						// console.log(self.companiesSuccess(res))	
					} else {
						Indicator.close();
					}
				}, err => {
					uni.showToast('请求超时，请刷新页面重试！');
					reject(err)
				})
				.catch(function(error) {
					console.log(error)
				})
		},
		components: {
			uniPopup
		},
		methods: {
			scanOcrFile: function(type) {
				this.scanType = type;
				var self = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						// console.log(JSON.stringify(res.tempFilePaths));
						self.urlTobase64(res.tempFilePaths[0])
					}
				});
			},
			urlTobase64(url) {
				var self = this;
				uni.request({
					url: url,
					method: 'GET',
					responseType: 'arraybuffer',
					success: res => {
						let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						self.postImg(base64);
					}
				});
			},
			toQuota: function() {
				var self = this;
				//非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。
				var curDate = new Date();
				var hh = curDate.getHours();
				var mm = curDate.getMinutes();
				if (hh >= 8 && hh <= 22) {
					if (hh == 22 && mm > 0) {
						uni.showToast("非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。");
						return false;
					}
					if (self.noCity) {
						uni.showToast("暂无报价权限，请联系管理员。");
						return false;
					}
					if (!self.city.insCityCode) {
						uni.showToast("请选择投保地区");
						return false;
					}
					if (self.showPlant) {
						if (!self.city.plateNo) {
							uni.showToast("请输入车牌号");
							return false;
						}
						self.city.plateNo = self.city.plateNo.toUpperCase();
						self.city.vin = "";
					} else if (self.showVin) {
						if (!self.city.vin) {
							uni.showToast("请输入车架号");
							return false;
						}
						self.city.vin = self.city.vin.toUpperCase();
						self.city.plateNo = "";
					}
					uni.setStorageSync("homeApp", self.city);
					uni.removeStorageSync("insureInfoApp");

					var query = this.param(this.city);
					setTimeout(function() {
						// Indicator.close();
						uni.navigateTo({
							url: "../quoteManagement/quoteInfo?" + query
						});
					}, 100);
				} else {
					uni.showToast("非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。");
					return false;
				}
			},
			param(data) {
				let url = ''
				for (var k in data) {
					let value = data[k] !== undefined ? data[k] : ''
					url += '&' + k + '=' + value
				}
				return url ? url.substring(1) : ''
			},
			postImg: function(str) {
				var self = this;
				var model = {
					category: this.scanType,
					sourceOption: "Base64",
					source: str
				}
				uni.showLoading({
					title: '加载中'
				});
				http.post("/Ocr", model).then(res => {
					uni.hideLoading();
					self.Ocrresult = '';
					if (res.result && JSON.stringify(res.result.result) != "{}" && res.result.success) {
						uni.showToast({
							title: '识别成功',
							duration: 2000
						});
						self.Ocrresult = res.result.result;
						if (self.scanType == 'Plate') {
							self.city.plateNo = res.result.result.plateNo;
						}
						if (self.scanType == 'Vin') {
							self.city.vin = res.result.result.vin;
						}
					} else {
						if (!res.result.success) {
							uni.showToast({
								title: res.result.errMsg,
								duration: 2000
							});
						} else {
							uni.showToast({
								title: '无法识别，请检查一下图片的清晰度，然后重新选择上传识别~~',
								duration: 2000
							});
						}
					}
				})
			},
			tabVin() {
				this.showPlant = false;
				this.showVin = true;
			},
			tabPlant() {
				this.showPlant = true;
				this.showVin = false;
			},
			cityChange(value) {
				this.cityValue = this.CityShortName[value.detail.value];
				this.cityCode = this.CityCodeList[value.detail.value];
				this.city.insCityCode = this.cityCode;
				this.city.insCityShortName = this.cityValue
			},
			unique(arr) {
				let newarr = []
				arr.forEach((item, index) => {
					if (newarr.indexOf(item) === -1) {
						newarr.push(item)
					}
				});
				return newarr
			},
			companiesSuccess: function(data) {
				var self = this;
				if (data.status == 200) {
					if (data.result && data.result.length > 0) {
						uni.setStorageSync('insuranceNameCode', JSON.stringify(data.result));
						/* 城市和城市代码去重*/
						var CityCode = [],
							CityShortName = [];
						for (var i = 0; i < data.result.length; i++) {
							var cityCode = data.result[i].insCityCode;
							if (cityCode != '110000') {
								CityCode.push(cityCode);
								CityShortName.push(data.result[i].insCityShortName);
							};
						}
						var qCityCode = this.unique(CityCode),
							qCityShortName = this.unique(CityShortName),
							arr = [];
						for (var j = 0; j < qCityShortName.length; j++) {
							var obj = {};
							obj.insCityCode = qCityCode[j];
							obj.insCityShortName = qCityShortName[j];
							obj.appId = self.appid;
							arr.push(obj);
						}
						this.CityCodeList = qCityCode;
						this.CityShortName = qCityShortName;
						return arr;
					} else {

					}
				}
			},
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		/* justify-content: center; */
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		margin: 5px;
		margin-top: -15px;
		background: #fff;
		text-align: left;
		z-index: 2;
		border-radius: 8px;
		padding: 10px;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.bg-banner {
		height: 240px;
		width: 100%;
	}

	.tabs {
		margin: 15px 0;
	}

	.tabsBox {
		display: flex;
		justify-content: flex-start;
	}

	.tabsBox .tab {
		margin-right: 20px;
		padding-bottom: 7px;
	}

	.active {
		color: #333;
		font-weight: bold;
		border-bottom: 3px solid rgb(45, 84, 255);
	}
</style>
