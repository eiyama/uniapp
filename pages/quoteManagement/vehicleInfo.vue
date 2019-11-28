<template>
	<view class="content">
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">投保地区：</view>
			<view class="uni-list-cell-right" @click="isshowcity" style="display: flex; align-items: center;">
				<input class="uni-input" placeholder="请选择" v-model="carInfoData.insCity.shortName" disabled="true" />
				<image :src="rightImg" style="width:20px;height:20px;"></image>
			</view>
		</view>
		<uni-popup ref="cityPopup" type="bottom">
			<view>
				<selectCity v-on:selectedCity="selectedCity" v-on:closeCity="closeCity">
				</selectCity>
			</view>
		</uni-popup>
		<view class="quote-row">
			<text>以下信息请根据行驶证填写</text>
			<button v-show="showPolicy" plain style="float:right;font-size:13px;margin-left: 10px;line-height: 25px;" type="primary"
			 @click="viewPolicy()">往年续保</button>
			<img @click="showOccre" style="float: right;height: 30px;width: 30px;" src="/static/images/icon-Photo.png" v-show="showOcr && canUseOcr" />
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">车牌号：</view>
			<view class="uni-list-cell-right">
				<view class="uni-list-cell">
					<input class="uni-input" placeholder="请输入" v-model="carInfoData.car.plateNo" />
					<view class="uin-switch">
						<text style="margin-right:10px;">未上牌</text>
						<switch @change="turn" :checked="isNonPlateNo"></switch>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">车架号：</view>
			<view class="uni-list-cell-right">
				<view class="uni-list-cell">
					<input class="uni-input" placeholder="请输入" v-model="carInfoData.car.vin" />
					<button plain type="primary" style="font-size:13px;line-height: 25px;">查车型</button>
				</view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">发动机号：</view>
			<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.car.engineNo" /></view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">品牌型号：</view>
			<view class="uni-list-cell-right">
				<view class="uni-list-cell">
					<input class="uni-input" placeholder="请输入" v-model="carInfoData.car.model" />
					<button plain type="primary" style="font-size:13px;line-height: 25px;">查车型</button>
				</view>
			</view>
		</view>
		<view class="uni-list-cell" style="height: 120px;">
			<view class="uni-list-cell-left">车型/价格：</view>
			<view class="uni-list-cell-right" style="display: flex;align-items: center;">
				<textarea style="width: 100%;" class="uni-input" auto-height placeholder="请选择" type="text" v-model="carInfoData.car.fullPriceModel" />
				<image :src="rightImg" style="width:20px;height:20px;"></image>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">座位数：</view>
			<view class="uni-list-cell-right">
				<view class="uni-list-cell"><input class="uni-input" placeholder="请输入" v-model="carInfoData.car.passengerCapacity" /></view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">注册日期：</view>
			<view class="uni-list-cell-right">
				<picker mode = 'date' @change="registerChange">
					<view class="uni-list-cell">
						<input class="uni-input" placeholder="请选择" v-model="carInfoData.car.registerDate" disabled="true" />
						<image :src="rightImg" style="width:20px;height:20px;"></image>
					</view>
				</picker>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">号牌种类：</view>
			<view class="uni-list-cell-right">
				<picker mode="selector" :range="Vehilots" @change="addressChange">
					<view class="uni-list-cell">
						<input class="uni-input" placeholder="请选择" v-model="licenceType" disabled="true" />
						<image :src="rightImg" style="width:20px;height:20px;"></image>
					</view>
				</picker>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">行驶证车辆类型：</view>
			<view class="uni-list-cell-right">
				<picker mode="selector" :range="driving" @change="VehicleTypeChange">
					<view class="uni-list-cell">
						<input class="uni-input" placeholder="请选择" v-model="licenseVehicleType" disabled="true" />
						<image :src="rightImg" style="width:20px;height:20px;"></image>
					</view>
				</picker>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">使用性质：</view>
			<view class="uni-list-cell-right">
				<picker mode="multiSelector" :range="busTypeList" @columnchange="busTypeChange" :value="busTypeIndex">
					<view class="uni-list-cell">
						<input class="uni-input" placeholder="请选择" v-model="carInfoData.car.busType" disabled="true" />
						<image :src="rightImg" style="width:20px;height:20px;"></image>
					</view>
				</picker>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">核定载质量(吨)：</view>
			<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.car.weightCapacity" /></view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">整备质量(吨)：</view>
			<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.car.wholeWeight" /></view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">排量：</view>
			<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.car.exhaustMeasure" /></view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">车主名：</view>
			<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.car.owner.name" /></view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">
				证件类型：
			</view>
			<view class="uni-list-cell-db">
				<picker mode="multiSelector" :range="typeData" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" >
					<view class="uni-list-cell">
						<input class="uni-input" placeholder="请选择" v-model="ownerIdType" disabled="true" />
						<image :src="rightImg" style="width:20px;height:20px;"> </image>
					</view>
				</picker>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">车主证件号：</view>
			<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.car.owner.idNo" /></view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">出生日期：</view>
			<view class="uni-list-cell-right">
				<picker mode = 'date' @change="birthdayChange">
					<view class="uni-list-cell">
						<input class="uni-input" placeholder="请选择" v-model="carInfoData.car.owner.birthday" disabled="true" />
						<image :src="rightImg" style="width:20px;height:20px;"></image>
					</view>
				</picker>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">性别：</view>
			<view class="uni-list-cell-right">
				<radio-group @change="sexChange">
					<label class="cell-flex">
						<view style="margin-right: 10px;" v-for="(item,index) in genderList" :key="index">
							<radio :value="item.value" :checked="item.value === carInfoData.car.owner.gender" />{{item.name}}
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">车主手机号：</view>
			<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.car.owner.phone" /></view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">电子邮箱：</view>
			<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.receivingEmail" /></view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">是否过户车：</view>
			<view class="uni-list-cell-right">
				<switch @change="isChangeOwner" :checked="carInfoData.car.isChangedOwner"></switch>
			</view>
		</view>
		<view class="quote-row">
			<text>投保人/被保人信息</text>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">投保人：</view>
			<view class="uni-list-cell-right" style="justify-content: flex-end;display: flex;">
				<text style="margin-right: 10px;">同车主</text>
				<switch @change="isApplicanChange" :checked="isApplicantSameOwner"></switch>
			</view>
		</view>
		<view v-show="!isApplicantSameOwner">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">姓名：</view>
				<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.applicant.name" /></view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					证件类型：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" :range="typeData" @columnchange="isApplicanColumnchange" :value="applicanIndex" >
						<view class="uni-list-cell">
							<input class="uni-input" placeholder="请选择" v-model="applicantIdType" disabled="true" />
							<image :src="rightImg" style="width:20px;height:20px;"> </image>
						</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">证件号：</view>
				<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.applicant.idNo" /></view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">被保人：</view>
			<view class="uni-list-cell-right" style="display: flex;align-items: center;justify-content: space-between;">
				<view class="">
					<text style="margin-right: 10px;">同投保人</text>
					<switch @change="isSameApplicantChange" :checked="isInsuredSameApplicant"></switch>	
				</view>
				<view class="">
					<text style="margin-right: 10px;">同车主</text>
					<switch @change="InsuredSameOwnerChange" :checked="isInsuredSameOwner"></switch>	
				</view>
			</view>
		</view>
		<view  v-show="!isInsuredSameOwner && !isInsuredSameApplicant">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">姓名：</view>
				<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.insured.name" /></view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					证件类型：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" :range="typeData" @columnchange="insuredColumnchange" :value="insuredIndex" >
						<view class="uni-list-cell">
							<input class="uni-input" placeholder="请选择" v-model="insuredIdType" disabled="true" />
							<image :src="rightImg" style="width:20px;height:20px;"> </image>
						</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">证件号：</view>
				<view class="uni-list-cell-right"><input class="uni-input" placeholder="请输入" v-model="carInfoData.insured.idNo" /></view>
			</view>
		</view>
		<view class="footerBtn"><button type="primary">开始报价</button></view>

	</view>
