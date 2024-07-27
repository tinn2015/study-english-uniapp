<template>
	<view class="lesson-container">
		<view class="header">
			<Navigator>
				<!-- <view>切换模式</view> -->
				<view class="flex ai-c" v-if="!loginStore.isIos">
					<view class="ft26" :style="{color: !lessonMode ? '#000000' : '#8d8d8d'}">跟读</view>
					<switch style="transform:scale(0.6)" color="#59c47f" :checked="lessonMode" @change="lessonModeChange" />
					<view class="ft26" :style="{color: lessonMode ? '#000000' : '#8d8d8d'}">对话</view>
				</view>
			</Navigator>
		</view>
		<!-- :scroll-into-view="scrollId" -->
		<scroll-view class="lesson" id="scrollView" scroll-y :scroll-top="scrollTop"  :scroll-with-animation="true" >
			<!-- 对话模式 -->
			<view v-if="lessonMode">
				<view v-for="(paragraph, index) in sectionInfo" :id="`scrollId${index}`">
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
								<!-- 播放按钮 -->
								<view class="btn" v-if="index % 2 == 0">
									<image @click="stopAudio()" v-if="audioPlaying" class="icon-mini"
										src="http://api.itso123.com/image/audio-stop.png" mode=""></image>
									<image @click="playAudio(paragraph.sentenceUrl)" v-else class="icon-mini"
										src="http://api.itso123.com/image/audio-player.png" mode=""></image>
								</view>
								<!-- 录音按钮 -->
								<view class="btn btn-mid" v-else @click="record">
									<image class="icon" src="http://api.itso123.com/image/mic.png" mode=""></image>
								</view>
								<!-- 有结果按钮 -->
								<!-- <view v-if="parseInt(paragraph.score) && index > 0" class="btn result">
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
								</view> -->
								<!-- 默认时按钮 -->
								<!-- <view v-else-if="index > 0" class="result-default flex jc-c ai-c">
									<image class="result-icon-mini" src="http://api.itso123.com/image/i.png" mode=""></image>
								</view> -->
							</view>
						</view>
					</view>
					<view class="paragraph flex fd-c jc-sb ai-c" v-else @click="changeParagraph(paragraph, index)">
						<view class="text-center">{{paragraph.sentence}}</view>
						<view class="mt16 paragraph-translate">{{paragraph.translation}}</view>
						<view class="triangle" v-if="paragraph.score !== ''"  :style="{'borderTopColor': parseInt(paragraph.score) > 80 ? '#207340' : parseInt(paragraph.score) < 60 ? '#FF0000' : '#E5860C'}"></view>
						<view v-if="paragraph.score !== ''" class="triangle-label" >{{ parseInt(paragraph.score) }}</view>
					</view>
				</view>
			</view>
			<view v-else>
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
									<image class="result-icon-mini" src="http://api.itso123.com/image/i.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
					<view class="paragraph flex fd-c jc-sb ai-c" v-else @click="changeParagraph(paragraph, index)">
						<view class="text-center">{{paragraph.sentence}}</view>
						<view class="mt16 paragraph-translate">{{paragraph.translation}}</view>
						<view class="triangle" v-if="paragraph.score !== ''"  :style="{'borderTopColor': parseInt(paragraph.score) > 80 ? '#207340' : parseInt(paragraph.score) < 60 ? '#FF0000' : '#E5860C'}"></view>
						<view v-if="paragraph.score !== ''" class="triangle-label" >{{ parseInt(paragraph.score) }}</view>
					</view>
				</view>
			</view>
			<!-- v-if="reportBtnVisible" -->
			<view class="report-box flex jc-c ai-c" v-if="reportBtnVisible !== 0">
				<view class="report flex jc-c ai-c" v-if="reportBtnVisible === 1" @click="routeToReport('gen')">生成并获取报告</view>
				<view class="report flex jc-c ai-c" v-else @click="routeToReport('get')">查看报告</view>
			</view>
		</scroll-view>
		<VipPayPopup v-if="vipPopVisible" @close="vipPopClose"></VipPayPopup>
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
		onUnload,
		onShow,
	} from '@dcloudio/uni-app'
	import {
		useLessonStore
	} from '@/stores/lessons.js'
	import { useLoginStore } from '@/stores/login.js'
	import {
		ToolTip
	} from '@/components/ToolTip/ToolTip.vue'
	
	import Navigator from '@/components/Navigator/Navigator.vue'
	import VipPayPopup from '@/components/vipPayPopup/VipPayPopup.vue'
	import { shareMenu } from '@/utils/share.js'
	import { getLessonType, setLessonMode } from '@/utils/request.js'
	import { soundDetection } from '@/pages/Lesson/sound-detection.js'
	
	shareMenu()
	const onShareAppMessage = (res) => {
		return {
		  title: '我的AI外教1对1，就在“开口说”',
		  path: 'pages/tabBar/home/Home',
		//   imageUrl: 'https://api.itso123.com/image/share-poster.png'
		}
	  }
	const onShareTimeline = (res) => {
		return {
		  title: '我的AI外教1对1，就在“开口说”',
		  path: 'pages/tabBar/home/Home',
		//   imageUrl: 'https://api.itso123.com/image/share-poster.png'
		}
	  }

	
	const routeToReport = (type) => {
		stopSelfAudioContext()
		stopAudio()
		if (isRecording.value) {
			interruptRecording.value = true
			stopRecord()
		}
		uni.navigateTo({
			url: `/pages/Report/Report?type=${type}`
		})
	}
	const currentParagraph = reactive({
		id: 0,
		info: {},
		index: 0
	})
	const loginStore = useLoginStore()
	// 页面是否关闭
	const pageIsClose = ref(false)
	// 显示区id
	const scrollId = ref('')
	const scrollTop = ref(0)
	// 是否在录音中， 用于控制录音动画
	const isRecording = ref(false)
	/**
	 * 是否中断录音上传
	 * 切换录音时需要中断上传
	 */
	const interruptRecording = ref(false)
	
	/**
	 * 付费弹框
	 */
	const vipPopVisible = ref(false)
	
	/**
	 * 课程模式
	 */
	const lessonMode = ref(false)

	const lessonStore = useLessonStore()
	const {
		sectionInfo,
		currentSection,
		lessonInfo,
		currentSectionFinished
	} = lessonStore
	console.log('lessonInfo', lessonInfo)
	onBeforeMount(() => {
		// if (!sectionInfo.length) return
		// currentParagraph.id = sectionInfo[0].id
		// currentParagraph.info = sectionInfo[0]
		// currentParagraph.index = 0
		// console.log('currentParagraph', currentParagraph, sectionInfo)
	})
	onMounted(() => {
		// console.log('playAudio', playAudio)
		
	})
	
	onShow(() => {
		console.log('lesson show')
		if (!sectionInfo.length) return
		currentParagraph.id = sectionInfo[0].id
		currentParagraph.info = sectionInfo[0]
		currentParagraph.index = 0
		console.log('currentParagraph', currentParagraph, sectionInfo)
		if (!loginStore.isIos) {
			getLessonType(lessonInfo.lessonId, currentSection.id).then(res => {
				lessonMode.value = res.mode === 1
				console.log('getLessonType', res)
				console.log('lessonMode', lessonMode.value)
				if (lessonMode.value && res.displaySeller !== 0) {
					vipPopVisible.value = true
				} else {
					vipPopVisible.value = false
					console.log('playAudio-currentParagraph.info.sentenceUrl', currentParagraph.info.sentenceUrl)
					playAudio(currentParagraph.info.sentenceUrl)
				}
			})
		}
	})
	
	onUnload(() => {
		console.log('onUnload')
		stopAudio()
		stopSelfAudioContext()
		pageIsClose.value = true
		stopRecord()
		clearTimeout(dialogRecordTimer.value)
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
		stopSelfAudioContext()
		// 对讲模式
		if (lessonMode.value) {
			if (currentParagraph.index % 2 !== 0) {
				record()
			} else {
				playAudio(currentParagraph.info.sentenceUrl)
			}
		} else {
			playAudio(currentParagraph.info.sentenceUrl)
		}
		wx.createSelectorQuery().select('#scrollView').scrollOffset((res) => {
			const scrollViewTop = res.scrollTop
			scrollTop.value = scrollViewTop
		}).exec();
	}
	
	/**
	 * 自动切换下一句
	 */
	const changeToNextParagraph = () => {
		const nextIndex = currentParagraph.index + 1
		const nextParagraph = sectionInfo[nextIndex]
		console.log('changeToNextParagraph', nextIndex, nextParagraph)
		if (nextParagraph) {
			currentParagraph.id = nextParagraph.id
			currentParagraph.info = nextParagraph
			currentParagraph.index = nextIndex
			scrollId.value = `scrollId${currentParagraph.index}`
			console.log('scrollId', scrollId.value)
			const query = wx.createSelectorQuery()
			query.select(`#scrollId${currentParagraph.index}`).boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(function(res){
			  console.log('createSelectorQuery', res)
			  const top = res[0].top       // #the-id节点的上边界坐标
			  const height = res[0].height       // #the-id节点的上边界坐标
			  const scrollHeight = res[1].scrollHeight // 显示区域的竖直滚动位置
			  console.log('滚动条位置changeToNextParagraph', top, scrollHeight / 2)
			  if (top > scrollHeight / 2) {
				  scrollTop.value += top - scrollHeight / 2 + height / 2
			  }
			})
			// const query = uni.createSelectorQuery()
			// query.select(`#scrollId${currentParagraph.index}`).boundingClientRect(function(res){
			//   // res.top // #the-id 节点的上边界坐标（相对于显示区域）
			//   console.log('boundingClientRect', res)
			//   scrollTop.value = res.top - res.height // 显示区域的竖直滚动位置
			//   console.log('scrollTop.value', scrollTop.value)
			// })
			query.exec()
			if (isRecording.value) {
				interruptRecording.value = true
				stopRecord()
			}
			stopSelfAudioContext()
			// playAudio(currentParagraph.info.sentenceUrl)
			// dialogRecord()
			if (currentParagraph.index % 2 !== 0) {
				record()
			} else {
				playAudio(currentParagraph.info.sentenceUrl)
			}
		}
	}

	// 录音
	const recorderManager = uni.getRecorderManager()
	
	// 对话模式判断中断定时器
	const dialogRecordTimer = ref(0)
	const usefulFrameIndex= ref(0)
	recorderManager.onFrameRecorded((frame) => {
		
		const { frameBuffer } = frame;
		  const audioData = new Int16Array(frameBuffer);
		
		  let sumSquares = 0;
		  for (let i = 0; i < audioData.length; i++) {
			sumSquares += audioData[i] ** 2;
		  }
		
		  const rms = Math.sqrt(sumSquares / audioData.length);
		  const volumeDb = 20 * Math.log10(rms / 1) - 30; // 将RMS转换为分贝
			console.log('volumeDb', volumeDb)
		  // 判断为没有声音输入
		  if (volumeDb < 30 && usefulFrameIndex.value > 5) {
			  if (!dialogRecordTimer.value) {
				dialogRecordTimer.value = setTimeout(() => {
					console.log('断句,开始上传语音')
					// stopDialogRecord()
					stopRecord()
				}, 2500)
			  }
		  } else {
			  usefulFrameIndex.value++
			  dialogRecordTimer.value && clearTimeout(dialogRecordTimer.value)
			  dialogRecordTimer.value = 0
		  }
		
	})
	
	recorderManager.onStop((filePath) => {
		console.log('filePath', filePath)
		console.log('interruptRecording', interruptRecording.value)
		if (pageIsClose.value) {
			console.log('页面已经推出，停止录音')
			return
		}
		if (interruptRecording.value) {
			console.log('[中断录音上传]')
			interruptRecording.value = false
			return
		}
		// 上传录音
		const miniProgram = uni.getAccountInfoSync().miniProgram
		console.log('====envVersion====', miniProgram.envVersion, uni.getAccountInfoSync())
		const envPrefix = miniProgram.envVersion === 'release' ? 'v1' : 'v2'
		// const envPrefix = 'v1'
		uni.uploadFile({
			url: `https://api.itso123.com/${envPrefix}/dialog/speak/analyse/${lessonInfo.lessonId}/${currentParagraph.id}`,
			filePath: filePath.tempFilePath,
			name: lessonMode.value ? 'pcmfile' : 'recfile',
			cid: currentParagraph.id,
			header: {
				authorization: uni.getStorageSync('authorization')
			},
			success: (res) => {
				// setTimeout(() => {}, 2000)
				console.log('录音上传成功', res, pageIsClose.value)
				if (pageIsClose.value) return
				if (res.statusCode === 200) {
					const data = res.data && JSON.parse(res.data)
					// isRecording.value = false
					interruptRecording.value = false
					const sectionIndex = sectionInfo.findIndex(section => section.id === data.contextId)
					console.log('句子上下文 序号 sectionIndex', sectionIndex)
					if (sectionIndex > -1) {
						sectionInfo[sectionIndex].result = data
						sectionInfo[sectionIndex].score = data.emo
						sectionInfo[sectionIndex].recUrl = data.recUrl
						sectionInfo[sectionIndex].tipShow = true
					}
					if (lessonMode.value && data.emo > 20) {
						changeToNextParagraph()
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
		playPromptAudio('endPrompt')
		isRecording.value = false
	})
	const record = () => {
		stopSelfAudioContext()
		stopAudio()
		isRecording.value = true
		// 【bugfix】点击录音后直接录制，播放提示音会导致开头1s多录不到
		// playPromptAudio('startPrompt')
		recorderManager.start({
			format: lessonMode.value ? "pcm" : "wav",
			sampleRate: 8000,
			frameSize: 10
		})
	}

	const stopRecord = () => {
		// if (isRecording.value) {
		// 	recorderManager.stop()
		// 	playPromptAudio('endPrompt')
		// 	isRecording.value = false
		// }
		recorderManager.stop()
		playPromptAudio('endPrompt')
		isRecording.value = false
		// interruptRecording.value = false
		// isRecording.value = false
	}
	
	/**
	 * 对话模式录音
	 */
	// const dialogRecordManager = uni.getRecorderManager()
	
	// // 对话模式判断中断定时器
	// const dialogRecordTimer = ref(0)
	// const usefulFrameIndex= ref(0)
	// dialogRecordManager.onFrameRecorded((frame) => {
		
	// 	const { frameBuffer } = frame;
	// 	  const audioData = new Int16Array(frameBuffer);
		
	// 	  let sumSquares = 0;
	// 	  for (let i = 0; i < audioData.length; i++) {
	// 		sumSquares += audioData[i] ** 2;
	// 	  }
		
	// 	  const rms = Math.sqrt(sumSquares / audioData.length);
	// 	  const volumeDb = 20 * Math.log10(rms / 1) - 30; // 将RMS转换为分贝
	// 		console.log('volumeDb', volumeDb)
	// 	  // 判断为没有声音输入
	// 	  if (volumeDb < 20 && usefulFrameIndex.value > 20) {
	// 		  if (!dialogRecordTimer.value) {
	// 			dialogRecordTimer.value = setTimeout(() => {
	// 				console.log('断句,开始上传语音')
	// 				stopDialogRecord()
	// 			}, 1000)
	// 		  }
	// 	  } else {
	// 		  usefulFrameIndex.value++
	// 		  dialogRecordTimer.value && clearTimeout(dialogRecordTimer.value)
	// 		  dialogRecordTimer.value = 0
	// 	  }
		
	// })
	// dialogRecordManager.onStop((filePath) => {
	// 	console.log('dialogRecorderManager filePath', filePath)
	// 	console.log('dialogRecorderManager interruptRecording', interruptRecording.value)
	// 	if (interruptRecording.value) {
	// 		console.log('[中断录音上传]')
	// 		interruptRecording.value = false
	// 		return
	// 	}
	// 	// 上传录音
	// 	const miniProgram = uni.getAccountInfoSync().miniProgram
	// 	console.log('====envVersion====', miniProgram.envVersion, uni.getAccountInfoSync())
	// 	const envPrefix = miniProgram.envVersion === 'release' ? 'v1' : 'v2'
	// 	uni.uploadFile({
	// 		url: `https://api.itso123.com/${envPrefix}/dialog/speak/analyse/${lessonInfo.lessonId}/${currentParagraph.id}`,
	// 		filePath: filePath.tempFilePath,
	// 		name: 'pcmfile',
	// 		cid: currentParagraph.id,
	// 		header: {
	// 			authorization: uni.getStorageSync('authorization')
	// 		},
	// 		success: (res) => {
	// 			// setTimeout(() => {}, 2000)
	// 			console.log('录音上传成功', res)
	// 			if (res.statusCode === 200) {
	// 				const data = res.data && JSON.parse(res.data)
	// 				// isRecording.value = false
	// 				interruptRecording.value = false
	// 				const sectionIndex = sectionInfo.findIndex(section => section.id === data.contextId)
	// 				console.log('句子上下文 序号 sectionIndex', sectionIndex)
	// 				if (sectionIndex > -1) {
	// 					sectionInfo[sectionIndex].result = data
	// 					sectionInfo[sectionIndex].score = data.emo
	// 					sectionInfo[sectionIndex].recUrl = data.recUrl
	// 					sectionInfo[sectionIndex].tipShow = true
	// 				}
	// 				if (data.emo > 20) {
	// 					changeToNextParagraph()
	// 				}
	// 				// sectionInfo[currentParagraph.index]['result'] = data
	// 				// sectionInfo[currentParagraph.index]['tipShow'] = true
	// 				reportBtnVisible.value = data.displayGetReport
	// 			}
	// 			console.log('sectionInfo', currentParagraph.index, sectionInfo)
	// 		},
	// 		fail: (err) => {
	// 			console.log('录音上传失败', err)
	// 		}
	// 	})
	// })
	// dialogRecordManager.onError((err) => {
	// 	console.log('record error', err)
	// 	playPromptAudio('endPrompt')
	// 	isRecording.value = false
	// })
	// const dialogRecord = () => {
	// 	stopSelfAudioContext()
	// 	stopAudio()
	// 	isRecording.value = true
	// 	dialogRecordTimer.value = 0
	// 	// 【bugfix】点击录音后直接录制，播放提示音会导致开头1s多录不到
	// 	// playPromptAudio('startPrompt')
	// 	dialogRecordManager.start({
	// 		format: "pcm",
	// 		sampleRate: 8000,
	// 		frameSize: 10
	// 	})
	// }
	
	// const stopDialogRecord = () => {
	// 	// if (isRecording.value) {
	// 	// 	recorderManager.stop()
	// 	// 	playPromptAudio('endPrompt')
	// 	// 	isRecording.value = false
	// 	// }
	// 	dialogRecordManager.stop()
	// 	playPromptAudio('endPrompt')
	// 	isRecording.value = false
	// 	// interruptRecording.value = false
	// 	// isRecording.value = false
	// }
	
	/**
	 * 播放叮的一声
	 */
	const promptAudioContext = uni.createInnerAudioContext();
	const promptType = ref('')
	
	const playPromptAudio = (type) => {
		promptAudioContext.stop()
		promptAudioContext.src = "http://api.itso123.com/image/prompt.mp3";
		promptAudioContext.play()
		promptType.value = type
		console.log('playPromptAudio', type, type === 'startRecord')
	}
	
	promptAudioContext.onEnded(() => {
		console.log('promptAudioContext isRecording.value', isRecording.value)
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
		stopAudio()
		selfAudioContext.src = result.recUrl;
		selfAudioContext.play()
	}
	/**
	 * 停止播放自己的录音
	 */
	const stopSelfAudioContext = () => {
		selfAudioContext.stop()
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
		// 对话模式
		if (lessonMode.value) {
			changeToNextParagraph()
		}
	})
	innerAudioContext.onStop(() => {
		audioPlaying.value = false
	})
	const audioPlaying = ref(false)
	const playAudio = (url) => {
		stopSelfAudioContext()
		innerAudioContext.stop()
		innerAudioContext.src = url;
		/**
		 * [bugfix] 偶现音频无法播放，改为在oncanplay回调中播放
		 */
		innerAudioContext.onCanplay(() => {
			console.log('audio can play')
			innerAudioContext.play()
		})
	}

	const stopAudio = () => {
		innerAudioContext.stop()
	}
	
	// 课程模式切换
	const lessonModeChange = (e) => {
		console.log('lessonModeChange', e)
		const switchFlag = e.detail.value
		const mode = switchFlag ? 1 : 0
		setLessonMode(lessonInfo.lessonId, mode).then((res) => {
			console.log('setLessonMode', res)
			lessonMode.value = switchFlag
			if (lessonMode.value && res.displaySeller !== 0) {
				vipPopVisible.value = true
			} else {
				vipPopVisible.value = false
			}
			// 每次切换后都结束当前录制
			stopRecord()
		})
	} 
	
	// 付费弹框关闭
	const vipPopClose = () => {
		uni.navigateBack()
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
	.lesson-container {
		.header {
			height: 150rpx;
			background: #fff;
			position: relative;
			z-index: 1000;
			border-bottom: 1px solid #eeeeee;
			box-sizing: border-box;
		}
	}
	.lesson {
		height: calc(100vh - 150rpx);
		box-sizing: border-box;
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
	
	.ft26 {
		font-size: 26rpx;
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