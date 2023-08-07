<template>
	<view class="my flex fd-c">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
			<view class="login-box" :style="{top: menuButtonInfo.top + 'px'}" v-if="phoneNumber">{{phoneNumber}}</view>
			<button v-else class="login-box" :style="{top: menuButtonInfo.top + 'px'}" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				登录/注册
			</button>
		</view>
		<view class="content flex fd-c">
			<view class="panel flex jc-sb ai-c">
				<view class="flex-1 flex fd-c ai-c">
					<view class="panel-title">
						<text>已学课程</text>
					</view>
					<view class="panel-info"><text class="ft64">{{learned.lessons}}</text> 课</view>
				</view>
				<view class="line"></view>
				<view class="flex-1 flex fd-c ai-c">
					<view class="panel-title">
						<text>已学单词</text>
					</view>
					<view class="panel-info"><text class="ft64">{{learned.words}}</text> 个</view>
				</view>
			</view>
			<view class="activity-tip flex jc-sb">
				<view class="left flex jc-c ai-c">
					<image src="https://api.itso123.com/image/horn.png" class="horn" mode=""></image>
					<!-- <view class="tip">限时领取高效学习计划</view>-->
					<view class="tip">快速提升你的口语能力</view>
				</view>
				<!-- <view class="btn">立即领取</view> -->
				<view class="btn">立即行动</view>
			</view>
			<view class="part-3">
				<view class="header flex jc-sb">
					<view class="title">每日一句</view>
				</view>
				<view class="daily-en">{{ oneSentencePerDay.en }}</view>
				<view class="label">{{ oneSentencePerDay.cn }}</view>
			</view>
			<!-- <view class="part-1">
				<view class="header flex jc-sb">
					<view class="title">我的英语水平</view>
				</view>
				<view class="label">未知 ｜5分钟测试英语水平，获取分析报告</view>
				<view class=""></view>
				<view class="btn flex jc-c ai-c">立即测试</view>
			</view> -->
			<view class="part-2">
				<!-- <view class="item flex ai-c">
					<image src="http://api.itso123.com/image/reward.png" mode="" class="icon"></image>
					<view class="label">邀请奖励</view>
				</view> -->
				<view class="item">
					<view class="flex ai-c">
						<image src="http://api.itso123.com/image/en-test.png" mode="" class="icon"></image>
						<view class="label">语速设置</view>
					</view>
					<view class="sub-item">
						<uni-data-checkbox v-model="speechRate" :localdata="speechRateOptions" @change="speechRateChange" selectedColor="#59C47F"></uni-data-checkbox>
					</view>
				</view>
				<view class="item flex ai-c">
					<image src="http://api.itso123.com/image/help.png" mode="" class="icon"></image>
					<!-- <view class="label">帮助与反馈</view> -->
					<button class="label contact-btn" open-type="contact" @contact="handleContact">帮助与反馈</button>
				</view>
				<!-- <view class="item flex ai-c">
					<image src="http://api.itso123.com/image/help.png" mode="" class="icon"></image>
					<view class="label">英语水平测试</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {onMounted, defineComponent, reactive, ref} from 'vue'
	import { onReady, onInit, onShow } from '@dcloudio/uni-app'
	import { getMe, setSpeechRate, getPhoneCode } from '@/utils/request.js'
	import { shareMenu } from '@/utils/share.js'
	export default defineComponent({
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '一对一口语练习，就在“开口说”',
			  path: 'pages/tabBar/home/Home',
			  imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		  },
		setup () {
			shareMenu()
			// 小程序胶囊位置
			const menuButtonInfo  = reactive(uni.getMenuButtonBoundingClientRect())
			onReady(() => {
				console.log('ready',menuButtonInfo )
			})
			onInit(() => {
				console.log('init2')
			})
			// 已学内容
			const learned = reactive({
				lessons: 0,
				words: 0
			})
			const oneSentencePerDay = reactive({
				cn: "",
				en: ""
			})
			const speechRate = ref(1)
			onShow(() => {
				getMe().then(res => {
					learned.lessons = res.studyLessons
					learned.words = res.studyWords
					console.log('me', res, learned)
					oneSentencePerDay.cn = res.dailyCn
					oneSentencePerDay.en = res.dailyEn
					speechRate.value = res.speechRate
				})
			})
			return {
				menuButtonInfo,
				learned,
				oneSentencePerDay,
				speechRate
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
				],
				speechRateOptions: [
				  {value: 0,text: '慢速'},
				  {value: 1,text: '正常'},
				  {value: 2,text: '快速'}
				],
				phoneNumber: ''
			}
		},
		mounted () {
			console.log('mounted')
			const userPhoneNumber = uni.getStorageSync('userPhoneNumber')
			this.phoneNumber = userPhoneNumber
		},
		onLoad () {
			console.log('load')
		},
		onInit () {
			console.log('init')
		},
		methods: {
			getPhoneNumber (e) {
				getPhoneCode(e.detail.code).then(res => {
					console.log(res)
					this.phoneNumber = res.phone
					uni.setStorage({
						key: 'userPhoneNumber',
						data: res.phone
					})
				})
			},
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
			},
			speechRateChange (e) {
				console.log('speechRateChange', e)
				const speechRate = e.detail.value
				setSpeechRate(speechRate)
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
		.login-box {
			position: relative;
			left: 20rpx;
			font-size: 43rpx;
			font-family: Roboto-Bold, Roboto;
			font-weight: bold;
			color: #ffffff;
			background: none;
			border:none;
			outline: none;
			text-align: left;
			&::after {
				border:none;
			}
		}
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
			.sub-item {
				margin-left: 76rpx;
				margin-top: 20rpx;
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
		.part-3 {
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
				margin-top: 20rpx;
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #999A9F;
			}
			.daily-en {
				color: #59C47F;
				font-size: 40rpx;
				margin-top: 20rpx;
				font-weight: 500;
			}
		}
		.ft64 {
			font-size: 64rpx;
		}
	}
</style>