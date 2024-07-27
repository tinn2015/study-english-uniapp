<template>
	<view>
		<uni-popup ref="loginPopup" :mask-click="false" @change="change">
			<view class="popup-content fd-c jc-c ai-c">
				<image src="../../static/images/login.jpg" mode="widthFix"></image>
				<view class="text flex jc-c">申请使用您的手机号</view>
				<!-- <view class="btn flex jc-c ai-c" @click="login">登录</view> -->
				<button class="login-box" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					微信一键授权
				</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { defineComponent, ref, onMounted } from 'vue'
	import { useLoginStore } from '@/stores/login.js'
	import { getPhoneCode } from '@/utils/request.js'
	export default defineComponent({
		watch: {
			'loginStore.showLoginBtn': {
				handler (val) {
					console.log('watch', val, this.$refs.loginPopup.open)
					this.$nextTick(() => {
						if (val) {
								setTimeout(() => {
									 uni.hideTabBar();
									this.$refs.loginPopup.open()
								}, 200)
						} else {
							uni.showTabBar()
							this.$refs.loginPopup.close()
						}
					})
				},
				immediate: true
			}
		},
		mounted () {
			console.log('monuted dom', this.$refs.loginPopup)
		},
		setup() {
			const loginStore = useLoginStore()
			return {
				loginStore
			}
		},
		methods: {
			login () {
				this.loginStore.login()
			},
			getPhoneNumber (e) {
				getPhoneCode(e.detail.code).then(res => {
					console.log('登录页获取手机号', res)
					uni.setStorage({
						key: 'userPhoneNumber',
						data: res.phone
					})
					uni.showTabBar()
					this.$refs.loginPopup.close()
				})
			}
		}
	})
</script>

<style scoped lang="scss">
	.popup-content {
		// padding: 30rpx 30rpx;
		padding-bottom: 50rpx;
		border-radius: 16rpx;
		overflow: hidden;
		background: #ffffff;
		.text {
			color: #333333;
			margin: 20rpx 0;
		}
		.btn {
			background: #59c47f;
			padding: 15rpx 30rpx;
			border-radius: 8rpx;
			margin-top: 20rpx;
			color: #fff
		}
		.login-box {
			width: 80%;
			border: none;
			background: #07c160;
			border-radius: 50rpx;
			color: #ffffff
		}
	}
</style>