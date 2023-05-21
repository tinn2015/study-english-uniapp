<template>
	<view class="find">
		<view class="header">
			<!-- <Navigator></Navigator> -->
			<image class="banner" mode="aspectFit" src="https://api.itso123.com/image/find-bg.png"></image>
		</view>
		<view class="find-content flex">
			<view class="left">
				<view class="nav-item flex jc-c ai-c" @click="navTap(nav)" :class="currentNav === nav ? 'nav-active' : ''" v-for="nav in navLists">{{nav}}</view>
			</view>
			<view class="right">
				<view class="filter-box flex jc-c ai-c">全部难度</view>
				<view class="course-box">
					<view v-for="course in courses" class="course-item flex ai-c" @click="getCourseDetail(course)">
						<image :src="course.img" class="poster" mode="aspectFit"></image>
						<view class="right-content">
							<view class="title">{{course.title}}</view>
							<view class="sub-title">{{course.level}}</view>
							<view class="info">{{course.read}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getFindLessons, getFindClass } from '@/utils/request.js'
	import Navigator from '@/components/Navigator/Navigator.vue'
	export default {
		data () {
			return {
				navLists: [],
				currentNav: '',
				courses: [
					{
						title: '日常必备口语30句',
						subTitle: '学习目标： 生活中遇见',
						views: 1000,
						poster: ''
					},{
						title: '日常必备口语30句',
						subTitle: '学习目标： 生活中遇见',
						views: 1000,
						poster: ''
					},{
						title: '日常必备口语30句',
						subTitle: '学习目标： 生活中遇见',
						views: 1000,
						poster: ''
					},{
						title: '日常必备口语30句',
						subTitle: '学习目标： 生活中遇见',
						views: 1000,
						poster: ''
					},{
						title: '日常必备口语30句',
						subTitle: '学习目标： 生活中遇见',
						views: 1000,
						poster: ''
					},
				]
			}
		},
		async mounted () {
			const {classList} = await getFindClass()
			if (classList) {
				this.navLists = classList
				this.currentNav = classList[0]
				const {lessons} = await getFindLessons(this.currentNav)
				this.courses = lessons
			}
		},
		methods: {
			async navTap (nav){
				const {lessons} = await getFindLessons(nav)
				this.currentNav = nav
				this.courses = lessons
			},
			getCourseDetail (course) {
				console.log('course', course)
				uni.navigateTo({
					url: '/pages/Course/Course?courseId=1'
				})
			}
		},
		components: {
			Navigator
		}
	}
</script>

<style scoped lang="scss">
	.find {
		height: 100vh
	}
	.header {
		height: 360rpx;
		width: 100%;
		.banner {
			width: 100%;
			height: 100%
		}
	}
	.find-content {
		position: relative;
		top: -54rpx;
		height: calc(100% - 360rpx + 54rpx);
		box-sizing: border-box;
		border-radius: 32rpx 32rpx 0 0;
		background: #ffffff;
		.left {
			border-radius: 32rpx 0 0 0;
			width: 176rpx;
			background: #F4F5F7;
			overflow: hidden;
		}
		.right {
			width: 100%;
			background: red;
			border-radius: 0 32rpx 0 0;
			background: #ffffff;
			overflow-y: auto;
			.filter-box {
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
				font-weight: 500;
				color: #202127;
				height: 108rpx;
			}
			.course-item {
				padding: 0 32rpx;
				margin-top: 40rpx;
			}
			.course-box {
				overflow-y: auto;
				height: calc(100% - 108rpx);
			}
			.right-content {
				margin-left: 32rpx;
				.title {
					font-size: 28rpx;
					font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
					font-weight: 500;
					color: #202127;
				}
				.sub-title {
					font-size: 24rpx;
					font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
					font-weight: 500;
					color: #BDBDBD;
					margin-top: 8rpx;
				}
				.info {
					font-size: 24rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
					color: #BDBDBD;
					margin-top: 32rpx;
				}
			}
			.poster {
				width: 112rpx;
				height: 148rpx;
				background: #D8D8D8;
				border-radius: 12rpx;
			}
		}
		.nav-item {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #696B6C;
			height: 108rpx;
			overflow: hidden;
		}
		.nav-active {
			font-weight: bold;
			color: #202127;
			background: #ffffff;
		}
	}
</style>