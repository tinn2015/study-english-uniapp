<template>
	<view class="container flex fd-c ai-c jc-sb">
		<view class="header">
			<Navigator></Navigator>
			<view class="header-label">
				<view class="slogan">开通“开口说英语”会员</view>
				<view class="sub-slogan">每天低至¥0.8，专属口语教练，真实语境</view>
			</view>
			<image class="banner" mode="scaleToFill" src="../../static/images/payment/payment-bg.png"></image>
		</view>
		<view class="content">
			<view class="vip flex jc-sb ai-c" :class="{'vip-select': index === selectIndex}" v-for="(item, index) in vipList" @click="selectVip(index)">
				<view class="tip">{{item.tips}}</view>
				<view>
					<view class="flex ai-c">
						<image class='diamon2' src="../../static/images/payment/diamond2.png" mode=""></image>
						<view class="title">{{ item.title }}</view>
					</view>
					<view class="f-orange mt26">{{ item.description[0] }}</view>
					<view class="f-gray">{{ item.description[1] }}</view>
				</view>
				<view class="price-box flex ai-c">
					<view class="price">{{item.tsUnit}}</view></view>
			</view>
		</view>
		<view class="footer flex-1">
			<view class="btn flex jc-c ai-c" @click="createOrder">
				<image class="icon-diamond" src="../../static/images/payment/diamond.png" mode=""></image>
				<view>立即开通</view>
			</view>
			<view class="protocol flex ai-c jc-c" :class="{shake: needShake}">
				<!-- <radio-group name="" @change="radioChange">
					<label class="radio">
						<radio color="#58C898" :checked="protocolChecked" />
					</label>
				</radio-group> -->
				<checkbox-group name="" @change="radioChange">
					<label>
						<checkbox class="radio" value="protocolChecked" color="#58C898" />
					</label>
				</checkbox-group>
				我已阅读并同意
				<view class="mlr8 link" @click="routeToWebview('会员协议', 'https://api.itso123.com/static/huiyuan.v1.html')">会员协议</view>
				<view class="link ml8" @click="routeToWebview('续费规则', 'https://api.itso123.com/static/xufei.v1.html')">续费规则</view>
				<view class="link ml8" @click="routeToWebview('隐私协议', 'https://api.itso123.com/static/yinsi.v1.html')">隐私协议</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		onBeforeMount,
		ref,
		createApp,
		onMounted,
	} from 'vue'
	import {
		useLessonStore
	} from '@/stores/lessons.js'
	import { getSales, genOrder, getLessonType } from '@/utils/request.js'
	
	const vipList = reactive([
		// {
		//   "SaleNo": "m001",
		//   "title": "包月会员",
		//   "description": [
		// 	"不限场景，话题，每天仅需2.19元",
		// 	"地道口语发音，随时随地练英语口语"
		//   ],
		//   "tips": "免费600分钟/月",
		//   "amount": 6800,
		//   "months": 1,
		//   "tsUnit": "￥68/月"
		// },
		// {
		//   "SaleNo": "m003",
		//   "title": "季度会员",
		//   "description": [
		// 	"不限场景，话题，每天仅需2元",
		// 	"地道口语发音，随时随地练英语口语"
		//   ],
		//   "tips": "免费1800分钟/季",
		//   "amount": 18000,
		//   "months": 3,
		//   "tsUnit": "￥180/季"
		// },
		// {
		//   "SaleNo": "m012",
		//   "title": "年度会员",
		//   "description": [
		// 	"不限场景，话题，每天仅需1.91元",
		// 	"地道口语发音，随时随地练英语口语"
		//   ],
		//   "tips": "全年免费用",
		//   "amount": 69800,
		//   "months": 12,
		//   "tsUnit": "￥698/年"
		// }
	])
	
	const selectIndex = ref(0)
	const protocolChecked = ref(false)
	const needShake = ref(false)
	
	const selectVip = (index) => {
		selectIndex.value = index
	}
	
	const createOrder = () => {
		console.log('protocolChecked', protocolChecked.value)
		if (!protocolChecked.value) {
			needShake.value = true
			setTimeout(() => {
				needShake.value = false
			}, 600)
			return
		}
		const sale = vipList[selectIndex.value]
		console.log('sale', sale, selectIndex.value)
		genOrder(sale.SaleNo).then(res => {
			console.log('genOrder', res)
			uni.requestPayment({
				nonceStr: res.nonceStr,
				paySign: res.paySign,
				signType: res.signType,
				// provider: 'wxpay',
				timeStamp: res.timeStamp,
				package: res.package,
				success: () => {
				},
				complete() {
					// const pages = getCurrentPages()
					// console.log('pages', pages)
					// const len = pages.length
					// const lastPage = pages[len - 2]
					// if (lastPage) {
					// 	const route = pages[lastPage].route
					// 	uni.redirectTo({
					// 		url: route
					// 	})
					// }
					console.log('pay complete')
					const lessonStore = useLessonStore()
					const {
						sectionInfo,
						currentSection,
						lessonInfo,
						currentSectionFinished
					} = lessonStore
					lessonStore.getFavoriteLesson(lessonInfo.lessonId).then((res2) => {
						console.log('update lessonInfo', res2)
						uni.navigateBack()
					})
				}
			})
		})
	}
	
	const radioChange = (e) => {
		console.log('radioChange', e)
		const checkedList = e.detail.value
		if (checkedList[0] === "protocolChecked") {
			protocolChecked.value = true
		} else {
			protocolChecked.value = false
		}
	}
	
	const routeToWebview = (title, url) => {
		uni.navigateTo({
			url: `/pages/webview/webview?src=${url}&title=${title}`
		})
	}
	
	onMounted(() => {
		getSales().then(res => {
			console.log('getSales', res)
			if (res.sales.length) {
				vipList.push(...res.sales)
			}
		})
	})
