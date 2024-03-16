<template>
	<view class="invite">
		<view class="header">
			<Navigator></Navigator>
			<view class="header-title">
				<view>邀请好友</view>
				<view>获取“开口说英语”口语练习时长</view>
			</view>
			<image class="bg" src="../../static/invite/bg.png" mode="scaleToFill"></image>
			<image class="icon-gift" src="../../static/invite/gift.png" mode="scaleToFill"></image>
		</view>
		<view class="invite-content flex fd-c jc-sb">
			<view>
				<view class="box flex jc-c ai-c">
					<view class="left w-half flex fd-c ai-c">
						<image class="tip-icon" src="../../static/invite/msg.png" mode=""></image>
						<view class="tip-label">每邀请一名好友+30次智能对话</view>
					</view>
					<view class="right w-half flex fd-c ai-c">
						<view class="invite-num">{{inviteStore.inviteNum}}</view>
						<view class="invite-num-tip">已邀请人数</view>
					</view>
				</view>
				<view class="box">
					<view class="sub-title flex ai-c">
						<view>参与步骤 </view>
						<view class="sub-title-tip"> ( 最多可邀请6人 )</view>
					</view>
					<view class="flex jc-sb ai-fs mt28">
						<view class="step-item flex fd-c ai-c">
							<view class="step-num flex jc-c ai-c">1</view>
							<view class="step-label">复制邀请码</view>
						</view>
						<view class="line"></view>
						<view class="step-item flex fd-c ai-c">
							<view class="step-num flex jc-c ai-c">2</view>
							<view class="step-label">发送邀请码给好友</view>
						</view>
						<view class="line"></view>
						<view class="step-item flex fd-c ai-c">
							<view class="step-num flex jc-c ai-c">3</view>
							<view class="step-label">好友打开小程序</view>
						</view>
						<view class="line"></view>
						<view class="step-item flex fd-c ai-c">
							<view class="step-num flex jc-c ai-c">4</view>
							<view class="step-label">填写邀请码</view>
						</view>
					</view>
				</view>
			</view>
			<view class="footer flex fd-c jc-c ai-c">
				<view class="invite-code-box flex jc-c ai-c">
					<view class="code">我的邀请码：{{inviteStore.inviteCode}}</view>
					<image class="copy" src="../../static/invite/copy.png" mode="" @click="copy(inviteStore.inviteCode)"></image>
				</view>
				<button class="invite-box flex jc-c ai-c" type="default" open-type="share">
					去邀请
				</button>
				<view class="invite-input flex jc-c ai-c" @click="openPopup">
					输入邀请码
				</view>
			</view>
		</view>
		<uni-popup ref="inputPopup" @change="change" :is-mask-click="false">
			<view class="input-popup-content flex fd-c jc-c ai-c">
				<view class="input-popup-title">输入邀请码</view>
				<input class="input" type="text" v-model="inviteCodeInput"/>
				<view class="flex jc-sb ai-c handles-box">
					<view class="input-btn input-btn-left flex jc-c ai-c" @click="closePopup">取消</view>
					<view class="input-btn input-btn-right flex jc-c ai-c" @click="checkCode">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Navigator from '@/components/Navigator/Navigator.vue'
	import {useLessonStore} from '@/stores/lessons.js'
	import {useInviteStore} from '@/stores/invite.js'
	import LoginPopup from '@/components/LoginPopup/LoginPopup.vue'
	import { removeFavoriteCourse, getSectionDetail, addFavoriteCourse, checkInviteCode } from "@/utils/request.js"
	import { shareMenu } from '@/utils/share.js'
	export default {
		onShareAppMessage(res) {
			const inviteStore = useInviteStore()
			return {
			  title: '我的AI外教1对1，就在“开口说”',
			  path: `pages/tabBar/home/Home?inviteCode=${inviteStore.inviteCode}`,
			//   imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		  },
		onShareTimeline () {
			return {
			  title: '我的AI外教1对1，就在“开口说”',
			  path: `pages/tabBar/home/Home?inviteCode=${inviteStore.inviteCode}`,
			//   imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		},
		setup () {
			shareMenu()
			const lessonStore = useLessonStore()
			console.log('lessonStore', lessonStore)
			const inviteStore = useInviteStore()
			inviteStore.getInviteCode()
			return {
				lessonStore,
				inviteStore
			}
		},
		data () {
			return {
				courses: [],
				inviteCodeInput: ''
			}
		},
		components: {
			Navigator,
			LoginPopup
		},
		computed: {
			descs () {
				const descs = this.lessonStore.lessonInfo.descript.split('#')
				return descs
			}
		},
		methods: {
			async routeToLesson () {
				const lessonStore = useLessonStore()
				const section = lessonStore.lessonInfo.sections[0]
				await lessonStore.getSectionInfo(section, 0)
				uni.navigateTo({
					url:"/pages/Lesson/Lesson"
				})
			},
			openPopup () {
				this.$refs.inputPopup.open('center')
			},
			closePopup () {
				this.$refs.inputPopup.close('center')
				this.inviteCodeInput = ''
			},
			copy (code) {
				uni.setClipboardData({
					data: code
				})
			},
			checkCode () {
				console.log('inviteCodeInput', this.inviteCodeInput)
				if (!this.inviteCodeInput) {
					uni.showToast({
						title: '请输入邀请码',
						icon: 'none'
					})
					return
				}
				checkInviteCode(this.inviteCodeInput).then(res => {
					console.log('checkInviteCode', res)
					if (res.result === '0') {
						this.$refs.inputPopup.close()
					} else {
						uni.showToast({
							title: res.reason,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.invite {
		height: 100vh;
		overflow: hidden;
	}
	.header {
		height: 522rpx;
		width: 100%;
		// background: #abcbd9;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		.bg {
			width: 100%;
			height: 100%
		}
		.icon-gift {
			width: 390rpx;
			height: 290rpx;
			position: absolute;
			z-index: 10;
			top: 92rpx;
			right: -68rpx
		}
		.header-title {
			position: absolute;
			top: 188rpx;
			left: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			color: #202127;
		}
	}
	.invite-content {
		position: relative;
		top: -120rpx;
		height: calc(100% - 522rpx + 120rpx);
		box-sizing: border-box;
		border-radius: 32rpx 32rpx 0 0;
		background: linear-gradient(360deg, #00DEA5 0%, #F5FFF8 100%);
		padding: 0 22rpx 60rpx 22rpx;
		overflow: hidden;
		.box {
			width: 100%;
			margin-top: 32rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			padding: 32rpx;
			box-sizing: border-box;
			.tip-icon {
				width: 104rpx;
				height: 68rpx
			}
			.tip-label {
				width: 200rpx;
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #999A9F;
				margin-top: 12rpx
			}
			.invite-num {
				font-size: 72rpx;
				font-family: DINPro, DINPro;
				font-weight: 500;
				color: #58C898;
			}
			.invite-num-tip {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #999A9F;
				margin-top: 18rpx;
			}
		}
		.left {
			border-right: 1px solid #E5E4E9;
		}
		.sub-title {
			font-size: 32rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			color: #202127;
			.sub-title-tip {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				color: #999A9F;
				padding-left: 20rpx;
			}
		}
		.step-item {
			.step-num {
				width: 48rpx;
				height: 48rpx;
				border: 2rpx solid #58C898;
				border-radius: 50%;
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #58C898;
			}
			.step-label {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #999A9F;
				margin-top: 20rpx;
				width: 120rpx;
				text-align: center;
			}
		}
		.line {
			width: 60rpx;
			border-top: 1rpx solid #E5E4E9;
			margin-top: 24rpx;
		}
		.footer {
			width: 100%;
			.code {
				font-size: 32rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
			.copy {
				width: 32rpx;
				height: 32rpx;
				margin-left: 16rpx;
			}
			.invite-box {
				width: 100%;
				background: #ffffff;
				border-radius: 60rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				color: #58C898;
				margin-top: 32rpx;
				padding: 24rpx 0;
				height: 96rpx;
				box-sizing: border-box;
			}
			.invite-input {
				width: 100%;
				font-size: 32rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				border-radius: 60rpx;
				border: 2rpx solid #FFFFFF;
				margin-top: 32rpx;
				padding: 24rpx 0;
				height: 96rpx;
				box-sizing: border-box;
			}
		}
	}
	.input-popup-content {
		background: #ffffff;
		padding: 32rpx;
		border-radius: 16rpx;
		.input-popup-title {
			font-size: 30rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			margin-bottom: 32rpx;
		};
		.input {
			width: 460rpx;
			border: 1px solid #dddddd;
			height: 50rpx;
			padding: 20rpx 50rpx;
			border-radius: 16rpx;
		}
		.handles-box {
			width: 100%;
			padding: 0 20rpx;
			box-sizing: border-box;
		}
		.input-btn {
			padding: 20rpx;
			border-radius: 60rpx;
			margin-top: 30rpx;
			width: 200rpx;
		}
		.input-btn-right {
			background: #58C898;
		}
		.input-btn-left {
			border: 1rpx solid #948f8f
		}
	}
	.w-half {
		width: 50%;
	}
	.mt28 {
		margin-top: 28rpx;
	}
</style>