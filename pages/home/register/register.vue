<template>
	<view class="content">
		<text class="title" v-show="hasIDPhoto">身份证(正,反面)，银行卡照片上传</text>
		<view class="imgBox" v-show="hasIDPhoto">
			<view class="imgItem">
				<image style="width: 100px; height: 100px;" :src="idCardImage" @click="upIdcard"></image>
				<text class="imgItemDsc">
					身份证正面
				</text>
			</view>
			<view class="imgItem">
				<image style="width: 100px; height: 100px;" :src="idCardBackImage" @click="upIdcardBack"></image>
				<text class="imgItemDsc">
					身份证反面
				</text>
			</view>
			<view class="imgItem">
				<image style="width: 100px; height: 100px;" :src="bankCardImage" @click="upBankcard"></image>
				<text class="imgItemDsc">
					银行卡
				</text>
			</view>
		</view>
		<view v-show="hasPersonal" class="personalInfor">
			<text class="title">个人信息</text>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						机构：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="selector" :range="organizationData" @change="bindTimeChange">
							<view class="uni-list-cell">
								<input class="uni-input" placeholder="请选择" v-model="organizationValue" disabled="true" />
								<image :src="rightImg" style="width:20px;height:20px;"> </image>
							</view>
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						手机号：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="number" maxlength='11' v-model="phoneNumber" placeholder="请输入" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						姓名：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" v-model="userName" placeholder="请输入" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						证件类型：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="multiSelector" :range="typeData" @change="typeChange">
							<view class="uni-list-cell">
								<input class="uni-input" placeholder="请选择" v-model="typeValue" disabled="true" />
								<image :src="rightImg" style="width:20px;height:20px;"> </image>
							</view>
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						证件号码：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="idcard" v-model="idCardNumber" @blur="addBirth" placeholder="请输入" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						出生日期：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" @change="birthdayChange">
							<view class="uni-list-cell">
								<input class="uni-input" placeholder="请选择" v-model="birthdayValue" disabled="true" />
								<image :src="rightImg" style="width:20px;height:20px;"> </image>
							</view>
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						性别：
					</view>
					<view class="uni-list-cell-db">
						<radio-group @change="radioChange" style="display: flex;justify-content: flex-end">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in sexArr" :key="item.value">
								<view>
									<radio :value="item.name" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						民族：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="selector" :range="nationData" @change="nationChange">
							<view class="uni-list-cell">
								<input class="uni-input" placeholder="请选择" v-model="nationValue" disabled="true" />
								<image :src="rightImg" style="width:20px;height:20px;"> </image>
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view v-show="hasBankCard" class="bankCard">
			<text class="title">银行卡信息</text>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					银行卡号：
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="number" v-model="bankCardNum" placeholder="请输入" />
				</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					开户银行：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="selector" :range="openBankData" @change="openBankChange">
						<view class="uni-list-cell">
							<input class="uni-input" placeholder="请选择" v-model="openBankValue" disabled="true" />
							<image :src="rightImg" style="width:20px;height:20px;"> </image>
						</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					开户支行：
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" v-model="openBranchBank" placeholder="请输入" />
				</view>
			</view>
		</view>

		<view v-show="hasReferrer" class="itemBox">
			<text class="title">推荐人</text>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					手机号：
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" maxlength='11' type="number" v-model="referrerMobile" placeholder="请输入" />
				</view>
			</view>
		</view>

		<view v-show="hasSignature" class="itemBox" style="display: flex;justify-content: space-between;  align-items: center; padding-right: 15px;">
			<text class="title">手写签名</text>
			<view class="">
				<button type="primary" plain="true" @click="openSign" size="mini">签名</button>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class='contents'>
				<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
				 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
				</canvas>
				<view class="caozuo">
					<view class="chongqian" @tap='clearClick'>
						重签
					</view>
					<view class="over" @tap="overSign">
						完成签名
					</view>
					<view class="header" @click="closePup">
						取消
					</view>
				</view>
			</view>
		</uni-popup>

		<view class="submitBtn">
			<button type="primary" @click="submitData">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		http,
		test
	} from './../../../common/request-http';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = res.windowHeight;
		},
	})

	export default {
		data() {
			return {
				signImage: '',
				isEnd: false, // 是否签名,
				appId: '',
				rightImg: '/static/images/right.png',
				uploadIcon: '/static/images/upload.png',
				organizationData: [],
				organizationValue: '',
				organizationCode: [],
				phoneNumber: '',
				userName: '',
				typeData: [
					['个人'],
					["中华人民共和国身份证", "港澳居民来往内地通行证", "台胞证", "士兵证/军官证/警官证", "中国护照", "外国护照"]
				],
				typeValue: '',
				updata: {
					orgCode: '',
					userName: '',
				},
				idCardImage: '/static/images/upload.png',
				idCardBackImage: '/static/images/upload.png',
				bankCardImage: '/static/images/upload.png',
				idCardBackId: '',
				idCardId: '',
				bankCardId: '',
				idCardNumber: '',
				birthdayValue: '',
				sexArr: [{
					name: "男",
				}, {
					name: "女",
				}],
				Gender: '',
				nationData: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族",
					"瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族",
					"拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族",
					"布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族",
					"俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族",
					"门巴族", "珞巴族", "基诺族"
				],
				nationValue: '',
				bankCardNum: '',
				openBankData: [],
				openBankCode: [],
				openBankValue: '',
				openBranchBank: '',
				referrerMobile: '',
				postData: {
					"personal": {
						"name": "",
						"gender": "",
						"nation": "",
						"identityType": "",
						"identityNo": "",
						"birthDay": "",
						"maritalStatus": "",
						"politicalStatus": "",
						"educationLevel": "",
						"mobile": "",
						"orgCode": "",
						"userId": ""
					},
					"bankCard": {
						"openBank": "",
						"openBranchBank": "",
						"bankCardNo": ""
					},
					"idPhotoBase": {
						"idCardFrontMediaId": "",
						"idCardContraryMediaId": "",
						"bankCardMediaId": ""
					},
					"referrer": {
						"referrerMobile": ""
					},
					"signature": {
						"signatureMediaId": ""
					},
					"salesmanConfigId": "",
				},
				signatureMediaId: '',
				salesmanConfigId: '',
				agreements: [],
				plates: '',
				hasAgreements: false,
				hasPersonal: false,
				hasReferrer: false,
				hasBankCard: false,
				hasIDPhoto: false,
				hasSignature: false,
				IdentityType: '',
				opBankCode: '',

			}
		},
		components: {
			uniPopup
		},
		onLoad() {
			_that = this
			//获得Canvas的上下文
			content = wx.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#000")
			//设置线的宽度
			content.setLineWidth(4)
			//设置线两端端点样式更加圆润
			content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')
			// this.Common.Public.GetDateStr('')
			if (uni.getStorageSync("appId")) {
				this.appId = uni.getStorageSync("appId")
			}
			http.get('/Organizations/Shops').then(res => {
				if (res.result) {
					res.result.map(item => {
						this.organizationData.push(item.fullName);
						this.organizationCode.push(item.code);
					})
				}
			})
			http.get('/Banks').then(res => {
				if (res.result) {
					res.result.map(item => {
						this.openBankData.push(item.shortName);
						this.openBankCode.push(item.bankCode);
					})
				}
			})
			http.get('/Configurations?types=salesman').then(res => {
				if (res.result) {
					this.initData(res);
				}
			})
		},
		methods: {
			bindTimeChange(value) {
				this.organizationValue = this.organizationData[value.detail.value];
				this.orgCode = this.organizationCode[value.detail.value];
				console.log(this.orgCode)
			},
			typeChange(value) {
				
				var index = value.detail.value[1] ? value.detail.value[1] : 0;
				this.typeValue = this.typeData[0][0] + '-' + this.typeData[1][index];
				this.IdentityType = this.Common.Public.cardTypeChange(this.typeData[0][0], this.typeData[1][index])[1];
				console.log(this.IdentityType);
			},
			upIdcard() {
				var self = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						self.idCardImage = tempFilePaths[0];
						uni.uploadFile({
							url: '/Documents/EnquiryPolicy', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								"x-appid": this.appId
							},
							success: (uploadFileRes) => {
								var model = JSON.parse(uploadFileRes.data);
								self.idCardId = model.result[0].id
								console.log(self.idCardId )
							}
						});
					}
				});
			},
			upIdcardBack() {
				var self = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						self.idCardBackImage = tempFilePaths[0];
						// console.log(tempFilePaths.split(':')[1]);
						uni.uploadFile({
							url: '/Documents/EnquiryPolicy', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								"x-appid": this.appId
							},
							success: (uploadFileRes) => {
								var model = JSON.parse(uploadFileRes.data);
								self.idCardBackId = model.result[0].id
								// console.log(self.idCardId)
							}
						});
					}
				});
			},
			upBankcard() {
				var self = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						self.bankCardImage = tempFilePaths[0];
						// console.log(tempFilePaths.split(':')[1]);
						uni.uploadFile({
							url: '/Documents/EnquiryPolicy', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								"x-appid": this.appId
							},
							success: (uploadFileRes) => {
								var model = JSON.parse(uploadFileRes.data);
								self.bankCardId = model.result[0].id
								// console.log(self.idCardId)
							}
						});
					}
				});
			},
			birthdayChange(value) {
				this.birthdayValue = value.detail.value;
			},
			addBirth() {
				this.birthdayValue = this.Common.Public.checkBirthday(this.idCardNumber)[1];
				// this.Gender = this.Common.Public.checkBirthday(this.idCardNumber)[0];
			},
			radioChange(value) {
				this.Gender = value.detail.value;
			},
			nationChange(value) {
				// console.log(value)
				this.nationValue = this.nationData[value.detail.value];
			},
			openBankChange(value) {
				this.openBankValue = this.openBankData[value.detail.value];
				this.opBankCode = this.openBankCode[value.detail.value];
			},
			openSign() {
				this.$refs.popup.open()
			},
			closePup() {
				this.$refs.popup.close()
			},
			initData: function(res) {
				if (res.status == 200 && res.result && res.result.salesman) {
					this.salesmanConfigId = res.result.salesman.id;
					this.agreements = res.result.salesman.agreements;
					this.plates = res.result.salesman.plates;
					//"Personal", "Referrer", "BankCard", "IDPhoto", "Signature", "Agreement"
					if (this.plates && this.plates.length > 0) {
						for (var i = 0; i < this.plates.length; i++) {
							if (this.plates[i] == "Personal") {
								this.hasPersonal = true;
							}
							if (this.plates[i] == "Referrer") {
								this.hasReferrer = true;
							}
							if (this.plates[i] == "BankCard") {
								this.hasBankCard = true;
							}
							if (this.plates[i] == "IDPhoto") {
								this.hasIDPhoto = true;
							}
							if (this.plates[i] == "Signature") {
								this.hasSignature = true;
							}
							if (this.plates[i] == "Agreement") {
								this.hasAgreements = true;
							}
						}
					}
				} else {
					this.hasPersonal = false;
					this.hasReferrer = false;
					this.hasBankCard = false;
					this.hasIDPhoto = false;
					this.hasSignature = false;
					this.hasAgreements = false;
				}
			},
			submitData() {
				var self = this;
				if (self.hasIDPhoto) {
					if (self.idCardId == '') {
						uni.showToast({
						    title: '请上传身份证正面图片',
						    duration: 2000,
							icon:'none'
						});
						return false;
					}
					if (self.idCardBackId == '') {
						uni.showToast({
						    title: '请上传身份证背面图片',
						    duration: 2000,
							icon:'none'
						});
						return false;
					}
					if (self.bankCardId == '') {
						uni.showToast({
						    title: '请上传银行卡背面图片',
						    duration: 2000,
							icon:'none'
						});
						return false;
					}
				}
				if (self.hasPersonal) {
					if (!self.userName) {
						// uni.showToast('请填写姓名')
						uni.showToast({
						    title: '请填写姓名',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					if (!self.IdentityType) {
						// uni.showToast('请选择证件类型');
						uni.showToast({
						    title: '请选择证件类型',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					if (!self.idCardNumber) {
						// uni.showToast('请输入证件号码');
						uni.showToast({
						    title: '请输入证件号码',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					//18位数身份证
					// if (self.IdentityType) {
					// 	uni.showToast('身份证号码不正确！');
					// 	return;
					// }
					if (!self.birthdayValue) {
						// uni.showToast('请选择出生日期');
						uni.showToast({
						    title: '请选择出生日期',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					if (!self.Gender) {
						// uni.showToast('请选择性别');
						uni.showToast({
						    title: '请选择性别',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					if (!self.nationValue) {
						// uni.showToast('请选择民族');
						uni.showToast({
						    title: '请选择民族',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					if (!self.phoneNumber) {
						// uni.showToast('请输入手机号码');
						uni.showToast({
						    title: '请输入手机号码',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					var isMobile =
						/^((\+?86)|(\(\+86\)))?(19[0123456789][0-9]{8}|17[0123456789][0-9]{8}|13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/; //手机
					if (!(isMobile.test(self.phoneNumber))) {
						// uni.showToast('手机号码不正确');
						uni.showToast({
						    title: '手机号码不正确',
						    duration: 2000,
							icon:'none'
						});
						return;
					}
					self.postData.personal.name = self.userName;
					self.postData.personal.gender = self.Gender;
					self.postData.personal.nation = self.nationValue;
					self.postData.personal.identityType = self.IdentityType;
					self.postData.personal.identityNo = self.idCardNumber;
					self.postData.personal.birthDay = self.birthdayValue;
					self.postData.personal.maritalStatus = self.organizationValue;
					// self.postData.personal.politicalStatus = self.customerData.PoliticalStatus;
					// self.postData.personal.educationLevel = self.customerData.EducationLevel;
					self.postData.personal.mobile = self.phoneNumber;
					self.postData.personal.orgCode = self.orgCode;
					// self.postData.personal.userId = self.customerData.UserId;
				}
				if (self.hasIDPhoto) {
					this.postData.idPhotoBase.bankCardMediaId = this.bankCardId;
					this.postData.idPhotoBase.idCardContraryMediaId = this.idCardBackId;
					this.postData.idPhotoBase.idCardFrontMediaId = this.idCardId;
				}
				if (self.hasBankCard) {
					if (!self.openBankValue) {
						// uni.showToast('请选择银行');
						uni.showToast({
						    title: '请选择银行',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					if (!self.bankCardNum) {
						// uni.showToast('请输入银行卡号');
						uni.showToast({
						    title: '请输入银行卡号',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					if (!self.openBranchBank) {
						// uni.showToast('请输入开户支行');
						uni.showToast({
						    title: '请输入开户支行',
						    duration: 2000,
							icon:'none'
						});
						return false
					}
					self.postData.bankCard.openBank = self.opBankCode;
					self.postData.bankCard.openBranchBank = self.openBranchBank;
					self.postData.bankCard.bankCardNo = self.bankCardNum;
				}
				if (self.hasReferrer) {
					if (!self.signatureMediaId) {
						// uni.showToast('请输入推荐人号码');
						uni.showToast({
						    title: '请输入推荐人号码',
						    duration: 2000,
							icon:'none'
						});
						return false;
					}
				    self.postData.referrer.referrerMobile = self.referrerMobile;
				}
				if(self.hasSignature){
					if (!self.signatureMediaId) {
						// uni.showToast('请签名');
						uni.showToast({
						    title: '请签名',
						    duration: 2000,
							icon:'none'
						});
						return false;
					}
					self.postData.signature.signatureMediaId = self.signatureMediaId;
				}
				
				self.postData.salesmanConfigId = self.salesmanConfigId;
				console.log(self.postData);
				uni.showLoading({
				    title: '加载中'
				})
				 http.post('/Salesmans', self.postData).then((res) => {
					 uni.hideLoading()
					if(res.status == 200){
						
					}
				 })
			},
			overSign: function() {
				if (this.isEnd) {
					var self = this;
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
						success: function(res) {
							//设置图片
							_that.signImage = res.tempFilePath;
							// 获取签名id
							var model = {};
							model.dataURIString = res.tempFilePath;
							http.post('/Documents?folderName=SalesmanApply', model).then(res => {
								if (res.result) {
									self.signatureMediaId = res.result.id;
									self.$refs.popup.close()
								}
							})
						}
					})
				} else {
					uni.showToast({
						title: '请先完成签名',
						icon: "none",
						duration: 1500,
						mask: true
					})
				}

			},

			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				console.log("触摸开始" + event.changedTouches[0].x)
				console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);

			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				console.log("触摸结束" + e)
				// 设置为已经签名
				this.isEnd = true
				// 清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},

			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},

			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},

			error: function(e) {
				console.log("画布触摸错误" + e)
			},

			//绘制
			draw: function(touchs) {
				console.log(touchs[0], touchs[1])
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.isEnd = false
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},


		}
	}
</script>

<style scoped>
	.content {
		padding-bottom: 44px;
		padding-top: 5px;
	}

	.content .title {
		font-size: 14px;
		padding: 10px;
		color: #333;
		font-weight: bold;
		/* background-color: #FFF; */
	}

	.imgBox {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 15px 0rpx;
	}

	.imgItem {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.imgItemDsc {
		margin-top: 10px;
		margin-bottom: 5px;
		color: #666;
		font-size: 12px;
	}

	.personalInfor,
	.bankCard,
	.itemBox {
		padding: 10px 0;
	}

	.submitBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 44px;
		z-index: 10;

	}

	.ts {
		color: #FF485D;
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
		padding-left: 20upx;
	}

	canvas {
		background-color: #DDDDDD;
		width: 690upx;
		margin: 0 5upx;
		height: calc(100vh - 140upx);
	}

	.contents {
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
	}

	#signatureImg {
		background-color: #EEEEEE;

	}

	.caozuo {
		display: flex;
		height: 100upx;
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.caozuo view {
		width: 33%;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		color: #FFFFFF;
	}

	.caozuo view:active {
		background-color: #CCCCCC;
		color: #333333;
	}

	.chongqian {
		background-color: #FF8F58;
	}

	.over {
		background-color: #0599D7;
	}

	.header {
		background: #F0F0F0;
		flex: 1;
	}
</style>
