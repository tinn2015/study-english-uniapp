<template>
	<view class="find">
		<view class="header">
			<image class="banner" mode="aspectFit" src="https://api.itso123.com/image/find-bg.png"></image>
		</view>
		<view class="find-content flex">
			<view class="left">
				<view class="nav-item flex jc-c ai-c" @click="navTap(nav)" :class="currentNav === nav.id ? 'nav-active' : ''" v-for="nav in navLists">{{nav.label}}</view>
			</view>
			<view class="right">
				<view class="filter-box flex jc-c ai-c">全部难度</view>
				<view class="course-box">
					<view v-for="course in courses" class="course-item flex ai-c" @click="getCourseDetail(course)">
						<image :src="course.poster" class="poster" mode="aspectFit"></image>
						<view class="right-content">
							<view class="title">{{course.title}}</view>
							<view class="sub-title">{{course.subTitle}}</view>
							<view class="info">{{course.views}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				navLists: [
					{
						label: '为你推荐',
						id: 1
					},{
						label: '每日一词',
						id: 2
					},{
						label: '日常必备',
						id: 3
					},{
						label: '玩转职场',
						id: 4
					},{
						label: '旅游出行',
						id: 5
					},{
						label: '亲子英语',
						id: 6
					},
				],
				currentNav: 1,
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
		methods: {
			navTap (nav){
				this.currentNav = nav.id
			},
			getCourseDetail (course) {
				console.log('course', course)
				uni.navigateTo({
					url: '/pages/Course/Course?courseId=1'
				})
			}
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