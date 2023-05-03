<template>
	<view class="home flex fd-c">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
			<view class="label" :style="{top: menuButtonInfo.top + 'px'}">Hello!</view>
		</view>
		<view class="content flex fd-c">
			<view class="panel flex jc-sb ai-c">
				<view class="flex-1 flex fd-c ai-c">
					<view class="panel-title">
						<text>累计学习</text>
						<uni-icons type="forward" size="14"></uni-icons>
					</view>
					<view class="panel-info">5课/20天</view>
				</view>
				<view class="line"></view>
				<view class="flex-1 flex fd-c ai-c">
					<view class="panel-title">
						<text>今日学习</text>
						<uni-icons type="forward" size="14"></uni-icons>
					</view>
					<view class="panel-info">5课/20天</view>
				</view>
			</view>
			<view class="part-1">
				<view class="title">热销</view>
				<swiper class="swiper" circular :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item>
						<view class="swiper-item uni-bg-red" :style="{background: 'yellow'}">A</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-green" :style="{background: 'red'}">B</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-blue" :style="{background: 'green'}">C</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="part-2">
				<view class="header flex jc-sb ai-c">
					<view class="title">轻松学</view>
					<view class="more flex jc-c ai-c">更多 <uni-icons type="forward" size="12"></uni-icons></view>
				</view>
				<view class="courses flex">
					<view v-for="item in courses" class="course-item">
						<view class="poster"></view>
						<view class="course-title">{{item.title}}</view>
						<view class="course-info flex jc-sb ai-c">
							<view class="course-info-text">{{item.tip}}</view>
							<view class="course-info-text">{{item.viewNum}}</view>
						</view>
					</view>
					<view class="poster flex fd-c jc-c ai-c">
						<uni-icons type="plusempty"></uni-icons>
						<text class="add-course-label">添加课程</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {onMounted, defineComponent, reactive} from 'vue'
	import Swiper from './Swiper/Swiper.vue'
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
		components: {
			Swiper
		},
		onLoad () {
			console.log('load')
		},
		onInit () {
			console.log('init')
		}
	})
</script>

<style lang="scss">
	.home {
		height: 100vh
	}
	.status_bar {
		height: 298rpx;
		width: 100%;
		color: red;
		background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
		.label {
			position: relative;
			left: 20rpx;
			font-size: 48rpx;
			font-family: Roboto-Bold, Roboto;
			font-weight: bold;
			color: #FFFFFF;
		}
	}
	.content {
		position: relative;
		width: 100vw;
		height: calc(100% - 298rpx);
		.panel {
			position: absolute;
			width: 686rpx;
			height: 204rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0,0,0,0.05);
			border-radius: 24rpx;
			top: -102rpx;
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
		.title {
				font-size: 40rpx;
				font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
				font-weight: 500;
				color: #202127;
			}
		.part-1 {
			margin-top: 166rpx;
			padding:0 32rpx;
			.swiper {
				overflow: hidden;
				box-sizing: border-box;
				height: 200rpx;
			}
			.swiper-item {
				display: block;
				text-align: center;
				height: 200rpx;
				border: 1px solid green;
			}
		}
		.part-2 {
			padding: 0 30rpx;
			margin-top: 64rpx;
			.more {
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #999A9F;
			}
			.courses {
				margin-top: 16rpx;
				.poster {
					width: 207rpx;
					height: 240rpx;
					background: #F4F5F7;
					border-radius: 16rpx;
					.add-course-label {
						font-size: 28rpx;
						font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
						font-weight: 400;
						color: #999A9F;
						margin-top: 24rpx
					}
				}
				.course-item {
					margin-right: 34rpx;
					.course-title {
						font-size: 28rpx;
						font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
						font-weight: 400;
						color: #202127;
						margin-top: 16rpx;
					}
					.course-info {
						.course-info-text {
							font-size: 24rpx;
							font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
							font-weight: 400;
							color: #999A9F;

						}
					}
				}
			}
		}
	}
</style>