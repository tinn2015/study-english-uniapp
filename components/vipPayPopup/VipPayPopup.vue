<template>
	<view>
		<uni-popup ref="vipPayPopup" @change="change">
			<view class="popup-content flex fd-c jc-c ai-c">
				<image class="vip-expire-pic" src="../../static/images/payment/vip-expire.png" mode=""></image>
				<view class="tip mt34">体验时长已使用完毕</view>
				<view class="tip">体验时长已使用完毕， 开通后还可使用海量</view>
				<view class="block flex fd-c jc-c ai-c">
					<view class="flex">
						<image class="star" src="../../static/images/payment/star.png" mode=""></image>
						<image class="star ml30" src="../../static/images/payment/star.png" mode=""></image>
						<image class="star ml30" src="../../static/images/payment/star.png" mode=""></image>
						<image class="star ml30" src="../../static/images/payment/star.png" mode=""></image>
						<image class="star ml30" src="../../static/images/payment/star.png" mode=""></image>
					</view>
					<view class="block-label">24小时口语助手，针对性练习，突破开口难</view>
				</view>
				<view class="btn flex jc-c ai-c" @click="routeToPayment">
					<image class="icon-diamond" src="../../static/images/payment/diamond.png" mode=""></image>
					<view>立即开通</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { defineComponent, ref, onMounted } from 'vue'
	import { useLoginStore } from '@/stores/login.js'
	export default defineComponent({
		// watch: {
		// 	'loginStore.vipPayPopupVisible': {
		// 		handler (val) {
		// 			console.log('watch', val, this.$refs.loginPopup.open)
		// 			this.$nextTick(() => {
		// 				if (val) {
		// 						this.$refs.vipPayPopup.open()
		// 				} else {
		// 					this.$refs.vipPayPopup.close()
		// 				}
		// 			})
		// 		},
		// 		immediate: true
		// 	}
		// },
		mounted () {
			// console.log('monuted dom', this.$refs.loginPopup)
			this.$refs.vipPayPopup.open('bottom')
		},
		setup() {
			const loginStore = useLoginStore()
			return {
				loginStore
			}
		},
		methods: {
			routeToPayment () {
				uni.navigateTo({
					url: '/pages/payment/Payment'
				});
			}
		}
	})
</script>

<style scoped lang="scss">
	.popup-content {
		padding: 108rpx 32rpx;
		border-radius: 16rpx 16rpx 0 0;
		overflow: hidden;
		background: linear-gradient(180deg, #49BC69 0%, #ffffff 100%);
	}
	.vip-expire-pic {
		width: 478rpx;
		height: 46rpx;
		display: block;
	}
	.tip {
		font-size: 28rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		color: #105A3B;
		line-height: 44rpx;
	}
	.block {
		background: #FFFFFF;
		border-radius: 24rpx;
		opacity: 0.4;
		padding: 40rpx 0;
		width: 100%;
		margin-top: 56rpx;
	}
	.block-label {
		font-size: 28rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		color: #0D9158;
		line-height: 40rpx;
		margin-top: 30rpx;
	}
	.star {
		width: 40rpx;
		height: 40rpx
	}
	.btn {
		width: 410rpx;
		height: 96rpx;
		background: linear-gradient(90deg, #F8E0A0 0%, #FF864F 100%);
		border-radius: 60rpx;
		font-size: 32rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		margin-top: 56rpx;
		color: #FFFFFF;
		.icon-diamond {
			width: 38rpx;
			height: 32rpx;
			display: block;
			margin-right: 8rpx;
		}
	}
	.mt34 {
		margin-top: 34rpx;
	}
	.ml30 {
		margin-left: 30rpx;
	}
</style>