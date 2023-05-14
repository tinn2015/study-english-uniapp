<template>
	<view class="lesson">
		<view v-for="paragraph in sectionInfo">
			<view class="paragraph-active flex fd-c jc-sb ai-c" v-if="(paragraph.id === currentLesson.id)">
				<view class="sentence">{{paragraph.sentence}}</view>
				<view class="translation">{{paragraph.translation}}</view>
				<view class="handles flex jc-c ai-c">
					<view v-if="isRecording" @click="stopRecord">
						正在录音中。。。
					</view>
					<view v-else class="flex jc-c ai-c">
						<view class="btn">
							<image class="icon-mini" src="http://api.itso123.com/image/play.png" mode=""></image>
							
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
	const isRecording = ref(false)
	
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
	.part-1 {
		height: 322rpx;
		background: #F2F2F2;
	}
	.part-2 {
	}
	.part-3 {
		padding: 0 32rpx;
		margin-top: 60rpx;
		.btn {
			background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
			border-radius: 60rpx;
			height: 96rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
	}
</style>