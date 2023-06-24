<template>
	<view class="report">
		<view class="part-1">
			<Navigator></Navigator>
			<view class="flex jc-sb ai-c">
				<view class="text-box">
					<view class="text-1">恭喜你</view>
					<view class="text-2">已完成本课学习</view>
				</view>
				<view class="chart-box">
					<qiun-data-charts type="radar" :opts="{legend:{position: 'bottom', show: false},extra:{tooltip: {showBox: false},radar:{gridType:'circle', gridColor: '#ffffff', opacity: 0.5, labelShow: true, labelColor: '#ffffff'}}}" :chartData="radarData"/>
				</view>
			</view>
		</view>
		<view class="panel">
			<view class="flex">
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
				<view class="item">
					<view class="">Are you Canadian?</view>
					<view></view>
				</view>
				<view class="sentence-problems-box">
					<view class="sentence-item" v-for="item in sentenceProblems">
						<view>
							{{item.Word}}
						</view>
						<view>{{item.desc}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onBeforeMount, reactive, ref} from 'vue'
	import { getReportOverAll } from '@/utils/request.js'
	import { useLessonStore } from '@/stores/lessons.js'
	import Navigator from '@/components/Navigator/Navigator.vue'
	
	const lessonStore = useLessonStore()

	const ranking = reactive({
		label: '',
		result: ''
	})
	
	const radarData = reactive({
		"categories": [],
		"series": [{
			// "name": "成交量1",
			"data": []
		}]
	})
	
	const sentenceProblems = reactive([])
	const phoneticSymbolProblem = reactive({})
	
	onBeforeMount(() => {
		const { lessonId } = lessonStore.lessonInfo
		const { id: sectionId } = lessonStore.currentSection
		getReportOverAll({lessonId, sectionId}).then((res) => {
			console.log('getReportOverAll', res)
			const { Ranking, skill, words } = res
			/* 雷达图 */
			// const categories = []
			// const data = []
			skill.forEach(i => {
				radarData.categories.push(i.Name)
				radarData.series[0].data.push(parseInt(i.Value))
			})
			console.log('radarData', radarData)
			
			/* 排名 */
			ranking.label = Ranking.tips
			ranking.result = Ranking.tipsAction
			
			/* 句子问题 */
			words.forEach(i => {
				sentenceProblems.push(i)
			})
		})
	})
	
	const ChartData =  reactive({
		"categories": ["维度1", "维度2", "维度3", "维度4"],
		"series": [{
			// "name": "成交量1",
			"data": [90, 110, 165, 195]
		}]
	})
</script>

<style scoped lang="scss">
	.report {
		// position: relative;
	}
	.part-1 {
		height: 500rpx;
		background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
		padding-top: 100rpx;
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
			width: 400rpx;
			height: 400rpx;
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
			padding: 2rpx 8rpx;
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
	}
</style>