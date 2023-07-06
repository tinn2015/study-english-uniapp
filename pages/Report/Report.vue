<template>
	<view class="report">
		<view class="nav">
			<Navigator></Navigator>
		</view>
		<view class="scroll-box">
			<view class="part-1">
				<view class="flex fd-c jc-c ai-c">
					<view class="text-box">
						<view class="text-1">恭喜你已完成本课学习</view>
					</view>
					<view class="chart-box">
						<qiun-data-charts
						      type="radar"
						      :opts="chartOptions"
						      :chartData="radarData"
						    />
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="flex jc-sb ai-c">
					<view class="tip-label">{{ranking.label}}</view>
					<view class="tip flex jc-c ai-c">{{ranking.result}}</view>
				</view>
				<!-- <view class="plan flex ai-c">
					<view class="label">还需要加油哦！查看建议学习方案</view>
					<uni-icons class="icon" type="forward" size="18" color="#999A9F"></uni-icons>
				</view> -->
			</view>
			<view class="part-2">
				<view class="title">薄弱点分析</view>
				<view class="box">
					<view class="example-text">{{phoneticSymbolProblem.data.text}}</view>
					<view class="item item-box mt62">
						<view class="tag flex jc-c ai-c">发音问题</view>
						<view class="problem-mark">{{phoneticSymbolProblem.data.pronunciDesc}}</view>
						<view class="more">你的音标还有这些问题</view>
					</view>
					<view class="sentence-problems-box item-box mt62" v-for="item in sentenceProblems">
						<view class="tag flex jc-c ai-c">单词问题</view>
						<view class="sentence-item flex fw-w ai-c">
							<text class="mark">{{item.desc}}</text>
							<image @click="playAudio(item.audioUrl)" class="horn" src="https://api.itso123.com/image/horn-green.png" mode=""></image>
						</view>
					</view>
					<view class="handle flex jc-sb ai-c">
						<view class="score-box flex ai-c">
							<image class="score-icon" src="https://api.itso123.com/image/report-good-emoji.png" mode=""></image>
							<view class="score">{{phoneticSymbolProblem.data.score}}分</view>
						</view>
						<view class="btn flex jc-c ai-c" @click="studyAgain">再练一次</view>
					</view>
				</view>
			</view>
			<view class="feedback-box">
				<view class="feedback-title">评价反馈</view>
				<view class="feedback-options flex jc-ad ai-c">
					<view class="feedback-option flex fd-c ai-c jc-c" @click="feedback('C')">
						<image class="feedback-option-icon" src="https://api.itso123.com/image/report-bad-emoji.png" mode=""></image>
						<view class="feedback-option-label">几乎没作用</view>
					</view>
					<view class="feedback-option flex fd-c ai-c jc-c" @click="feedback('B')">
						<image class="feedback-option-icon" src="https://api.itso123.com/image/report-normal-emoji.png" mode=""></image>
						<view class="feedback-option-label">有一点作用</view>
					</view>
					<view class="feedback-option flex fd-c ai-c jc-c" @click="feedback('A')">
						<image class="feedback-option-icon" src="https://api.itso123.com/image/report-good-emoji.png" mode=""></image>
						<view class="feedback-option-label">非常好用</view>
					</view>
				</view>
			</view>
			<view class="handles flex jc-sb ai-c">
				<view class="btn-left btn flex jc-c ai-c" @click="studyAgain">重新练习</view>
				<view class="btn-right btn flex jc-c ai-c" @click="studyNext">学习下一节</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onBeforeMount, reactive, ref, nextTick} from 'vue'
	import { getReportOverAll, studyFeedback } from '@/utils/request.js'
	import { useLessonStore } from '@/stores/lessons.js'
	import Navigator from '@/components/Navigator/Navigator.vue'
	
	const lessonStore = useLessonStore()

	const ranking = reactive({
		label: '',
		result: ''
	})
	// 图标样式
	const chartOptions = reactive({
		color: ["#1CA73A", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
			"#ea7ccc"
		],
		fontColor: "#ffffff",
		// padding: [5,5,5,5],
		dataLabel: false,
		enableScroll: false,
		legend: {
			show: false,
			position: "right",
			lineHeight: 25
		},
		extra: {
			radar: {
				gridType: "circle", // circle radar
				gridColor: "#bcf0ff",
				gridCount: 4,
				opacity: 0.5,
				max: 100,
				labelShow: true,
				border: true
			}
		},
	})
	const radarData = reactive({
		"categories": [],
		"series": [{
			// "name": "成交量1",
			"data": []
		}]
	})
	
	const sentenceProblems = reactive([])
	const phoneticSymbolProblem = reactive({
		data: {}
	})
	
	// 单词播放
	const innerAudioContext = uni.createInnerAudioContext();

	const playAudio = (url) => {
		innerAudioContext.stop()
		innerAudioContext.src = url;
		innerAudioContext.play()
	}
	
	const stopAudio = () => {
		innerAudioContext.stop()
	}
	let reportId = 0
	const categories = []
	const seriesData = []
	onBeforeMount(() => {
		const { lessonId } = lessonStore.lessonInfo
		const { id: sectionId } = lessonStore.currentSection
		getReportOverAll({lessonId, sectionId}).then((res) => {
			console.log('getReportOverAll', res)
			const { Ranking, skill, words, report, reportId:rid } = res
			/* 雷达图 */
			
			skill.forEach(i => {
				categories.push(i.Name)
				seriesData.push(parseInt(i.Value))
			})
			radarData.categories = categories
			radarData.series[0].data = seriesData
			
			console.log('radarData', radarData)
			
			/* 排名 */
			ranking.label = Ranking.tips
			ranking.result = Ranking.tipsAction
			
			/* 句子问题 */
			words.forEach(i => {
				sentenceProblems.push(i)
			})
			
			/* 发音问题 */
			phoneticSymbolProblem.data = report
			
			reportId = rid
		})
	})
	// nextTick(() => {
	// 	radarData.categories = categories
	// 	radarData.series[0].data = seriesData
	// })
	
	const studyAgain = async () => {
		// console.log('currentSection', lessonStore.currentSection)
		// await lessonStore.getSectionInfo(lessonStore.currentSection)
		// console.log('sectionGotoStudy')
		uni.navigateTo({
			url: "/pages/Lesson/Lesson"
		})
	}
	
	const feedback = (label) => {
		const { lessonId } = lessonStore.lessonInfo
		const { id: sectionId } = lessonStore.currentSection
		console.log('')
		studyFeedback({
			label,
			reportId,
			lessonId,
			sectionId
		})
	}
	
	const studyNext = () => {
		const { nextSection,  currentSectionIndex} = lessonStore
		console.log('nextSection', nextSection)
		if (!nextSection) {
			uni.showToast({
				icon: 'none',
				title: '当前课程已学完'
			})
		} else {
			lessonStore.getSectionInfo(nextSection, currentSectionIndex)
			uni.navigateTo({
				url: "/pages/Lesson/Lesson"
			})
		}
	}
