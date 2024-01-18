<template>
	<view class="chat flex fd-c" @touchmove="recordTouchMove">
		<scroll-view class="chat-box flex-1" :scroll-y="true" :scroll-top="scrollTop">
			<view v-for="item in dialogs" class="chat-item flex" :class="item.role === 0 ? 'fd-r' : 'fd-rr'">
				<!-- robot -->
				<view v-if="item.role === 0" class="flex ai-c jc-fs chat-robot chat-item-info">
					<view class="flex">
						<image class="avatar mr8" :src="robotAvatar" mode=""></image>
						<view class="flex ai-c">
							<view>
								<view class="robot-text flex fw-w ai-c" >
									<ThreeBotLoading style="width: 100%;height: 100%" v-if="item.loading"></ThreeBotLoading>	
									<view v-else>{{item.text}}</view>
								</view>
								<view class="robot-translation" v-show="item.translation">{{item.translation}}</view>
							</view>
							<image class="audio-play" @click="responsePlay(item.url)" v-show="item.url" src="../../static/images/chat/audio-play.png" mode=""></image>
						</view>
					</view>
				</view>
				<!-- self -->
				<view v-else class="flex ai-c jc-fe chat-self chat-item-info">
					<view class="flex">
						<view class="self-text flex fw-w ai-c">
							<ThreeBotLoading style="width: 100%;height: 100%" :color="'#ffffff'" v-if="item.loading"></ThreeBotLoading>
							<view v-else>{{item.text}}</view>
						</view>
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
			<view v-show="!textMode" class="flex-1 flex jc-c ai-c audio-btn" @touchstart="startRecord" @touchend="stopRecord">
				<!-- <view v-if="recordInfo.isRecording" @click="stopRecord">松开 结束</view> -->
				<view>{{recordInfo.isRecording ? '松开 发送' : '按住 说话'}}</view>
			</view>
		</view>
		<!-- v-if="recordInfo.isRecording" -->
		<MusicWave v-if="recordInfo.isRecording"></MusicWave>
		<!-- <view class="record-mask" v-if="recordInfo.isRecording">
			<MusicWave class="music-wave"></MusicWave>
			<view class="send-record flex jc-c ai-c" @touchend="stopRecord">发送</view>
			<view class="cancle-record flex jc-c ai-c" @touchend="cancleRecord">取消</view>
		</view> -->
	</view>
</template>

