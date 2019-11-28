<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			// if(uni.getStorageSync("token")){
			// console.log('App Show')
			// }else{
			// 	uni.navigateTo({
			// 	    url: '/pages/home/login/login'
			// 	});
			// }
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	@import "/wxcomponents/vant/common/index.wxss";
</style>
