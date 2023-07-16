<template>
	<view class="box">
		<view v-for="course in courses" class="flex course-item" @click="routeToCourse(course.lessonId)">
			<image class="poster" :src="course.img" mode=""></image>
			<view class="right-content flex fd-c jc-sb">
				<view>
					<view class="course-title">{{course.title}}</view>
					<view class="course-process flex ai-c">
						<view class="process">
							<progress :percent="course.percent" stroke-width="3" />
						</view>
						<view class="process-label">已完成<text>{{`${course.percent}`}}%</text></view>
					</view>
				</view>
				<view class="course-views">{{course.read}}已学习</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getFavorite } from '@/utils/request.js';
	import { useLessonStore } from '@/stores/lessons.js';
	export default {
		data () {
			return {
				courses: []
			}
		},
		beforeMount() {
			// 获取轻松学
			getFavorite().then((res) => {
				this.courses = res.lessons
				console.log('favorites', this.courses)
			})
		},
		methods: {
			routeToCourse(id) {
				uni.navigateTo({
					url: '/pages/Course/Course'
				});
				const lessonStore = useLessonStore()
				lessonStore.getFavoriteLesson(id)
			},
		}
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 0 32rpx;
		height: 100%;
		overflow-y: auto;
	}
	.course-item {
		margin-top: 32rpx;
	}
	.right-content {
		margin-left: 32rpx;
	}
	.poster {
		width: 180rpx;
		height: 236rpx;
		background: #eeeeee;
		border-radius: 12rpx;
	}
	.course-title {
		font-size: 32rpx;
		font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
		font-weight: 500;
		color: #202127;
	}
	.course-process {
		margin-top: 20rpx;
		.process {
			width: 180rpx;
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
</style>