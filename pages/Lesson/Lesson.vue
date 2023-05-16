<template>
	<view class="lesson">
		<view v-for="paragraph in sectionInfo">
			<view class="paragraph-active flex fd-c jc-sb ai-c" v-if="(paragraph.id === currentLesson.id)">
				<view class="sentence">{{paragraph.sentence}}</view>
				<view class="translation">{{paragraph.translation}}</view>
				<view class="handles flex jc-c ai-c">
					<view v-if="isRecording" @click="stopRecord" class="wave-box flex fd-c ai-c">
						<!-- 正在录音中。。。 -->
						<view class="wave-label">点击结束录音</view>
						<view class="wave"></view>
					</view>
					<view v-else class="flex jc-c ai-c">
						<view class="btn">
							<image @click="stopAudio()" v-if="audioPlaying" class="icon-mini" src="http://api.itso123.com/image/audio-stop.png" mode=""></image>
							<image @click="playAudio(paragraph.sentenceUrl)" v-else class="icon-mini" src="http://api.itso123.com/image/play.png" mode=""></image>
						</view>
						<view class="btn btn-mid" @click="record">
							<image class="icon" src="http://api.itso123.com/image/microphone.png" mode=""></image>
						</view>
						<view class="btn">
							<image class="icon-mini" src="http://api.itso123.com/image/speaker.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="paragraph flex fd-c jc-sb ai-c" v-else @click="changeParagraph(paragraph)">
				<view>{{paragraph.sentence}}</view>
				<view>{{paragraph.translation}}</view>
			</view>
		</view>
		<!-- <view class="part-1 flex jc-c ai-c">
			<view>Excuse me,are you Am</view>
		</view>
		<view class="part-2">
			<view class="flex jc-c ai-c">Are you Canadian?</view>
		</view> -->
		<!-- <view class="part-3">
			<view class="btn flex jc-c ai-c" @click="routeToReport">完成并获取报告</view>
		</view> -->
	</view>
</template>

<script setup>
	import {reactive, onBeforeMount, ref} from 'vue'
	import { onReady } from '@dcloudio/uni-app'
	import {useLessonStore} from '@/stores/lessons.js'
	const routeToReport =  () => {
		console.log(1111)
		uni.navigateTo({
			url: "/pages/Report/Report"
		})
	}
	const currentLesson = reactive({
		id: 0,
		info: {}
	})
	const isRecording = ref(true)
	
	const lessonStore = useLessonStore()
	const { sectionInfo, currentSection } = lessonStore
	console.log('sectionInfo', sectionInfo)
	onBeforeMount(() => {
		currentLesson.id = sectionInfo[0].id
		currentLesson.info = sectionInfo[0]
		console.log('currentLesson', currentLesson, sectionInfo)
	})
	
	// 切换段落
	const changeParagraph = (paragraph) => {
		currentLesson.id = paragraph.id
		currentLesson.info = paragraph
	}
	
	// 录音
	const recorderManager = uni.getRecorderManager()
	recorderManager.onStop((filePath) => {
		console.log('filePath', filePath)
		// 上传录音
		uni.uploadFile({
			url: `https://api.itso123.com/v1/dialog/speak/analyse/${currentLesson.id}`,
			filePath: filePath.tempFilePath,
			name: 'recfile',
			cid: currentSection.id,
			header: {
				authorization: uni.getStorageSync('authorization')
			},
			success: (res) => {
				console.log('录音上传成功', res)
				isRecording.value = false
			},
			fail: (err) => {
				console.log('录音上传失败', err)
			}
		})
	})
	recorderManager.onError((err) => {
		console.log('record error', err)
	})
	const record = () => {
		recorderManager.start({
			format: "wav",
			sampleRate: 8000
		})
		isRecording.value = true
	}
	
	const stopRecord = () => {
		recorderManager.stop()
		isRecording.value = false
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
</script>

<style scoped lang="scss">
	.paragraph {
		background: #F2F2F2;
		height: 160rpx;
		padding: 32rpx;
		border-top: 1px solid #dddddd
	}
	.paragraph-active {
		padding: 32rpx;
		.handles {
			height: 150rpx;
			width: 100%;
			margin-top: 88rpx;
			.icon-mini {
				width: 96rpx;
				height: 96rpx
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
	.wave-box {
		width: 100%;
		height: 100%;
		.wave-label {
			color: #8d8d8d;
			margin-bottom: 20rpx;
		}
	}
	.wave {
	  position: relative;
	  width: 50%;
	  height: 8rpx;
	  border-radius: 4rpx;
	  animation: wave .5s infinite linear alternate;
	  background: rgb(7,59,99);
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