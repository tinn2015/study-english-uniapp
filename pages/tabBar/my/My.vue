<template>
	<view class="my flex fd-c">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
			<!-- <view class="label" :style="{top: menuButtonInfo.top + 'px'}">Hello!</view> -->
		</view>
		<view class="content flex fd-c">
			<view class="panel flex jc-sb ai-c">
				<view class="flex-1 flex fd-c ai-c">
					<view class="panel-title">
						<text>已学课程</text>
					</view>
					<view class="panel-info"><text class="ft64">5</text> 课</view>
				</view>
				<view class="line"></view>
				<view class="flex-1 flex fd-c ai-c">
					<view class="panel-title">
						<text>已学单词</text>
					</view>
					<view class="panel-info"><text class="ft64">20</text> 个</view>
				</view>
			</view>
			<view class="activity-tip flex jc-sb">
				<view class="left flex jc-c ai-c">
					<image src="https://api.itso123.com/image/horn.png" class="horn" mode=""></image>
					<view class="tip">限时领取高效学习计划</view>
				</view>
				<view class="btn">立即领取</view>
			</view>
			<view class="part-1">
				<view class="header flex jc-sb">
					<view class="title">我的英语水平</view>
				</view>
				<view class="label">未知 ｜5分钟测试英语水平，获取分析报告</view>
				<view class=""></view>
				<view class="btn flex jc-c ai-c">立即测试</view>
			</view>
			<view class="part-2">
				<view class="item flex ai-c">
					<image src="http://api.itso123.com/image/reward.png" mode="" class="icon"></image>
					<view class="label">邀请奖励</view>
				</view>
				<view class="item flex ai-c">
					<image src="http://api.itso123.com/image/help.png" mode="" class="icon"></image>
					<!-- <view class="label">帮助与反馈</view> -->
					<button class="label contact-btn" open-type="contact" @contact="handleContact">帮助与反馈</button>
				</view>
				<view class="item flex ai-c">
					<image src="http://api.itso123.com/image/help.png" mode="" class="icon"></image>
					<view class="label">英语水平测试</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {onMounted, defineComponent, reactive} from 'vue'
	import { onReady, onInit } from '@dcloudio/uni-app'
	export default defineComponent({
		setup () {
			console.log(11)
			// 小程序胶囊位置
			const menuButtonInfo  = reactive(uni.getMenuButtonBoundingClientRect())
			onReady(() => {
				console.log('ready',menuButtonInfo )
			})
			onInit(() => {
				console.log('init2')
			})
			return {
				menuButtonInfo
			}
		},
		data () {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				courses: [
					{
						poster: '',
						title: '英语水平测试',
						tip: '零基础',
						viewNum: '1200'
					}
				]
			}
		},
		mounted () {
			console.log('mounted')
		},
		onLoad () {
			console.log('load')
		},
		onInit () {
			console.log('init')
		},
		methods: {
			routerToMore () {
				uni.navigateTo({
					url: '/pages/CourseMore/CourseMore'
				})
			},
			routerToRecord () {
				uni.navigateTo({
					url: '/pages/StudyRecord/StudyRecord'
				})
			},
			routerToToday () {
				uni.navigateTo({
					url: '/pages/StudyToday/StudyToday'
				})
			}
		}
	})
</script>

<style lang="scss">
	.my {
		height: 100vh
	}
	.status_bar {
		height: 298rpx;
		width: 100%;
		color: red;
		background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
	}
	.content {
		position: relative;
		width: 100vw;
		height: calc(100% - 298rpx);
		padding: 0 32rpx;
		box-sizing: border-box;
		.panel {
			position: absolute;
			width: 686rpx;
			height: 204rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0,0,0,0.05);
			border-radius: 24rpx;
			top: -64rpx;
			left: 50%;
			transform: translateX(-50%);
			.line {
				height: 120rpx;
				border-right: 1px solid #E5E4E9;
			}
			.panel-title {
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #999A9F;
			}
			.panel-info {
				margin-top: 24rpx;
				font-size: 32rpx;
				font-family: Roboto-Bold, Roboto;
				font-weight: bold;
				color: #202127;
			}
		}
		.activity-tip {
			margin-top: 172rpx;
			background: #F4F5F7;
			border-radius: 16rpx;
			padding: 16rpx;
			.horn {
				width: 32rpx;
				height: 32rpx;
			}
			.tip {
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #202127;
				margin-left: 4rpx;
			}
			.btn {
				background: #58C898;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #FFFFFF;
				height: 48rpx;
				line-height: 48rpx;
				text-align: center;
				width: 144rpx;;
			}
		}
		.part-1 {
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(0,0,0,0.1);
			border-radius: 24rpx;
			margin-top: 32rpx;
			padding:40rpx;
			.title {
				font-size: 40rpx;
				font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
				font-weight: 500;
				color: #202127;
			}
			.label{
				margin-top: 46rpx;
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #999A9F;
			}
			.btn {
				height: 96rpx;
				background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
				border-radius: 60rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-top: 32rpx;
			}
		}
		.part-2 {
			margin-top: 16rpx;
			.item {
				margin-top: 48rpx;
			}
			.label {
				margin-left: 32rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #202127;
			}
			.contact-btn {
				padding: 0;
				background: none;
				&::after {
					border: none
				}
			}
			.icon {
				width: 44rpx;
				height: 44rpx;
			}
		}
		.ft64 {
			font-size: 64rpx;
		}
	}
</style>