<template name="selectCity">
	<view class="city">
		<view class="cityTitle">
			<text>
				选择城市
			</text>
			<view class="headerRight">
				<uni-icons type="close" @click="closeCity()" size="24"></uni-icons>
			</view>
		</view>
		<view class="cityItem" v-for="(item,index) in cityData" :key="index" @click="selectedCity(item)">
			{{item.insCityShortName}}
		</view>
	</view>

</template>

<script>
	import {
		http,
		test
	} from './../../common/request-http';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		name: 'selectCity',
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
			}
		},
		components: {
			uniNavBar,
			uniIcons
		},
		created() {
			// if (option.appId) {
			// 	this.appid = option.appId;
			// 	uni.setStorageSync('appId', this.appid);
			// }
			this.appid = uni.getStorageSync('appId');
			var self = this;
			// 城市获取；
			if (uni.getStorageSync('cityData')) {
				self.cityData = uni.getStorageSync('cityData');
			} else {
				http.get('/vi/insuranceCompanies')
					.then(function(res) {
						if (res.status == 200) {
							/* 城市和城市代码去重*/
							self.cityData = self.companiesSuccess(res);
							uni.setStorageSync('cityData', self.cityData);
						} else {}
					}, err => {
						Toast('请求超时，请刷新页面重试！');
						reject(err)
					})
					.catch(function(error) {
						// console.log(error)
					})
			}
		},
		methods: {
			closeCity: function() {
				this.$emit('closeCity');
			},
			selectedCity: function(item) {
				var cityCode = item.insCityCode ? item.insCityCode : '';
				var shortName = item.insCityShortName ? item.insCityShortName : '';
				this.$emit('selectedCity', {
					cityCode,
					shortName
				});
			},
			cityChange(value) {
				// console.log(value);
				this.cityValue = this.CityShortName[value.detail.value];
				this.cityCode = this.CityCodeList[value.detail.value];
			},
			unique(arr) {
				let newarr = []
				arr.forEach((item, index) => {
					if (newarr.indexOf(item) === -1) {
						newarr.push(item)
						// console.log(newarr)
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
	.city {
		text-align: left;
	}

	.cityTitle {
		text-align: center;
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 10px;
	}

	.cityItem {
		color: #666666;
		width: 95%;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #e8ecf1;
		cursor: pointer;
	}

	.headerRight {
		float: right;
	}
</style>
