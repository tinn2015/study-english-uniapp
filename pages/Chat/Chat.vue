<template>
	<view class="chat flex fd-c">
		<scroll-view class="chat-box flex-1" :scroll-y="true" :scroll-top="scrollTop">
			<view v-for="item in dialogs" class="chat-item flex" :class="item.role === 0 ? 'fd-r' : 'fd-rr'">
				<!-- robot -->
				<view v-if="item.role === 0" class="flex ai-c jc-fs chat-robot chat-item-info">
					<view class="flex">
						<image class="avatar" src="../../static/images/chat/self-avatar.png" mode=""></image>
						<view class="flex ai-c">
							<view>
								<view class="robot-text flex fw-w ai-c">{{item.text}}</view>
								<view class="robot-translation">{{item.translation}}</view>
							</view>
							<image class="audio-play" v-show="item.duration" src="../../static/images/chat/audio-play.png" mode=""></image>
						</view>
					</view>
				</view>
				<!-- self -->
				<view v-else class="flex ai-c jc-fe chat-self chat-item-info">
					<view class="flex">
						<view class="self-text flex fw-w ai-c">{{item.text}}</view>
						<image class="avatar" src="../../static/images/chat/self-avatar.png" mode=""></image>
					</view>
				</view>
				<!-- <view class="chat-item-info">{{item.text}}</view> -->
			</view>
		</scroll-view>
		<view class="footer-box flex jc-sb ai-c">
			<view class="icon" @click="switchMode">
				<image class="icon" src="../../static/images/chat/audio-switch.png" mode=""></image>
			</view>
			<view class="flex-1 flex jc-sb ai-c" v-show="textMode">
				<view class="input-box flex-1">
					<input ref="$input" class="input flex ai-c" type="text" v-model="textInput">
				</view>
				<view class="send-box text-center flex jc-c ai-c" @click="textSend" :style="{width: textInput ? '140rpx' : 0, marginLeft: textInput ? '24rpx' : 0}">发送</view>
			</view>
			<view v-show="!textMode" class="flex-1 flex jc-c ai-c audio-btn">
				<!-- <view v-if="recordInfo.isRecording" @click="stopRecord">松开 结束</view> -->
				<view @touchstart="startRecord" @touchend="stopRecord">{{recordInfo.isRecording ? '松开 发送' : '按住 说话'}}</view>
			</view>
		</view>
		<MusicWave v-if="recordInfo.isRecording"></MusicWave>
	</view>
</template>

