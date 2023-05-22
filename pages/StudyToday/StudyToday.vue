<template>
	<view class="study-today">
		<view class="header">
			<Navigator></Navigator>
			<image class="banner" mode="scaleToFill" src="http://api.itso123.com/image/record-bg.png"></image>
		</view>
		<view class="find-content">
			<!-- <view class="record-info flex jc-sb ai-c">
				<view class="record-title-process">
					<view class="record-title">累计坚持学习</view>
					<view class="record-process">已完成 5课/4天</view>
				</view>
				<view class="tip">你已打败了90%的同学</view>
			</view> -->
			<view class="record-courses">
				<view v-for="course in lessons" class="flex course-item" @click="routeToCourse(course.lessonId)">
					<image class="poster" :src="course.img" mode=""></image>
					<view class="right-content flex fd-c jc-sb">
						<view>
							<view class="course-title">{{course.title}}</view>
							<view class="course-process flex ai-c">
								<view class="process">
									<progress :percent="course.precent" stroke-width="3" />
								</view>
								<view class="process-label">已完成<text>{{course.precent}}%</text></view>
							</view>
						</view>
						<view class="course-views">{{course.read}}已学习</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getTodayLessons } from "@/utils/request.js"
	import { useLessonStore } from '@/stores/lessons'
	export default {
		data () {
			return {
				lessons: []
			}
		},
		async mounted () {
			const {lessons} = await getTodayLessons()
			if (lessons) {
				console.log('lessons', lessons)
				this.lessons = lessons
			}
		},
		methods: {
			routeToCourse(id) {
				const lessonStore = useLessonStore()
				lessonStore.getFavoriteLesson(id)
				uni.navigateTo({
					url: '/pages/Course/Course'
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.study-today {
		height: 100vh
	}
	.header {
		height: 360rpx;
		width: 100%;
		background: #808080;
		.banner {
			width: 100%;
			height: 100%;
		}
	}
	.find-content {
		position: relative;
		top: -54rpx;
		height: calc(100% - 360rpx + 54rpx);
		box-sizing: border-box;
		border-radius: 32rpx 32rpx 0 0;
		background: #ffffff;
		padding: 32rpx;
		.record-title {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
			font-weight: 500;
			color: #202127;
		}
		.record-process {
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #696B6C;
		}
		.tip {
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #696B6C;
		}
		.course-item {
			margin-top: 32rpx;
		}
		.right-content {
			margin-left: 32rpx;
		}
		.poster {
			width: 152rpx;
			height: 200rpx;
			background: #eeeeee;
			border-radius: 12rpx;
		}
		.course-process {
			margin-top: 20rpx;
			.process {
				width: 160rpx;
			}
			.process-label {
				margin-left: 16rpx;
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #BDBDBD;
				text {	
					color: #58C898;
				}
			}
		}
		.course-views {
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #BDBDBD;
		}
	}
</style>