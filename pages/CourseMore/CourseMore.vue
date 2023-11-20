<template>
	<view class="box">
		<view v-for="course in courses" class="flex course-item" @click="routeToCourse(course)">
			<!-- <image class="poster" :src="course.img" mode=""></image> -->
			<view class="poster-box">
				<image class="poster" :src="course.img" mode=""></image>
				<!-- <image v-show="item.mode === 2" class="vip" src="../../../static/images/vip.png" mode=""></image> -->
				<div class="vip-tag flex jc-c ai-c c-fff" v-show="course.mode === 2">VIP</div>
			</view>
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
	import { shareMenu } from '@/utils/share.js'
	export default {
		onShareAppMessage(res) {
			return {
			  title: '我的AI外教1对1，就在“开口说”',
			  path: 'pages/tabBar/home/Home',
			  imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		  },
		onShareTimeline () {
			return {
			  title: '我的AI外教1对1，就在“开口说”',
			  path: 'pages/tabBar/home/Home',
			  imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		},
		data () {
			return {
				courses: []
			}
		},
		beforeMount() {
			shareMenu()
			// 获取轻松学
			getFavorite().then((res) => {
				this.courses = res.lessons
				console.log('favorites', this.courses)
			})
		},
		methods: {
			routeToCourse(course) {
				const lessonStore = useLessonStore()
				lessonStore.getFavoriteLesson(course.lessonId)
				if (course.mode === 2) {
					uni.navigateTo({
						url: '/pages/chatCourse/chatCourse'
					});
				} else {
					uni.navigateTo({
						url: '/pages/Course/Course'
					});
				}
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
	.poster-box {
		position: relative;
	}
	.poster {
		width: 207rpx;
		height: 276rpx;
		background: #f4f5f7;
		border-radius: 16rpx;
		box-sizing: border-box;
		.add-course-label {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #999a9f;
			margin-top: 24rpx;
		}
	}
	.vip {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		top: -30rpx;
		left: -20rpx;
		transform: rotate(-30deg);
	}
	.vip-tag {
		width: 54rpx;
		height: 30rpx;
		background: #FC0606;
		border-radius: 16rpx 0rpx 16rpx 0rpx;
		position: absolute;
		top: 0;
		left: 0;
		color: #ffffff;
		font-size: 20rpx;
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