</template>

<script>
	import {
		http,
		test
	} from './../../common/request-http';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import wPicker from "@/components/w-picker/w-picker.vue";
	import Vehicletypee from '@/static/json/Vehicletypee.json';
	import selectCity from "@/components/selectCity/city.vue";
	import Licenseplate from '@/static/json/Vehicletype.json';
	import Licenseplatee from '@/static/json/Licenseplatee.json';
	import Vehicletype from '@/static/json/Licenseplate.json';
	const address = Vehicletype.result;
	const Licens = Licenseplate.result;
	const TIME_COUNT = 3000;
	export default {
		data() {
			return {
				genderList:[{value:'Male',name:'男'},{value:'Female',name:'女'}],
				isChangedOwnerList:[{value:'true',name:'是'},{value:'false',name:'否'}],
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
				showPolicy: false,
				showOcr: false,
				canUseOcr: false,
				isNonPlateNo: false,
				showCity: false,
				insCityShortName: '',
				licenceType: '',
				Vehilots: Object.values(address),
				driving:Object.values(Licens),
				busTypeList:[["非营业","营业"],[]],
				busTypeIndex:[],
				typeData: [
					["个人","企业单位","机关单位"],
					["中华人民共和国身份证", "港澳居民来往内地通行证", "台胞证"]
				],
				licenseVehicleType: '',
				carInfoData: {
					insCorp: {},
					insCity: {
						shortName: "",
						code: ""
					},
					car: {
						owner: {
							name: "",
							phone: "",
							idNo: "",
							idType: "",
							relationType: "",
							birthday: "",
							gender: ""
						},
						plateNo: "",
						vin: "",
						engineNo: "",
						brandName: "",
						model: "",
						makerModel: "",
						vehicleModelCode: "",
						purchasePrice: "",
						analogyCarPrice: "",
						year: "",
						passengerCapacity: "",
						registerDate: "",
						remark: "",
						exhaustMeasure: "",
						isChangedOwner: false,
						changedOwnerCoverage: "None",
						changedOwnerDate: "",
						aliasName: "",
						fullPriceModel: "",
						licenseVehicleType: "",
						licenceType: "",
						busType: '',
						useCharacter: "",
						weightCapacity: 0,
						wholeWeight: 0
					},
					applicant: {
						name: "",
						phone: "",
						idNo: "",
						idType: "",
						relationType: "",
						birthday: "",
						gender: ""
					},
					insured: {
						name: "",
						phone: "",
						idNo: "",
						idType: "",
						relationType: "",
						birthday: "",
						gender: ""
					},
					bzRiskKind: {},
					bsRiskKind: {},
					ownerIdType: "",
					receivingEmail: '',
					showQueryCarInfo: false,
				},
				ownerIdType: '',
				hasCustomer: false,
				busType:[],
				multiIndex:[],
				isApplicantSameOwner: true,
				isInsuredSameOwner: true,
				isInsuredSameApplicant: false,
				applicanIndex:[],
				applicantIdType:'',
				insuredIndex:[],
				insuredIdType:'',
			};
		},
		components: {
			uniPopup,
			selectCity,
			wPicker
		},
		mounted() {
			var self = this,
				carInfoParams = {},
				insureInfoApp = uni.getStorageSync('insureInfoApp');
			carInfoParams.insCityCode = this.homeApp.insCityCode;
			carInfoParams.plateNo = this.homeApp.plateNo;
			carInfoParams.vin = this.homeApp.vin;
			carInfoParams.engineNo = this.homeApp.engineNo;
			self.phone = this.homeApp.phone;
			var appId = uni.getStorageSync('appId');
			self.canUseOcr = (appId == 'cxs190103104249iwe' || appId == 'cxa181211170855pxj' ||
				appId == 'cx8190110143618pyi' || appId == 'cx4180310190219bh6' || appId == 'cx91909x2101234uqc' || appId ==
				'cx118051y511426x5r' || appId == 'cx5190108195859o31');
			if (this.homeApp.plateNo != '') carInfoParams.ownerIdCardNo = this.homeApp.ownerIdCardNo;
			if ((carInfoParams.plateNo && carInfoParams.plateNo.length >= 6) || carInfoParams.vin) {
				var querParam = '';
				if (carInfoParams.plateNo && carInfoParams.plateNo.length >= 6) {
					querParam = carInfoParams.plateNo;
				}
				if (carInfoParams.vin) {
					querParam = carInfoParams.vin;
				}
				// this.carInfoParams = carInfoParams;
				if (JSON.stringify(carInfoParams) != "{}") {
					uni.setStorageSync("carInfoParams", JSON.stringify(carInfoParams));
				}
				self.showQueryCarInfo = true;
				self.show = self.showQueryCarInfo;
				http.get('/vi/VehiceInfo?plateNoOrVin=' + querParam).then((res) => {
					// self.$nextTick(() => {
					// Indicator.close();
					self.showQueryCarInfo = false;
					self.show = self.showQueryCarInfo;
					if (res.result) {
						self.hasCustomer = true;
						self.customer = res.result;
						self.showHistoryInfo();
						self.showOcr = false;
					} else {
						self.showOcr = true;
					}
					self.getRenewalpolicy(carInfoParams);
					// })
				});
			} else {
				self.isNonPlateNo = true;
				self.carInfoData.car.plateNo = "未上牌";
			}
			self.initData();
		},
		props: ["homeApp"],
		methods: {
			isSameApplicantChange(e){
				this.isInsuredSameApplicant = e.detail.value;
			},
			InsuredSameOwnerChange(e){
				this.isInsuredSameOwner = e.detail.value;
			},
			isApplicanChange(e){
				this.isApplicantSameOwner = e.detail.value;
			},
			isChangeOwner(e){
				this.carInfoData.car.isChangedOwner = e.detail.value;
			},
			insuredColumnchange(e){
				this.insuredIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.insuredIndex[0]) {
							case 0:
								this.typeData[1] = ['中华人民共和国身份证', '港澳居民来往内地通行证', '台胞证']
								break
							case 1:
								this.typeData[1] =  ['机构代码', '统一社会信用代码']
								break
							case 2:
								this.typeData[1] =  ['机构代码', '统一社会信用代码']
								break
						}					
				this.insuredIndex.splice(1,1,0);
				}
				this.insuredIdType = this.typeData[0][this.insuredIndex[0]] + '-' + this.typeData[1][this.insuredIndex[1]];
				this.$forceUpdate()
			},
			isApplicanColumnchange(e){
				this.applicanIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.applicanIndex[0]) {
							case 0:
								this.typeData[1] = ['中华人民共和国身份证', '港澳居民来往内地通行证', '台胞证']
								break
							case 1:
								this.typeData[1] =  ['机构代码', '统一社会信用代码']
								break
							case 2:
								this.typeData[1] =  ['机构代码', '统一社会信用代码']
								break
						}					
				this.applicanIndex.splice(1,1,0);
				}
				this.applicantIdType = this.typeData[0][this.applicanIndex[0]] + '-' + this.typeData[1][this.applicanIndex[1]];
				this.$forceUpdate()
			},
			bindMultiPickerColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value;		
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.typeData[1] = ['中华人民共和国身份证', '港澳居民来往内地通行证', '台胞证']
								break
							case 1:
								this.typeData[1] =  ['机构代码', '统一社会信用代码']
								break
							case 2:
								this.typeData[1] =  ['机构代码', '统一社会信用代码']
								break
						}					
				this.multiIndex.splice(1,1,0);
				}
				this.ownerIdType = this.typeData[0][this.multiIndex[0]] + '-' + this.typeData[1][this.multiIndex[1]];
				this.$forceUpdate()
			},
			busTypeChange(e){
				this.busTypeIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.busTypeIndex[0]) {
							case 0:
								this.busTypeList[1] = []
								break
							case 1:
								this.busTypeList[1] =  ["出租租赁", "城市公交", "公路客运", "旅游客运"]
								break
						}					
				this.busTypeIndex.splice(1,1,0);
				}
				this.carInfoData.car.busType = this.busTypeList[0][this.busTypeIndex[0]] + '-' + this.busTypeList[1][this.busTypeIndex[1]];
				this.$forceUpdate()
			},
			birthdayChange(e){
				this.carInfoData.car.owner.birthday = e.target.value;
			},
			VehicleTypeChange(e){
				this.licenseVehicleType =  this.driving[e.target.value];
			},
			addressChange(e){
				this.licenceType =  this.Vehilots[e.target.value];
			},
			registerChange(e){
				this.carInfoData.car.registerDate = e.target.value;
			},
			sexChange(e) {
				if(e.target.value =="Male"){
					this.carInfoData.car.owner.gender = "Male";
				}
				if(e.target.value =="Female"){
					this.carInfoData.car.owner.gender = "Female";
				}
			},
			getRenewalpolicy: function(carInfoParams) {
				var carInfoParams = this.Common.Public.param(carInfoParams);
				var self = this;
				// Indicator.open('正在查询续保信息，请稍候...');
				self.showQueryRenewalpolicy = true;
				self.show = self.showQueryRenewalpolicy;

				if (!this.timer) {
					// this.count2 = 40;
					this.count = 1;
					this.showTimer = false;
					this.timer = setInterval(() => {
						if (this.count < TIME_COUNT) {
							this.count++;
							if (this.count2 < 80) {
								this.count2 = this.count2 + 0.3;
							} else if (this.count2 >= 80 && this.count2 < 95) {
								this.count2 = this.count2 + 0.05;
							} else if (this.count2 >= 95 && this.count2 < 98) {
								this.count2 = this.count2 + 0.01;
							} else {
								this.count2 = 98;
							}
						} else {
							this.count2 = 100;
							this.showTimer = true;
							clearInterval(this.timer);
							this.timer = null;
							this.show = false;
						}
					}, 50)
				}
				http.get('/vi/InsureCustomer?' + carInfoParams).then(function(res) {
					if (res.status == 200 && res.result) {
						var data = res;
						self.showOcr = false;
						self.hasCustomer = false;
						self.showHistoryInfo(data.result)
						for (var i = 0; i < Vehicletypee.result.length; i++) {
							if (self.carInfoData.car.licenseVehicleType == "") {
								self.licenseVehicleType == "K33"
							};
							if (self.carInfoData.car.licenseVehicleType == Vehicletypee.result[i].text) {
								self.licenseVehicleType = Vehicletypee.result[i].display
							}
						};
						for (var i = 0; i < Licenseplatee.result.length; i++) {
							if (self.carInfoData.car.licenceType == "") {
								self.licenceType == "SmallBus"
							};
							if (self.carInfoData.car.licenceType == Licenseplatee.result[i].text) {
								self.licenceType = Licenseplatee.result[i].display
							}
						}
					} else {
						if (self.hasCustomer) {
							self.showOcr = false;
							self.showHistoryInfo();
						} else {
							Toast('未查询到续保数据，请填写报价资料')
							self.initData();
						}
					}
					self.showQueryRenewalpolicy = false;
					self.show = self.showQueryRenewalpolicy;
					// Indicator.close();
				}, err => {
					self.initData();
					reject(err);
				}).catch(function(error) {
					self.initData();
					console.log(error);
				});
			},
			initData: function() {
				var self = this;
				self.showOcr = true;
				self.licenseVehicleType = '轿车';
				self.licenceType = '小型汽车';
				self.carInfoData.insCity.shortName = this.homeApp.insCityShortName;
				self.carInfoData.insCity.code = this.homeApp.insCityCode;
				self.carInfoData.car.plateNo = this.homeApp.plateNo;
				self.carInfoData.car.vin = this.homeApp.vin;
				self.carInfoData.car.engineNo = this.homeApp.engineNo;
				self.phone = this.homeApp.phone;
				self.carInfoData.car.licenseVehicleType = 'K33';
				self.carInfoData.car.licenceType = 'SmallBus';
				self.carInfoData.car.busType = '非营业';
				self.isApplicantSameOwner = true;
				self.isInsuredSameOwner = true;
				var curDate = new Date();
				var year = curDate.getFullYear();
				var month = curDate.getMonth() + 1;
				var day = curDate.getDate();
				if (month < 10) {
					month = "0" + month;
				}
				if (day < 10) {
					day = "0" + day;
				}
				self.registerDate = year + '-' + month + '-' + day;
				self.ownerBirthday = year + '-' + month + '-' + day;
				self.applicantBirthday = year + '-' + month + '-' + day;
				self.insuredBirthday = year + '-' + month + '-' + day;
				self.changedOwnerDate = year + '-' + month + '-' + day;
			},
			closeCity: function() {
				this.closePopup();
			},
			selectedCity: function(model) {
				this.closePopup();
				uni.setStorageSync('insCtiyCode', model.cityCode);
				this.carInfoData.insCity.code = model.cityCode;
				this.carInfoData.insCity.shortName = model.shortName;
			},
			isshowcity() {
				this.$refs.cityPopup.open();
			},
			closePopup() {
				this.$refs.cityPopup.close()
			},
			showHistoryInfo: function(results) {
				// var self = this;
				//是否有客户数据
				if (this.hasCustomer) {
					if (this.customer.owner) {
						this.carInfoData.car.owner = this.customer.owner;
					}
					/*if (this.carInfoData.car.owner && this.carInfoData.car.owner.phone) {
					  this.carInfoData.car.owner.phone = '';
					};*/
					if (this.phone) {
						this.carInfoData.car.owner.phone = this.phone;
					};
					if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
						var arr2 = this.carInfoData.car.owner.birthday.split(' ')
						if (arr2.length > 1) {
							this.carInfoData.car.owner.birthday = arr2[0];
						}
					};

					this.carInfoData.car.plateNo = this.customer.plateNo;
					this.carInfoData.car.vin = this.customer.vin;
					this.carInfoData.car.engineNo = this.customer.engineNo;
					this.carInfoData.car.brandName = this.customer.brandName;
					this.carInfoData.car.model = this.customer.model;
					this.carInfoData.car.makerModel = this.customer.makerModel;
					this.carInfoData.car.vehicleModelCode = this.customer.vehicleModelCode;
					this.carInfoData.car.purchasePrice = this.customer.purchasePrice;
					this.carInfoData.car.analogyCarPrice = this.customer.analogyCarPrice;
					this.carInfoData.car.year = (this.customer.year && this.customer.year > 0) ? this.customer.year : "";
					this.carInfoData.car.passengerCapacity = (this.customer.passengerCapacity && this.customer.passengerCapacity > 0) ?
						this.customer.passengerCapacity : "";
					this.carInfoData.car.registerDate = this.customer.registerDate;
					this.carInfoData.car.remark = this.customer.remark;
					this.carInfoData.car.exhaustMeasure = this.customer.exhaustMeasure;
					this.carInfoData.car.isChangedOwner = this.customer.isChangedOwner;
					this.carInfoData.car.changedOwnerDate = this.customer.changedOwnerDate;
					this.carInfoData.car.aliasName = this.customer.aliasName;
					if (this.carInfoData.car.makerModel || this.carInfoData.car.vehicleModelCode) {
						this.carInfoData.car.fullPriceModel = this.customer.fullPriceModel;
					} else {
						this.carInfoData.car.fullPriceModel = '';
					}
					if (this.carInfoData.car.fullPriceModel) {
						$("#fullPriceModel").each(function() {
							this.setAttribute('style', 'height:120px;overflow-y:hidden;');
						}).on('input', function() {
							this.style.height = 'auto';
							this.style.height = (this.scrollHeight) + 'px';
						});
					}
					if (this.customer.licenceTypeDisplay) {
						this.carInfoData.car.licenceTypeDisplay = this.customer.licenceTypeDisplay;
					}
					if (this.customer.busType) {
						this.carInfoData.car.busType = this.customer.busType;
					}
					if (this.customer.energyType) {
						this.carInfoData.car.energyType = this.customer.energyType;
					}
					if (this.customer.energyTypeDisplay) {
						this.carInfoData.car.energyTypeDisplay = this.customer.energyTypeDisplay;
					}
					if (this.customer.wholeWeight) {
						this.carInfoData.car.wholeWeight = this.customer.wholeWeight;
					}
					if (this.customer.weightCapacity) {
						this.carInfoData.car.weightCapacity = this.customer.weightCapacity;
					}
					if (this.customer.remark) {
						this.carInfoData.car.remark = this.customer.remark;
					}
					if (this.customer.owner) {
						this.ownerIdType = this.Common.Public.cardTypeChangeTxt(this.customer.owner.relationType, this.customer.owner.idType);
					}

					if (this.customer.plateNo == '' || this.customer.plateNo == '未上牌') {
						this.carInfoData.car.plateNo = '未上牌';
						this.isNonPlateNo = true;
					} else {
						this.carInfoData.car.plateNo = this.customer.plateNo;
						this.isNonPlateNo = false;
					}
					if (this.carInfoData.car.registerDate) {
						this.carInfoData.car.registerDate = this.carInfoData.car.registerDate.substring(0, 10)
					}
					if (this.carInfoData.car.changedOwnerDate) {
						this.carInfoData.car.changedOwnerDate = this.carInfoData.car.changedOwnerDate.substring(0, 10)
					}
					if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
						this.carInfoData.car.owner.birthday = this.carInfoData.car.owner.birthday.substring(0, 10);
					}
					if (this.customer.licenseVehicleType == '' || this.customer.licenseVehicleType == null) {
						this.carInfoData.car.licenseVehicleType = 'K33';
					} else {
						this.carInfoData.car.licenseVehicleType = this.customer.licenseVehicleType;
					};
					if (this.customer.licenceType == '' || this.customer.licenceType == null) {
						this.carInfoData.car.licenceType = 'SmallBus';
					} else {
						this.carInfoData.car.licenceType = this.customer.licenceType;
					};

					if (this.customer.busType == '' || this.customer.busType == null) {
						this.carInfoData.car.busType = '非营业';
					} else {
						if (this.customer.useCharacter == 'FeiYingYe') {
							this.carInfoData.car.busType = '非营业';
						} else {
							this.carInfoData.car.busType = this.customer.busType;
						}
					};

					for (var i = 0; i < Vehicletypee.result.length; i++) {
						if (this.carInfoData.car.licenseVehicleType == "") {
							this.licenseVehicleType == "K33"
						};
						if (this.carInfoData.car.licenseVehicleType == Vehicletypee.result[i].text) {
							this.licenseVehicleType = Vehicletypee.result[i].display
						}
					};
					for (var i = 0; i < Licenseplatee.result.length; i++) {
						if (this.carInfoData.car.licenceType == "") {
							this.licenceType == "SmallBus"
						};
						if (this.carInfoData.car.licenceType == Licenseplatee.result[i].text) {
							this.licenceType = Licenseplatee.result[i].display
						}
					}
				} else {
					if (results) {
						this.carInfoData.car = results.car;
						this.ownerIdType = this.Common.Public.cardTypeChangeTxt(results.car.owner.relationType, results.car.owner.idType);
						/*if (this.carInfoData.car.owner && this.carInfoData.car.owner.phone) {
						  this.carInfoData.car.owner.phone = '';
						}*/

						if (this.phone) {
							this.carInfoData.car.owner.phone = this.phone;
						}
						if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
							var arr2 = this.carInfoData.car.owner.birthday.split(' ')
							if (arr2.length > 1) {
								this.carInfoData.car.owner.birthday = arr2[0];
							}
						}
						if (results.car.plateNo == '' || results.car.plateNo == '未上牌') {
							this.carInfoData.car.plateNo = '未上牌';
							this.isNonPlateNo = true;
						} else {
							this.carInfoData.car.plateNo = results.car.plateNo;
							this.isNonPlateNo = false;
						}
						if (this.carInfoData.car.registerDate) {
							this.carInfoData.car.registerDate = this.carInfoData.car.registerDate.substring(0, 10)
						}
						if (this.carInfoData.car.changedOwnerDate) {
							this.carInfoData.car.changedOwnerDate = this.carInfoData.car.changedOwnerDate.substring(0, 10)
						}
						if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
							this.carInfoData.car.owner.birthday = this.carInfoData.car.owner.birthday.substring(0, 10);
						}
						if (results.car.licenseVehicleType == '' || results.car.licenseVehicleType == null) {
							this.carInfoData.car.licenseVehicleType = 'K33';
						} else {
							this.carInfoData.car.licenseVehicleType = results.car.licenseVehicleType;
						}
						if (results.car.licenceType == '' || results.car.licenceType == null) {
							this.carInfoData.car.licenceType = 'SmallBus';
						} else {
							this.carInfoData.car.licenceType = results.car.licenceType;
						}

						if (results.car.busType == '' || results.car.busType == null) {
							this.carInfoData.car.busType = '非营业';
						} else {
							if (results.car.useCharacter == 'FeiYingYe') {
								this.carInfoData.car.busType = '非营业';
							} else {
								this.carInfoData.car.busType = results.car.busType;
							}
						}
						this.carInfoData.car.weightCapacity = results.car.weightCapacity;
						this.carInfoData.car.wholeWeight = results.car.wholeWeight;
						this.carInfoData.car.exhaustMeasure = results.car.exhaustMeasure;
						this.carInfoData.car.makerModel = results.car.makerModel;
						this.carInfoData.car.vehicleModelCode = results.car.vehicleModelCode;
						if (this.carInfoData.car.makerModel || this.carInfoData.car.vehicleModelCode) {
							this.carInfoData.car.fullPriceModel = results.car.fullPriceModel;
						} else {
							this.carInfoData.car.fullPriceModel = '';
						}
						if (this.carInfoData.car.fullPriceModel) {
							$("#fullPriceModel").each(function() {
								this.setAttribute('style', 'height:120px;overflow-y:hidden;');
							}).on('input', function() {
								this.style.height = 'auto';
								this.style.height = (this.scrollHeight) + 'px';
							});
						}

						if (results.car.owner.relationType == 'Person') {
							this.ownerNoBirth(false)
						}
					} else {
						self.initData();
					}
				}
				if (results) {
					this.carInfoData.car.owner = results.car.owner;
					/*if (this.carInfoData.car.owner && this.carInfoData.car.owner.phone) {
					  this.carInfoData.car.owner.phone = '';
					};*/
					if (this.phone) {
						this.carInfoData.car.owner.phone = this.phone;
					};
					if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
						var arr2 = this.carInfoData.car.owner.birthday.split(' ')
						if (arr2.length > 1) {
							this.carInfoData.car.owner.birthday = arr2[0];
						}
					}
					this.ownerIdType = this.Common.Public.cardTypeChangeTxt(results.car.owner.relationType, results.car.owner.idType);
					/*if (this.carInfoData.car.owner && this.carInfoData.car.owner.phone) {
					  this.carInfoData.car.owner.phone = '';
					}*/

					if (this.phone) {
						this.carInfoData.car.owner.phone = this.phone;
					}
					if (results.applicant) {
						this.carInfoData.applicant = results.applicant;
						if (this.carInfoData.applicant && this.carInfoData.applicant.phone) {
							this.carInfoData.applicant.phone = '';
						}
						if (results.applicant.name == results.car.owner.name && results.applicant.relationType == results.car.owner.relationType &&
							results.applicant.name == results.car.owner.name && results.applicant.idNo == results.car.owner.idNo) {
							this.isApplicantSameOwner = true;
						} else {
							this.isApplicantSameOwner = false;
						}
						if (this.carInfoData.applicant.birthday) {
							this.carInfoData.applicant.birthday = this.carInfoData.applicant.birthday.substring(0, 10)
						}
						this.applicantIdType = this.Common.Public.cardTypeChangeTxt(results.applicant.relationType, results.applicant.idType);
						if (results.applicant.relationType == 'Person') {
							this.applicantNoBirth(false)
						}
					} else {
						this.isApplicantSameOwner = true;
					}
					if (results.insured) {
						this.carInfoData.insured = results.insured;
						if (this.carInfoData.insured && this.carInfoData.insured.phone) {
							this.carInfoData.insured.phone = '';
						}
						if (results.insured.name == results.car.owner.name && results.insured.relationType == results.car.owner.relationType &&
							results.insured.name == results.car.owner.name && results.insured.idNo == results.car.owner.idNo) {
							this.isInsuredSameOwner = true;
						} else {
							this.isInsuredSameOwner = false;
						}
						if (this.carInfoData.insured.birthday) {
							this.carInfoData.insured.birthday = this.carInfoData.insured.birthday.substring(0, 10)
						}
						this.insuredIdType = this.Common.Public.cardTypeChangeTxt(results.insured.relationType, results.insured.idType);
						if (results.insured.relationType == 'Person') {
							this.insuredNoBirth(false)
						}
					} else {
						this.isInsuredSameOwner = true;
					}
					if (results.bzRiskKind) {
						this.carInfoData.bzRiskKind = results.bzRiskKind;
						this.showPolicy = true;
					}
					if (results.bsRiskKind) {
						this.carInfoData.bsRiskKind = results.bsRiskKind;
						this.showPolicy = true;
					}
					if (results.insCorp) {
						this.carInfoData.insCorp = results.insCorp;
					}
					this.carInfoData.ownerIdType = this.ownerIdType;
				}
				uni.setStorageSync("carInfoData", this.carInfoData);
				if (this.carInfoData.car.fullPriceModel) {
					$("#fullPriceModel").each(function() {
						this.setAttribute('style', 'height:120px;overflow-y:hidden;');
					}).on('input', function() {
						this.style.height = 'auto';
						this.style.height = (this.scrollHeight) + 'px';
					});
				}
				// Indicator.close();
			},
		},
	};
</script>

<style scoped>
	.quote-row {
		height: 20px;
		padding: 10px 4%;
		font-size: 12px;
		color: #999;
		line-height: 30px;
		background: #f9f9f9;
	}

	.uin-switch {
		font-size: 12px;
		margin-right: 6px;
	}

	.content {
		margin-bottom: 50px;
	}

	.footerBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
		height: 48px;
		background: #FFFFFF;
	}
</style>
