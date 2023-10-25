<template>
	<view class="chat flex fd-c">
		<view class="chat-box flex-1">
			<view v-for="item in dialogs" class="chat-item flex" :class="item.role === 0 ? 'fd-r' : 'fd-rr'">
				<view v-if="item.role === 0" class="flex ai-c jc-fs chat-robot chat-item-info">
					{{item.text}}
				</view>
				<view v-else class="flex ai-c jc-fe chat-self chat-item-info">
					{{item.text}}
				</view>
				<!-- <view class="chat-item-info">{{item.text}}</view> -->
			</view>
		</view>
		<view class="footer-box flex jc-sb ai-c">
			<view class="icon" @click="switchMode">
				<image class="icon" src="../../static/images/chat/audio.png" mode=""></image>
			</view>
			<view class="flex-1 flex jc-sb ai-c" v-show="textMode">
				<view class="input-box flex-1">
					<input class="input flex ai-c" type="text" @input="onInput">
				</view>
				<view class="send-box text-center flex jc-c ai-c" @click="textSend" :style="{width: textInput ? '160rpx' : 0}">发送</view>
			</view>
			<view v-show="!textMode" class="flex-1 flex jc-c ai-c">
				<view v-if="recordInfo.isRecording" @click="stopRecord">点击结束说话</view>
				<view v-else @click="startRecord">点击开始说话</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Navigator from '@/components/Navigator/Navigator.vue'
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
						console.log('录音上传成功', res)
						this.dialogs = []
						const dialogHistory = await getChatHistory(11)
						this.dialogs.push(...dialogHistory.message)
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
			LoginPopup
		},
		methods: {
			onInput (e) {
				console.log('oninput', e.detail.value)
				this.textInput = e.detail.value
			},
			async textSend () {
				await sendChatText({
					"lessonId": 11,
					 "text": this.textInput,
				})
				this.dialogs = []
				const dialogHistory = await getChatHistory(11)
				this.dialogs.push(...dialogHistory.message)
				console.log('dialogHistory', this.dialogs)
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
		.chat-item {
			width: 100%;
			// border: 1px solid green;
			margin-top: 20rpx;
		}
		.chat-item-info {
			width: 70%;
		}
		.chat-robot {
			background: #00aa00;
		}
		.chat-self {
			// display: flex;
			// justify-content: flex-end;
			background: #c7c9c9;
		}
	}
	.footer-box {
		height: 140rpx;
		background: #f2f2f2;
		padding: 0 24rpx;
		.icon {
			width: 52rpx;
			height: 52rpx;
			border: 1px solid red
		}
		.input-box {
			width: 100%;
			background: #ffffff;
			margin: 0 20rpx;
			height: 76rpx;
			.input {
				height: 76rpx;
			}
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