<script>
	import Navigator from '@/components/Navigator/Navigator.vue'
	import MusicWave from '../../components/MusicWave/MusicWave.vue'
	import {useLessonStore} from '@/stores/lessons.js'
	import LoginPopup from '@/components/LoginPopup/LoginPopup.vue'
	import ThreeBotLoading  from '@/components/ThreeBotLoading/ThreeBotLoading.vue'
	import { getChatHistory, sendChatText } from "@/utils/request.js"
	import { shareMenu } from '@/utils/share.js'
	
	const responseAudioContext = uni.createInnerAudioContext({
	  useWebAudioImplement: false // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
	});
	
	export default {
		onShareAppMessage(res) {
			return {
			  title: '我的AI外教1对1，就在“开口说”',
			  path: 'pages/tabBar/home/Home',
			//   imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		  },
		  onShareTimeline () {
		  	return {
		  	  title: '我的AI外教1对1，就在“开口说”',
		  	  path: 'pages/tabBar/home/Home',
		  	//   imageUrl: 'https://api.itso123.com/image/share-poster.png'
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
					recorderManager: null,
					needCancle: false,
					positionStart: {
						x: 0,
						y: 0
					}
				},
				responseAudioContext: null, // 返回的音频播放器
				robotAvatar: '',
				msgIndex: 0, // 用于定位loading中的消息
				audioNeedStop: false, //用于判断是否播放audio
			}
		},
		onUnload () {
			console.log('onUnload')
			this.audioNeedStop = true
			responseAudioContext.stop()
		},
		async mounted() {
			const lessonStore = useLessonStore()
			const { lessonInfo } = lessonStore
			console.log('lessonInfo', lessonInfo)
			this.robotAvatar = lessonInfo.headPic
			const dialogHistory = await getChatHistory(lessonInfo.lessonId)
			this.dialogs.push(...dialogHistory.message.reverse())
			this.scrollTop = 100000
			console.log('dialogHistory', this.dialogs)
			this.recordInfo.recorderManager= uni.getRecorderManager()
			this.recordInfo.recorderManager.onStop((filePath) => {
				if (this.recordInfo.needCancle) {
					this.recordInfo.needCancle = false
					return
				}
				
				// 上传录音
				const miniProgram = uni.getAccountInfoSync().miniProgram
				console.log('====envVersion====', miniProgram.envVersion, uni.getAccountInfoSync())
				const envPrefix = miniProgram.envVersion === 'release' ? 'v1' : 'v2'
				this.dialogs.push({
					role: 1,
					loading: true,
				})
				const msgIndex = this.dialogs.length - 1
				this.$nextTick(() => {
					this.scrollTop += 100
				})
				uni.uploadFile({
					url: `https://api.itso123.com/${envPrefix}/dialog/chat/voice/analyse/${lessonInfo.lessonId}`,
					filePath: filePath.tempFilePath,
					name: 'recfile',
					lid: lessonInfo.lessonId,
					header: {
						authorization: uni.getStorageSync('authorization')
					},
					success: async (res) => {
						// const dialogHistory = await getChatHistory(11)
						// this.scrollTop = 0
						const data = JSON.parse(res.data)
						console.log('录音上传成功', data)
						this.dialogs.splice(msgIndex, 1, {
							role: 1,
							text: data.message,
						}, {
							role: 0,
							text: data.responseMsg,
							duration: data.messageDuration,
							translation: data.responseTranslation,
							url: data.responseUrl
						})
						if (data.responseUrl && !this.audioNeedStop) {
							this.responsePlay(data.responseUrl)
						}
						// this.dialogs.push({
						// 	role: 1,
						// 	text: data.message,
						// }, {
						// 	role: 0,
						// 	text: data.responseMsg,
						// 	duration: data.messageDuration,
						// 	translation: data.responseTranslation,
						// 	url: data.responseUrl
						// })
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
			MusicWave,
			ThreeBotLoading
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
				}, {
					role: 0,
					loading: true
				})
				const msgIndex = this.dialogs.length - 1
				this.$nextTick(() => {
					this.scrollTop += 100
					this.textInput = ''
				})
				const lessonStore = useLessonStore()
				const { lessonInfo } = lessonStore
				const res = await sendChatText({
					"lessonId": lessonInfo.lessonId,
					 "text": this.textInput,
				})
				this.dialogs.splice(msgIndex, 1, {
					text: res.responseMsg,
					role: 0,
					duration: res.messageDuration,
					translation: res.responseTranslation,
					url: res.responseUrl,
					// ...res
				})
				// this.dialogs.push({
				// 	text: res.responseMsg,
				// 	role: 0,
				// 	...res
				// })
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
			startRecord (e) {
				uni.vibrateShort()
				this.recordInfo.positionStart = {
					x: e.changedTouches[0].pageX,
					y: e.changedTouches[0].pageY
				}
				this.recordInfo.isRecording = true
				this.recordInfo.needCancle = false
				this.recordInfo.recorderManager.start({
					format: "wav",
					sampleRate: 8000
				})
			},
			stopRecord () {
				this.recordInfo.isRecording = false
				this.recordInfo.needCancle = false
				this.recordInfo.recorderManager.stop()
			},
			cancleRecord () {
				this.recordInfo.isRecording = false
				this.recordInfo.needCancle = true
				this.recordInfo.recorderManager.stop()
			},
			recordTouchMove (e) {
				console.log('recordTouchMove', e)
			},
			async responsePlay (url) {
				responseAudioContext.stop()
				responseAudioContext.src = url;
				responseAudioContext.play()
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
			width: 90%;
		}
		.chat-robot {
			// background: #00aa00;
		}
		.avatar {
			width: 80rpx;
			height: 80rpx;
			flex-shrink: 0;
			border-radius: 50%;
		}
		.audio-play {
			width: 54rpx;
			height: 54rpx;
			flex-shrink: 0;
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
	.record-mask {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.6);
		.music-wave {
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.send-record {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 140rpx;
			background: #59C47F;
			border-radius: 100% 100% 0 0;
		}
		.cancle-record {
			position: absolute;
			bottom: 150rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 180rpx;
			height: 80rpx;
			// background: #999A9F;
			background: #c42408;
			color: #ffffff;
			border-radius: 8rpx;
			z-index: 1000;
		}
		// .send-record {
		// 	position: absolute;
		// 	left: 50%;
		// 	transform: translateX(-50%);
		// 	bottom: 0;
		// 	width: 95%;
		// 	height: 140rpx;
		// 	background: #59C47F;
		// 	border-radius: 16rpx;
		// }
		// .cancle-record {
		// 	position: absolute;
		// 	bottom: 150rpx;
		// 	width: 95%;
		// 	height: 140rpx;
		// 	left: 50%;
		// 	transform: translateX(-50%);
		// 	// background: #999A9F;
		// 	background: #c42408;
		// 	color: #ffffff;
		// 	border-radius: 16rpx;
		// }
	}
	.mr8 {
		margin-right: 8rpx;
	}
</style>