<template>
	<view class="report">
		<view class="part-1">
			<Navigator></Navigator>
			<view>{{result}}</view>
			<view>{{text}}</view>
		</view>
		<view class="panel">
			<view class="flex">
				<view class="tip-label">仅超过了10%的用户</view>
				<view class="tip">有待提高</view>
			</view>
			<view class="plan flex ai-c">
				<view class="label">还需要加油哦！查看建议学习方案</view>
				<uni-icons class="icon" type="forward" size="18" color="#999A9F"></uni-icons>
			</view>
		</view>
		<view class="part-2">
			<view class="title">薄弱点分析</view>
			<view class="box">
				<view class="item">
					<view class="">Are you Canadian?</view>
					<view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onBeforeMount, ref} from 'vue'
	import { getReportOverAll } from '@/utils/request.js'
	import { useLessonStore } from '@/stores/lessons.js'
	import Navigator from '@/components/Navigator/Navigator.vue'
	
	const lessonStore = useLessonStore()
	
	const result = ref('')
	const text = ref('')
	
	onBeforeMount(() => {
		const { lessonId } = lessonStore.lessonInfo
		const { id: sectionId } = lessonStore.currentSection
		getReportOverAll({lessonId, sectionId}).then((res) => {
			console.log('getReportOverAll', res)
			result.value = res.evaluate
			text.value = res.text
		})
	})
</script>

<style scoped lang="scss">
	.report {
		// position: relative;
	}
	.part-1 {
		height: 618rpx;
		background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
		padding-top: 140rpx;
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