<script>
	import Navigator from '@/components/Navigator/Navigator.vue'
	import MusicWave from '../../components/MusicWave/MusicWave.vue'
	import {useLessonStore} from '@/stores/lessons.js'
	import LoginPopup from '@/components/LoginPopup/LoginPopup.vue'
	import { getChatHistory, sendChatText } from "@/utils/request.js"
	import { shareMenu } from '@/utils/share.js'
	export default {
		onShareAppMessage(res) {
			return {
			  title: '一对一口语练习，就在“开口说”',
			  path: 'pages/tabBar/home/Home',
			  imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		  },
		setup () {
			shareMenu()
			const lessonStore = useLessonStore()
			console.log('lessonStore', lessonStore)
			return {
				lessonStore
			}
		},
		data () {
			return {
				dialogs: [],
				textInput: '',
				scrollTop: 0,
				textMode: true,
				recordInfo: {
					isRecording: false,
					recorderManager: null
				}
			}
		},
		async mounted() {
			const dialogHistory = await getChatHistory(11)
			this.dialogs.push(...dialogHistory.message)
			this.scrollTop = 10000
			console.log('dialogHistory', this.dialogs)
			this.recordInfo.recorderManager= uni.getRecorderManager()
			this.recordInfo.recorderManager.onStop((filePath) => {
				// 上传录音
				const miniProgram = uni.getAccountInfoSync().miniProgram
				console.log('====envVersion====', miniProgram.envVersion, uni.getAccountInfoSync())
				const envPrefix = miniProgram.envVersion === 'release' ? 'v1' : 'v2'
				uni.uploadFile({
					url: `https://api.itso123.com/${envPrefix}/dialog/chat/voice/analyse/11`,
					filePath: filePath.tempFilePath,
					name: 'recfile',
					lid: 11,
					header: {
						authorization: uni.getStorageSync('authorization')
					},
					success: async (res) => {
						// const dialogHistory = await getChatHistory(11)
						// this.scrollTop = 0
						const data = JSON.parse(res.data)
						console.log('录音上传成功', data)
						this.dialogs.push({
							role: 1,
							text: data.message,
						}, {
							role: 0,
							text: data.responseMsg,
							duration: data.messageDuration,
							translation: data.responseTranslation
						})
						this.$nextTick(() => {
							this.scrollTop += 100
						})
						console.log('dialogHistory', this.dialogs)
					},
					fail: (err) => {
						console.log('录音上传失败', err)
					}
				})
			})
		},
		components: {
			Navigator,
			LoginPopup,
			MusicWave
		},
		methods: {
			// onInput (e) {
			// 	console.log('oninput', e.detail.value)
			// 	this.textInput = e.detail.value
			// },
			async textSend () {
				this.dialogs.push({
					text: this.textInput,
					role: 1,
					...res
				})
				const res = await sendChatText({
					"lessonId": 11,
					 "text": this.textInput,
				})
				this.dialogs.push({
					text: res.responseMsg,
					role: 0,
					...res
				})
				this.$nextTick(() => {
					this.scrollTop += 100
					this.textInput = ''
				})
				// setTimeout(() => {
				// 	this.scrollTop += 10
				// 	console.log('this.dialogs', this.dialogs)
				// }, 200)
			},
			switchMode () {
				this.textMode = !this.textMode
			},
			startRecord () {
				this.recordInfo.isRecording = true
				this.recordInfo.recorderManager.start({
					format: "wav",
					sampleRate: 8000
				})
			},
			stopRecord () {
				this.recordInfo.isRecording = false
				this.recordInfo.recorderManager.stop()
			}
		}
	}
</script>

<style scoped lang="scss">
	.chat {
		height: 100vh;
		overflow: hidden;
	}
	.chat-box {
		height: 100%;
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		overflow-y: auto;
		overflow-x: hidden;
		background: #EFF1F5;
		.chat-item {
			width: 100%;
			// border: 1px solid green;
			margin-top: 20rpx;
		}
		.chat-item-info {
			width: 70%;
		}
		.chat-robot {
			// background: #00aa00;
		}
		.avatar {
			width: 80rpx;
			height: 80rpx;
			flex-shrink: 0;
		}
		.audio-play {
			width: 44rpx;
			height: 44rpx;
		}
		.chat-self {
			// display: flex;
			// justify-content: flex-end;
			.self-text {
				min-width: 250rpx;
				min-height: 30rpx;
				max-width: 400rpx;
				background: #58C898;
				border-radius: 16rpx;
				padding: 16rpx 24rpx;
				margin-right: 16rpx;
				word-break: break-word;
				color: #ffffff;
			}
		}
		.chat-robot {
			.robot-text {
				min-width: 250rpx;
				min-height: 30rpx;
				max-width: 400rpx;
				background: #ffffff;
				border-radius: 16rpx;
				padding: 16rpx 24rpx;
				margin-right: 16rpx;
				word-break: break-word;
				color: #202127
			}
			.robot-translation {
				margin-top: 8rpx; 
				min-width: 150rpx;
				min-height: 30rpx;
				max-width: 400rpx;
				background: #E5E4E9;
				border-radius: 16rpx;
				padding: 16rpx 24rpx;
				margin-right: 16rpx;
				word-break: break-word;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999A9F;
			}
		}
	}
	.footer-box {
		height: 140rpx;
		background: #f2f2f2;
		padding: 0 24rpx;
		.icon {
			width: 52rpx;
			height: 52rpx;
			margin-right: 24rpx;
		}
		.input-box {
			width: 100%;
			background: #ffffff;
			height: 76rpx;
			border-radius: 16rpx;
			.input {
				height: 76rpx;
				padding: 0 24rpx;
			}
		}
		.audio-btn {
			background: #ffffff;
			height: 76rpx;
			border-radius: 16rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 500;
			color: #171717;
		}
		.send-box {
			width: 0;
			height: 76rpx;
			background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
			border-radius: 20rpx;
			color: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			transition: all .3s ease-in-out; 
			white-space: nowrap;
			
		}
	}
</style>