<template>
	<view>
		<!-- <div style="padding-top:48px;padding-bottom:50px">
		<div style="background-color:white;color:#333;padding:15px;border-radius:8px;margin:10px">
        <div>
          <p style="font-size:20px;color:#333;font-weight:bold;display:flex;align-items:center;justify-content:center">
            <img class="member-head" :src="agentInfo.headImageUrl ? agentInfo.headImageUrl: avatar" alt="">
          </p>
          <p style="font-size:20px;color:#333;font-weight:bold;display:flex;align-items:center;justify-content:center;margin-top:5px">
            {{agentInfo.name}}
          </p>
          <p style="font-size:13px;color:#666;margin-top:10px"></p>
          <p style="font-size:13px;color:#333;margin-top:3px">公司: <span style="color:#666">{{agentInfo.organName}}</span></p>
          <p style="font-size:13px;color:#333;margin-top:3px">部门: <span style="color:#666">{{agentInfo.deptName}}</span></p>
          <p style="font-size:13px;color:#333;margin-top:3px" v-if="salesMan">工号: <span style="color:#666">{{agentInfo.jobNumber}}</span></p>
          <p style="font-size:13px;color:#333;margin-top:3px" v-if="salesMan">注册日期: <span style="color:#666">{{agentInfo.hiredate}}</span></p>
          <p style="font-size:13px;color:#333;margin-top:3px" v-if="salesMan">联系方式: <span style="color:#666">{{agentInfo.mobile}}</span></p>
        </div>
      </div>
      <div style="background-color:white;color:#333;display: flex;padding:15px;border-radius:8px;margin:10px" v-show="salesMan">
        <div>
          <p style="font-weight:bold;font-size:15px">详细信息</p>
          <p style="color:#333">证件类型: <span style="color:#666">{{agentInfo.idType?agentInfo.idType:'无'}}</span></p>
          <p style="color:#333">证件号码: <span style="color:#666">{{agentInfo.idNo?agentInfo.idNo:'无'}}</span></p>
          <p style="color:#333">性别: <span style="color:#666">{{agentInfo.gender?agentInfo.gender:'无'}}</span></p>
          <p style="color:#333">生日: <span style="color:#666">{{agentInfo.birthDay?agentInfo.birthDay:'无'}}</span></p>
          <p style="color:#333" v-show="agentInfo.nationality">国籍:
            <span style="color:#666">{{agentInfo.nationality?agentInfo.nationality:'中国'}}</span></p>
          <p style="color:#333" v-show="agentInfo.education">学历:
            <span style="color:#666">{{agentInfo.education?agentInfo.education:'无'}}</span></p>
          <p style="color:#333" v-show="agentInfo.maritalStatus">婚姻状况:
            <span style="color:#666">{{agentInfo.maritalStatus?agentInfo.maritalStatus:'未婚'}}</span></p>
          <p style="color:#333" v-show="agentInfo.nation">民族:
            <span style="color:#666">{{agentInfo.nation?agentInfo.nation:'无'}}</span></p>
          <p style="color:#333" v-show="agentInfo.politicalStatus">政治面貌:
            <span style="color:#666">{{agentInfo.politicalStatus?agentInfo.politicalStatus:'无'}}</span></p>
        </div>
      </div>
      <div style="background-color:white;color:#333;display: flex;padding:15px;border-radius:8px;margin:10px" v-show="salesMan">
        <div>
          <p style="font-weight:bold;font-size:15px">银行卡信息</p>
          <p style="color:#333">开户银行: <span style="color:#666">{{bankName?bankName:'无'}}</span></p>
          <p style="color:#333">开户支行: <span style="color:#666">{{bankSubName?bankSubName:'无'}}</span></p>
          <p style="color:#333">银行卡号: <span style="color:#666">{{bankCardNo?bankCardNo:'无'}}</span></p>
        </div>
      </div>
      <div style="background-color:white;color:#333;display: flex;padding:15px;border-radius:8px;margin:10px" v-show="salesMan">
        <div>
          <p style="font-weight:bold;font-size:15px">推荐人</p>
        
          <p style="color:#333">{{agentInfo.refereer?agentInfo.refereer:'无'}}</p>
        
        </div>
      </div>
      <div style="background-color:white;color:#333;padding:10px;border-radius:8px;margin:10px">
        <p style="font-weight:bold;font-size:15px;display:flex;align-items:center;font-size:14px;color:#333;height:100%;justify-content: space-between;" @click="openModifyPWD">修改密码
          <van-icon name="arrow" style="margin-left:10px" />
        </p>
      </div>
      <van-dialog v-model="showModifyPWD" show-cancel-button :before-close="beforeClose" :overlay='overlay' :close-on-click-overlay='overlay' :show-confirm-button='btn' :showCancelButton='btn'>
        <div class="dialogs">
          <p style="color:#333;font-size:18px;font-weight:bold">修改密码</p>
          <div class="diaContent">
            <div style="margin-top:15px">
              <mt-field label="原密码" class="mint-formItm" v-model="oldPsw" type="password" placeholder="请输入原密码">
              </mt-field>
              <mt-field label="新密码" class="mint-formItm" v-model="newPsw" type="password" placeholder="请输入新密码">
              </mt-field>
              <mt-field label="确认密码" class="mint-formItm" v-model="confirmPsw" type="password" placeholder="请输入确认密码">
              </mt-field>
            </div>
            <div class="btns-hao" style="margin-top:30px">
              <span @click="cancel" style="font-size:14px">取消</span>
              <mt-button type="primary" @click="modifyPWD" size="large" style=" background: #357bfd;font-size:12px;height:30px;width:85px">确定</mt-button>
            </div>
          </div>
        </div>
      </van-dialog>
    </div> -->
		<view class="salesmanBox">
			<view class="saleItem">
				<view class="itemLeft">姓名：</view>
				<view class="itemRight">{{ agentInfo.name }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">公司：</view>
				<view class="itemRight">{{ agentInfo.organName }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">部门：</view>
				<view class="itemRight">{{ agentInfo.deptName }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">工号：</view>
				<view class="itemRight">{{ agentInfo.jobNumber }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">注册日期：</view>
				<view class="itemRight">{{ agentInfo.hiredate }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">联系方式：</view>
				<view class="itemRight">{{ agentInfo.mobile }}</view>
			</view>
		</view>
		<view class="salesmanBox">
			<text style="font-weight:bold;font-size:15px">详细信息</text>
			<view class="saleItem">
				<view class="itemLeft">证件类型：</view>
				<view class="itemRight">{{ agentInfo.idType ? agentInfo.idType : '无' }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">证件号码：</view>
				<view class="itemRight">{{ agentInfo.idNo ? agentInfo.idNo : '无' }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">性别：</view>
				<view class="itemRight">{{ agentInfo.gender ? agentInfo.gender : '无' }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">生日：</view>
				<view class="itemRight">{{ agentInfo.birthDay ? agentInfo.birthDay : '无' }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">国籍：</view>
				<view class="itemRight">{{ agentInfo.nationality ? agentInfo.nationality : '中国' }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">学历：</view>
				<view class="itemRight">{{ agentInfo.education ? agentInfo.education : '无' }}</view>
			</view>
			<view class="saleItem" v-show="agentInfo.maritalStatus">
				<view class="itemLeft">婚姻状况：</view>
				<view class="itemRight">{{ agentInfo.maritalStatus ? agentInfo.maritalStatus : '未婚' }}</view>
			</view>
			<view class="saleItem" v-show="agentInfo.nation">
				<view class="itemLeft">民族：</view>
				<view class="itemRight">{{ agentInfo.nation ? agentInfo.nation : '无' }}</view>
			</view>
			<view class="saleItem" v-show="agentInfo.politicalStatus">
				<view class="itemLeft">政治面貌：</view>
				<view class="itemRight">{{ agentInfo.politicalStatus ? agentInfo.politicalStatus : '无' }}</view>
			</view>
		</view>
		
		<view class="salesmanBox">
			<text style="font-weight:bold;font-size:15px">银行卡信息</text>
			<view class="saleItem">
				<view class="itemLeft">开户银行：</view>
				<view class="itemRight">{{ bankName ? bankName : '无' }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">开户支行：</view>
				<view class="itemRight">{{ bankSubName?bankSubName:'无' }}</view>
			</view>
			<view class="saleItem">
				<view class="itemLeft">银行卡号：</view>
				<view class="itemRight">{{ bankCardNo?bankCardNo:'无' }}</view>
			</view>

		</view>
		
		
		<view class="footerBtn">
				<button type="primary" @click="Signout">退出登录</button>
		</view>
	</view>
</template>
<script>
import { http, test } from './../../common/request-http';
export default {
	name: 'home',
	data() {
		return {
			selected: '1',
			plante: 'quotationList',
			title: '报价单',
			accountName: '',
			sellerName: '',
			sellerDeptName: '',
			token: '',
			userId: '',
			hide: true,
			certification: '未认证',
			isSalesMan: false,
			isAgency: false,
			val: '',
			shows: false, //show
			overlay: true,
			btn: false,
			showModifyPWD: false,
			oldPsw: '',
			newPsw: '',
			confirmPsw: '',
			headImageUrl: '',
			agentInfo: {},
			bankName:'',
			bankSubName:'',
			bankCardNo:''
			
			// avatar: this.src = require('../../assets/images/img-avatar.png'),
		};
	},
	async onLoad() {
		
		await http.get('Users/Me').then(res => {
			if (res.result) {
				if(res.result.userId){
					uni.setStorageSync('userId',res.result.userId);
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
				this.salesmanId = res.result.id;
				if(res.result.id){
					uni.setStorageSync('salesmanId',res.result.id);
				}
			// 	this.accountName = res.result.name;
			
			}
		});
		await http.get('Salesmans/' + this.salesmanId ).then(res => {
				if (res.result) {
					this.agentInfo = res.result;
				}
			})
		
		await http.get('Salesmans/' + this.salesmanId  + '/BankCards').then(res => {
				if (res.result) {
					this.bankName = res.result[0].bankName;
					this.cardName = res.result[0].cardName;
					this.bankCardNo = res.result[0].cardNo;
					this.bankSubName = res.result[0].subBankName;
				}
			})
	},
	methods: {
		beforeClose() {},
		openBack: function() {
			window.history.back();
		},
		Signout: function() {
			var self = this;
			this.$store.commit('logout');
			// sessionStorage.removeItem('userIds');
			// sessionStorage.removeItem('nickName');
			// sessionStorage.removeItem('referralCode');
			// sessionStorage.removeItem('title');
			// sessionStorage.removeItem('salesmanId');
			// sessionStorage.removeItem('accountName');
			// sessionStorage.removeItem('carInfoData');
			// sessionStorage.removeItem('sellerOrgCode');
			// sessionStorage.removeItem('sellerDeptCode');
			// sessionStorage.removeItem('CarInformation');
			// sessionStorage.removeItem('insCtiyCode');
			// sessionStorage.removeItem('settleFeeIds');
			// sessionStorage.removeItem('enquiryModel');
			// localStorage.removeItem('token');
			var appId = uni.getStorageSync('appId');
			var url = '/pages/home/login/login?appId=' + appId;
			uni.removeStorageSync('token');
			uni.removeStorageSync('salesmanId');
			uni.removeStorageSync('userId');
			uni.removeStorageSync('insCtiyCode');
			uni.removeStorageSync('appId');
			uni.navigateTo({
				url:url
			});
		},
		openModifyPWD: function() {
			this.showModifyPWD = true;
		},
		cancel: function() {
			this.showModifyPWD = false;
		},
		modifyPWD: function() {
			var me = this;
			if (!me.oldPsw) {
				Toast({
					message: '请输入原密码',
					position: 'bottom',
					duration: 3000
				});
				return;
			}
			if (!me.newPsw) {
				Toast({
					message: '请输入新密码',
					position: 'bottom',
					duration: 3000
				});
				return;
			}
			if (!me.confirmPsw) {
				Toast({
					message: '请输入确认密码',
					position: 'bottom',
					duration: 3000
				});
				return;
			}

			if (me.confirmPsw != me.newPsw) {
				me.confirmPsw = '';
				Toast({
					message: '两次输入的密码不一致，请重新输入',
					position: 'bottom',
					duration: 3000
				});
				return;
			}
			var putBody = { password: '', newPassword: '' };
			putBody.password = me.oldPsw;
			putBody.newPassword = me.newPsw;
			var url = '/Users/Me/Password';
			axiosPutAPI(url, putBody).then(data => {
				Indicator.close();
				if (data.status == 200) {
					Toast('密码修改成功，请重新登录');
					me.Signout();
				} else {
					Toast(res.errMsg);
				}
			});
		}
	}
};
</script>
<style scoped>
.salesmanBox {
	background: #fff;
	padding: 15px;
	border-radius: 8px;
	margin: 10px;

}
.saleItem {
	display: flex;
	
}
.saleItem .itemLeft {
	color: #999999;
	font-size: 13px;
}
.saleItem .itemRight {
	color: #333;
	font-size: 13px;
}
.footerBtn{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 3;
}
/* 
.my-head {
  display: inline-block;
  width: 54px;
  height: 54px;
  background-color: #eee;
  border-radius: 50%;
}

dialogs .title {
  font-size: 14px;
}

.dialogs {
  padding: 10px 20px;
  font-size: 12px;
}

.diaContent {
  padding: 0 0px;
}

.diaContent .imgcontent {
  text-align: center
}

.diaContent .imgcontent img {
  max-width: 130px;
}

.diaContent .tip {
  padding: 20px 0;
  color: #B1B9CE
}

.diaContent .tip span {
  vertical-align: text-bottom;
  margin-left: 5px
}

.diaContent .pos .pos-content {
  padding: 0 20px;
  margin-bottom: -10px;
}

.diaContent .pos .pos-content .tit {
  padding-bottom: 10px;
}

.diaContent .pos .pos-content .tit span {
  font-size: 20px
}

.btns-hao {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns-hao span {
  flex: 1;
  color: #357bfd;
  line-height: 40px;
}
.btn-fixed{
	background:#357bfd;
} */
</style>
