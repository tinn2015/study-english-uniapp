<template>
	<view class="lesson">
		<view v-for="(paragraph, index) in sectionInfo">
			<view class="paragraph-active flex fd-c jc-sb ai-c" v-if="(paragraph.id === currentParagraph.id)">
				<image class="paragraph-avatar" :src="paragraph.headPic" mode=""></image>
				<view class="sentence text-center">{{paragraph.sentence}}</view>
				<view class="translation text-center">{{paragraph.translation}}</view>
				<view class="handles flex jc-c ai-c">
					<view v-if="isRecording" @click="stopRecord" class="wave-box flex fd-c ai-c">
						<!-- 正在录音中。。。 -->
						<view class="wave-label">点击结束录音</view>
						<view class="wave"></view>
					</view>
					<view v-else class="flex jc-c ai-c">
						<view class="btn">
							<image @click="stopAudio()" v-if="audioPlaying" class="icon-mini"
								src="http://api.itso123.com/image/audio-stop.png" mode=""></image>
							<image @click="playAudio(paragraph.sentenceUrl)" v-else class="icon-mini"
								src="http://api.itso123.com/image/audio-player.png" mode=""></image>
						</view>
						<view class="btn btn-mid" @click="record">
							<image class="icon" src="http://api.itso123.com/image/mic.png" mode=""></image>
						</view>
						<!-- 有结果按钮 -->
						<view v-if="parseInt(paragraph.score)" class="btn result">
							<ToolTip  :content="paragraph.result ? paragraph.result.tips : ''" :show="paragraph.tipShow || false" @close="toolTipClose">
									<view class="emoji-box" @click="playSelfAudio(paragraph.result || paragraph)">
										<view class="result-good result-label flex jc-c ai-c" v-if="parseInt(paragraph.score) && parseInt(paragraph.score) >= 80">{{parseInt(paragraph.score)}}</view>
										<view class="result-bad result-label flex jc-c ai-c" v-if="parseInt(paragraph.score) && parseInt(paragraph.score) < 60">
											<image class="result-bad-mask" src="http://api.itso123.com/image/bad-mask.png" mode=""></image>
										</view>
										<view class="result-normal result-label flex jc-c ai-c" v-else>{{parseInt(paragraph.score)}}</view>
									</view>
							</ToolTip>
							<view class="icon-box flex jc-c ai-c">
								<image class="result-icon-mini default-icon" src="http://api.itso123.com/image/smile-face.png" mode="">
								</image>
							</view>
						</view>
						<!-- 默认时按钮 -->
						<view v-else class="result-default flex jc-c ai-c">
							<image class="result-icon-mini" src="http://api.itso123.com/image/smile-default.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="paragraph flex fd-c jc-sb ai-c" v-else @click="changeParagraph(paragraph, index)">
				<view class="text-center">{{paragraph.sentence}}</view>
				<view class="mt16 paragraph-translate">{{paragraph.translation}}</view>
				<view class="triangle" v-if="parseInt(paragraph.score) !== ''"  :style="{'borderTopColor': parseInt(paragraph.score) > 80 ? '#207340' : parseInt(paragraph.score) < 60 ? '#FF0000' : '#E5860C'}"></view>
				<view v-if="parseInt(paragraph.score) !== ''" class="triangle-label" >{{ parseInt(paragraph.score) }}</view>
			</view>
		</view>
		<!-- v-if="reportBtnVisible" -->
		<view class="report-box flex jc-c ai-c" v-if="reportBtnVisible !== 0">
			<view class="report flex jc-c ai-c" v-if="reportBtnVisible === 1" @click="routeToReport('gen')">生成并获取报告</view>
			<view class="report flex jc-c ai-c" v-else @click="routeToReport('get')">查看报告</view>
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
		onReady,
		onUnload
	} from '@dcloudio/uni-app'
	import {
		useLessonStore
	} from '@/stores/lessons.js'
	import {
		ToolTip
	} from '@/components/ToolTip/ToolTip.vue'
	
	import Navigator from '@/components/Navigator/Navigator.vue'
	
	const routeToReport = (type) => {
		uni.navigateTo({
			url: `/pages/Report/Report?type=${type}`
		})
	}
	const currentParagraph = reactive({
		id: 0,
		info: {},
		index: 0
	})
	// 是否在录音中， 用于控制录音动画
	const isRecording = ref(false)
	/**
	 * 是否中断录音上传
	 * 切换录音时需要中断上传
	 */
	const interruptRecording = ref(false)
	

	const lessonStore = useLessonStore()
	const {
		sectionInfo,
		currentSection,
		lessonInfo,
		currentSectionFinished
	} = lessonStore
	console.log('lessonInfo', lessonInfo)
	onBeforeMount(() => {
		if (!sectionInfo.length) return
		currentParagraph.id = sectionInfo[0].id
		currentParagraph.info = sectionInfo[0]
		currentParagraph.index = 0
		console.log('currentParagraph', currentParagraph, sectionInfo)
	})
	onMounted(() => {
		playAudio(currentParagraph.info.sentenceUrl)
	})
	
	onUnload(() => {
		console.log('onUnload')
		stopAudio()
		selfAudioContext.stop()
	})
	
	// 是否显示获取报告按钮
	const reportBtnVisible = ref(currentSectionFinished)

	// 切换段落
	const changeParagraph = (paragraph, index) => {
		currentParagraph.id = paragraph.id
		currentParagraph.info = paragraph
		currentParagraph.index = index
		if (isRecording.value) {
			interruptRecording.value = true
			stopRecord()
		}
		selfAudioContext.stop()
		playAudio(currentParagraph.info.sentenceUrl)
	}

	// 录音
	const recorderManager = uni.getRecorderManager()
	recorderManager.onStop((filePath) => {
		console.log('filePath', filePath)
		console.log('interruptRecording', interruptRecording.value)
		if (interruptRecording.value) {
			console.log('[中断录音上传]')
			interruptRecording.value = false
			return
		}
		// 上传录音
		uni.uploadFile({
			url: `https://api.itso123.com/v1/dialog/speak/analyse/${lessonInfo.lessonId}/${currentParagraph.id}`,
			filePath: filePath.tempFilePath,
			name: 'recfile',
			cid: currentParagraph.id,
			header: {
				authorization: uni.getStorageSync('authorization')
			},
			success: (res) => {
				console.log('录音上传成功', res)
				if (res.statusCode === 200) {
					const data = res.data && JSON.parse(res.data)
					isRecording.value = false
					interruptRecording.value = false
					const sectionIndex = sectionInfo.findIndex(section => section.id === data.contextId)
					console.log('句子上下文 序号 sectionIndex', sectionIndex)
					if (sectionIndex > -1) {
						sectionInfo[sectionIndex].result = data
						sectionInfo[sectionIndex].score = data.emo
						sectionInfo[sectionIndex].recUrl = data.recUrl
						sectionInfo[sectionIndex].tipShow = true
					}
					// sectionInfo[currentParagraph.index]['result'] = data
					// sectionInfo[currentParagraph.index]['tipShow'] = true
					reportBtnVisible.value = data.displayGetReport
				}
				console.log('sectionInfo', currentParagraph.index, sectionInfo)
			},
			fail: (err) => {
				console.log('录音上传失败', err)
			}
		})
	})
	recorderManager.onError((err) => {
		console.log('record error', err)
		stopRecord()
	})
	const record = () => {
		stopAudio()
		isRecording.value = true
		playPromptAudio('startPrompt')
	}

	const stopRecord = () => {
		recorderManager.stop()
		playPromptAudio('endPrompt')
		isRecording.value = false
	}
	
	/**
	 * 播放叮的一声
	 */
	const promptAudioContext = uni.createInnerAudioContext();
	const promptType = ref('')
	
	const playPromptAudio = (type) => {
		promptAudioContext.src = "http://api.itso123.com/image/prompt.mp3";
		promptAudioContext.play()
		promptType.value = type
		console.log('playPromptAudio', type, type === 'startRecord')
	}
	
	promptAudioContext.onEnded(() => {
		if (promptType.value === 'startPrompt') {
			recorderManager.start({
				format: "wav",
				sampleRate: 8000
			})
		}
	})
	
	/**
	 * 播放自己的句子
	 */
	const selfAudioContext = uni.createInnerAudioContext();
	
	const playSelfAudio = (result) => {
		selfAudioContext.src = result.recUrl;
		selfAudioContext.play()
	}
	

	/**
	 * 播放句子
	 */
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.onPlay(() => {
		audioPlaying.value = true
		console.log('开始播放');
	});
	innerAudioContext.onError((res) => {
		console.log(res.errMsg);
		console.log(res.errCode);
		audioPlaying.value = false
	});
	innerAudioContext.onEnded(() => {
		audioPlaying.value = false
	})
	innerAudioContext.onStop(() => {
		audioPlaying.value = false
	})
	const audioPlaying = ref(false)
	const playAudio = (url) => {
		innerAudioContext.stop()
		innerAudioContext.src = url;
		innerAudioContext.play()
	}

	const stopAudio = () => {
		innerAudioContext.stop()
	}

	// 注册局部组件
	const app = createApp({
		/* root component options */
	})
	app.component({
		ToolTip
	})
	const toolTipClose = () => {
		console.log('toolTipClose')
	}