</script>

<style scoped lang="scss">
	.report {
		// position: relative;
		// padding-top: 120rpx;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
	}
	.scroll-box {
		// padding-top: 120rpx;
		height: calc(100% - 120rpx);
		overflow-y: auto;
		// background: #ffffff;
	}
	.nav {
		background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
		height: 120rpx
	}
	.part-1 {
		height: 500rpx;
		background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
		.text-box {
			padding-left: 32rpx
		}
		.text-1 {
			font-size: 48rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.text-2 {
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			margin-top: 8rpx;
		}
		.chart-box {
			// width: 360rpx;
			height: 360rpx;
		}
	}
	.panel {
		position: relative;
		top: -70rpx;
		padding: 32rpx 40rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(0,0,0,0.1);
		border-radius: 24rpx;
		margin: 0 32rpx;
		.tip-label {
			font-size: 36rpx;
			font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
			font-weight: 500;
			color: #202127;
		}
		.tip {
			background: rgba(88,200,152,0.3);
			box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(0,0,0,0.1);
			border-radius: 4rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #1DAD6F;
			padding: 4rpx 8rpx;
			margin-left: 24rpx;
		}
		.plan {
			margin-top: 24rpx;
			.label {
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #999A9F;
			}
		}
	}
	.part-2 {
		margin-top: -22rpx;
		padding: 0 32rpx;
		.title {
			font-size: 40rpx;
			font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
			font-weight: 500;
			color: #202127;
		}
		.box {
			margin-top: 16rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(0,0,0,0.1);
			border-radius: 24rpx;
			padding: 40rpx
		}
		.item-box {
			background: #F4F5F7;
			border-radius: 16rpx;
			padding: 58rpx 24rpx 24rpx;
			position: relative;
			.tag {
				background: #58C898;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				width: 144rpx;
				height: 56rpx;
				position: absolute;
				top: -14rpx;
			}
		}
		.example-text {
			font-size: 44rpx;
			font-family: Roboto-Medium, Roboto;
			font-weight: 500;
			color: #202127;
		}
		.problem-mark {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #202127;
		}
		.mark {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #202127;
		}
		.horn {
			width: 32rpx;
			height: 28rpx;
			margin-left: 16rpx;
		}
		.more {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #E85F1E;
			margin-top: 32rpx;
		}
		.handle {
			margin-top: 40rpx;
			height: 76rpx;
			.score-icon {
				width: 36rpx;
				height: 36rpx
			}
			.score {
				font-size: 32rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #202127;
				margin-left: 16rpx;
			}
			.btn {
				width: 192rpx;
				height: 76rpx;
				border-radius: 38rpx;
				background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	}
	.feedback-box {
		margin-top: 80rpx;
		.feedback-title {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
			font-weight: 500;
			color: #202127;
			text-align: center;
		}
		.feedback-options {
			margin-top: 32rpx;
		}
		.feedback-option-icon {
			width: 80rpx;
			height: 80rpx
		}
		.feedback-option-label {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #202127;
			margin-top: 16rpx;
		}
	}
	.handles {
		margin-top: 48rpx;
		padding: 14rpx 30rpx 84rpx;
		border-top: 1rpx solid #dcd9d9;
		.btn {
			width: 327rpx;
			height: 96rpx;
			border-radius: 60rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
		}
		.btn-left {
			background: #F4F5F7;
			color: #58C898;
		}
		.btn-right {
			background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
			color: #ffffff;
		}
	}
	.mt62 {
		margin-top: 62rpx;
	}
</style>