</script>

<style scoped lang="scss">
	.container {
		height: 100vh;
		width: 100vw;
	}
	.header {
		// background: #65DBA4;
		position: relative;
		min-height: 419rpx;
		width: 100%;
		// background-image: url('../../static/images/payment/payment-bg.png');
		// background-size: cover;
		.banner {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 10;
			// top: 40rpx;
		}
		.header-label {
			position: absolute;
			top: 100rpx;
			z-index: 1000;
			font-size: 34rpx;
			width: 100%;
			color: #fff;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			.sub-slogan {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #DAF4E6;
			}
		}
	}
	.content {
		padding: 0 32rpx;
		position: relative;
		height: 100%;
		width: 100%;
		margin-top: -120rpx;
		z-index: 100;
		box-sizing: border-box;
		.vip-select {
			background: #F7EAD9!important;
			border: 2rpx solid #E97F41
		}
		.vip {
			// width: 100%;
			position: relative;
			padding: 48rpx 32rpx 40rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(3,59,8,0.12);
			border-radius: 24rpx;
			box-sizing: border-box;
			&:not(:first-child) {
				margin-top: 32rpx
			}
			.tip {
				position: absolute;
				background: #E97F41;
				border-radius: 0rpx 16rpx 0rpx 16rpx;
				top: 0;
				right: 0;
				padding: 8rpx 12rpx;
				font-size: 20rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			.diamon2 {
				width: 38rpx;
				height: 32rpx;
				margin-right: 8rpx;
			}
			.title {
				// color: linear-gradient(90deg, #FCA877 0%, #C3AB13 100%)
				font-size: 32rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				color: #EAAA57;
			}
			.mt26 {
				margin-top: 26rpx
			}
			.f-gray {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #999A9F;
			}
			.f-orange {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #E97F41;
			}
			.symbol {
				font-size: 32rpx;
				font-family: DINPro, DINPro;
				font-weight: 400;
				color: #E97F41;
			}
			.price {
				font-size: 50rpx;
				font-family: DINPro, DINPro;
				font-weight: bold;
				color: #E97F41;
				// min-width: 260rpx;
				text-align: right;
			}
		}
	}
	.footer {
		box-sizing: border-box;
		width: 100%;
		padding: 0 40rpx;
		margin-bottom: 60rpx;
		.btn {
			height: 96rpx;
			background: linear-gradient(90deg, #F8E0A0 0%, #FF864F 100%);
			border-radius: 60rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			.icon-diamond {
				width: 38rpx;
				height: 32rpx;
				display: block;
				margin-right: 8rpx;
			}
		}
		.protocol {
			margin-top: 36rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #202127;
			.radio {
				transform:scale(0.7)
			}
			.link {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #E97F41;
			}
		}
		.ml8 {
			margin-left: 8rpx;
		}
		.mlr8 {
			margin: 0 8rpx;
		}
	}
	.shake {
	  animation: shake 0.6s ease-in-out infinite; /* 0.6s 表示动画持续时间，infinite 表示无限循环 */
	}
	@keyframes shake {
	  0% { transform: translateX(0); }
	  20% { transform: translateX(-10rpx) }
	  40% { transform: translateX(10rpx) }
	  60% { transform: translateX(-10rpx) }
	  100% { transform: translateX(0); }
	}
</style>