</script>

<style scoped lang="scss">
	.lesson {
		padding-bottom: 60rpx
	}
	.paragraph {
		background: #F2F2F2;
		// height: 160rpx;
		padding: 120rpx 32rpx;
		border-top: 1px solid #dddddd;
		color: #999A9F;
		font-size: 44rpx;
		font-family: Roboto-Regular, Roboto;
		font-weight: 400;
		position: relative;
		.paragraph-translate {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #999A9F;
		}
	}

	.paragraph-active {
		padding: 40rpx;
		.paragraph-avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
		.sentence {
			font-size: 44rpx;
			color: #1a9546;
			font-weight: 600;
		}
		.translation {
			font-size: 26rpx;
			color: #808080;
		}
		.handles {
			height: 150rpx;
			width: 100%;
			margin-top: 88rpx;

			.icon-mini {
				width: 96rpx;
				height: 96rpx;
				display: block;
			}
			
			.icon-box {
				width: 96rpx;
				height: 96rpx;
			}
			
			.result-icon-mini {
				width: 56rpx;
				height: 56rpx;
				display: block;
			}
			
			.default-icon {
				opacity: 0.8;
				// width: 56rpx;
				// height: 56rpx;
				// display: block;
			}
			
			.result {
				position: relative;
			}
			
			.result-default {
				width: 96rpx;
				height: 96rpx;
				background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
				border-radius: 50%
			}
			
			.result-good {
				width: 96rpx;
				height: 96rpx;
				background: rgba(32, 115, 64, 0.6);
				position: absolute;
				border-radius: 50%;
				top: 0;
				left: 0;
				z-index: 100;
			}
			.result-normal {
				width: 96rpx;
				height: 96rpx;
				background: rgba(229, 134, 12, 0.6);
				position: absolute;
				border-radius: 50%;
				top: 0;
				left: 0;
				z-index: 100;
			}
			
			.result-bad {
				width: 96rpx;
				height: 96rpx;
				background: rgba(229, 85, 12, 0.6);
				position: absolute;
				border-radius: 50%;
				top: 0;
				left: 0;
				z-index: 100;
				.result-bad-mask {
					width: 56rpx;
					height: 44rpx;
					display: block;
				}
			}
			
			.result-label {
				font-size: 48rpx;
				font-family: Roboto-Bold, Roboto;
				font-weight: bold;
				color: #FFFFFF;
			}

			.icon {
				width: 120rpx;
				height: 120rpx
			}

			.btn-mid {
				margin: 0 70rpx
			}
		}
	}

	.translation {
		margin-top: 32rpx;
	}
	
	.report-box {
		margin-top: 60rpx;
		position: relative;
		.report {
			width: 670rpx;
			height: 96rpx;
			background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
			border-radius: 60rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
	}
	
	.triangle {
	  width: 0;
	  height: 0;
	  border-left: 80rpx solid transparent;
	  border-bottom: 80rpx solid transparent;
	  // border-right: 80rpx solid transparent;
	  border-top: 80rpx solid #207340;
	  position: absolute;
	  right: 0;
	  top: 0;
	  opacity: 0.3;
	}
	
	.triangle-label {
		position: absolute;
		right: 8rpx;
		top: 8rpx;
		font-size: 28rpx;
		font-family: Roboto-Regular, Roboto;
		font-weight: 400;
		color: #FFFFFF;
	}
	
	
	.mt16 {
		margin-top: 16rpx;
	}
	
	.mt60 {
		margin-top: 60rpx;
	}

	.wave-box {
		width: 100%;
		height: 100%;

		.wave-label {
			color: #8d8d8d;
			margin-bottom: 20rpx;
		}
	}
	
	.text-center {
		text-align: center;
	}

	.wave {
		position: relative;
		width: 50%;
		height: 8rpx;
		border-radius: 4rpx;
		animation: wave .4s infinite linear alternate;
		background: rgb(7, 59, 99);
		background: linear-gradient(90deg, #59c47f 0%, #6be7b7 100%);
	}

	@keyframes wave {
		0% {
			width: 50%
		}

		100% {
			width: 90%;
		}
	}
</style>