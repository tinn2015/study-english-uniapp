<template>
	<view class="find">
		<view class="header">
			<Navigator></Navigator>
			<view class="box flex jc-sb">
				<image class="poster" :src="lessonStore.lessonInfo.img" mode=""></image>
				<view class="course-overview flex fd-c jc-sb">
					<view class="top">
						<view class="title">{{lessonStore.lessonInfo.title}}</view>
						<view class="desc">{{lessonStore.lessonInfo.descript}}</view>
					</view>
					<view class="bottom flex">
						<view>{{lessonStore.lessonInfo.level}}</view>
						<view class="line">|</view>
						<view>{{lessonStore.lessonInfo.read}}人已学</view>
					</view>
				</view>
			</view>
		</view>
		<view class="find-content">
			<view class="tip flex jc-sb ai-c" v-if="lessonStore.lessonInfo.advUrl">
				<image src="https://api.itso123.com/image/horn.png" class="horn" mode=""></image>
				<text class="tip-text">{{lessonStore.lessonInfo.advTitle}}</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			<view class="process-box">
				<view class="process-label">完成进度 {{lessonStore.lessonInfo.speed}}</view>
				<view @click="sectionGotoStudy(section)" v-for="section in lessonStore.lessonInfo.sections" class="flex jc-sb ai-c course-box">
					<image class="course-img" :src="section.img" mode=""></image>
					<view class="course-info">
						<view class="course-title">{{section.title}}</view>
						<view class="course-desc">{{section.descript}}</view>
					</view>
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
			<view class="handles flex jc-sb ai-c">
				<view class="flex fd-c ai-c" @click="removeCourse">
					<image class="add-icon" src="https://api.itso123.com/image/remove-course.png" mode=""></image>
					<text class='add-label'>移除课程</text>
				</view>
				<!-- <view class="flex fd-c ai-c" v-else @click="addCourse">
					<image class="add-icon" src="https://api.itso123.com/image/add-course.png" mode=""></image>
					<text class='add-label'>添加课程</text>
				</view> -->
				<view class="get-study flex jc-c ai-c" @click="routeToLesson">开始学习</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Navigator from '@/components/Navigator/Navigator.vue'
	import {useLessonStore} from '@/stores/lessons.js'
	import { removeFavoriteCourse, getSectionDetail } from "@/utils/request.js"
	export default {
		setup () {
			const lessonStore = useLessonStore()
			console.log('lessonStore', lessonStore)
			return {
				lessonStore
			}
		},
		data () {
			return {
				courses: [
					{
						img: '',
						title: '01.基本词汇',
						desc: 'Basic Words'
					},{
						img: '',
						title: '012.基本词汇',
						desc: 'Basic Words'
					},{
						img: '',
						title: '03.基本词汇',
						desc: 'Basic Words'
					},
				]
			}
		},
		components: {
			Navigator
		},
		methods: {
			routeToLesson () {
				uni.navigateTo({
					url:"/pages/Lesson/Lesson"
				})
			},
			/**
			 * 移除课程
			 */
			removeCourse () {
				const lessonId = lessonStore.lessonInfo.lessonId
				removeFavoriteCourse(id).then(res => {
					console.log('removeFavoriteCourse', res)
				})
			},
			
			/**
			 * 去学习页
			 */
			async sectionGotoStudy (section) {
				const lessonStore = useLessonStore()
				console.log(lessonStore)
				await lessonStore.getSectionInfo(section)
				uni.navigateTo({
					url: "/pages/Lesson/Lesson"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.find {
		height: 100vh;
		overflow: hidden;
	}
	.header {
		height: 514rpx;
		width: 100%;
		background: #abcbd9;
		box-sizing: border-box;
		overflow: hidden;
		.banner {
			width: 100%;
			height: 100%
		}
		.box {
			margin-top: 120rpx;
			box-sizing: border-box;
			padding: 0 32rpx;
			.course-overview {
				margin-left: 32rpx;
				.title {
					font-size: 32rpx;
					font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
					font-weight: 500;
				}
				.desc {
					font-size: 24rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
					margin-top: 8rpx;
				}
				.bottom {
					font-size: 24rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
				}
				.line {
					margin: 0 20rpx;
				}
			}
		}
		.poster {
			width: 200rpx;
			height: 266rpx;
			border-radius: 16rpx;
			border: 4rpx solid #FFFFFF;
		}
	}
	.find-content {
		position: relative;
		top: -54rpx;
		height: calc(100% - 514rpx + 54rpx);
		box-sizing: border-box;
		border-radius: 32rpx 32rpx 0 0;
		background: #ffffff;
		padding: 32rpx 0;
		.tip {
			height: 72rpx;
			background: #F4F5F7;
			border-radius: 16rpx;
			padding: 0 22rpx;
			margin: 0 32rpx;
			box-sizing: border-box;
		}
		.tip-text {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #202127;
		}
		.horn {
			width: 32rpx;
			height: 32rpx
		}
		.process-box {
			margin: 32rpx 32rpx 0;
			padding-right: 32rpx;
			height: calc(100% - 260rpx);
			overflow-y: scroll;
			.process-label {
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #696B6C;
			}
			.course-box {
				margin-top: 48rpx;
			}
			.course-info {
				width: 100%;
				margin-left: 24rpx;
			}
			.course-title {
				font-size: 32rpx;
				font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
				font-weight: 500;
				color: #202127;
			}
			.course-desc {
				font-size: 28rpx;
				font-family: Roboto-Regular, Roboto;
				font-weight: 400;
				color: #999A9F;
			}
			.course-img {
				width: 80rpx;
				min-width: 80rpx;
				height: 80rpx;
				background: #58C898;
				border-radius: 50%;
			}
		}
		.handles {
			box-sizing: border-box;
			border-top: 1px solid #BDBDBD;
			// position: relative;
			// z-index: 100;
			// bottom: 84rpx;
			height: 196rpx;
			left: 0;
			padding: 16rpx 24rpx;
			// padding-top: 16rpx;
			.add-label {
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #202127;
			}
			.add-icon {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}
			.get-study {
				background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
				border-radius: 60rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				width: 574rpx;
				height: 96rpx;
				margin-left: 24rpx;
			}
		}
	}
</style>