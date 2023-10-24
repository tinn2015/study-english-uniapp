<template>
	<view class="find">
		<view class="header">
			<!-- <Navigator></Navigator> -->
			<image class="banner" mode="aspectFit" src="https://api.itso123.com/image/find-bg.png"></image>
		</view>
		<view class="find-content flex">
			<scroll-view class="left" scroll-y="true" :enhanced="true" 	:show-scrollbar="false">
				<view class="nav-item flex jc-c ai-c" @click="navTap(nav)" :class="currentNav === nav ? 'nav-active' : ''" v-for="nav in navLists">{{nav}}</view>
			</scroll-view>
			<!-- <view class="left">
				<view class="nav-item flex jc-c ai-c" @click="navTap(nav)" :class="currentNav === nav ? 'nav-active' : ''" v-for="nav in navLists">{{nav}}</view>
			</view> -->
			<view class="right">
				<view class="filter-box flex jc-c ai-c">
					<view style="width: 220rpx;">
						<uni-data-select
						  v-model="levelValue"
						  :localdata="levels"
						  :clear="false"
						  @change="levelChange"
						  size="small"
						  style="width: 120rpx"
						  placeholder="全部"
						></uni-data-select>
					</view>
				</view>
				<view class="course-box">
					<view v-for="course in currentCourse" class="course-item flex ai-c" @click="getCourseDetail(course)">
						<view class="poster-box p-r">
							<image :src="course.img" class="poster" mode="scaleToFill"></image>
							<image v-show="course.mode === 2" class="vip p-a" src="../../../static/images/vip.png" mode=""></image>
						</view>
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
	import { useLessonStore } from '@/stores/lessons.js'
	import { shareMenu } from '@/utils/share.js'
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '一对一口语练习，就在“开口说”',
			  path: 'pages/tabBar/find/Find',
			  imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		  },
		data () {
			return {
				navLists: [],
				currentNav: '',
				levels: [
					{
						value: 1,
						text: '全部'
					},
					{
						value: 2,
						text: '零基础'
					},
					{
						value: 3,
						text: '初级'
					},
					{
						value: 4,
						text: '中级'
					},
					{
						value: 5,
						text: '高级'
					},
				],
				levelValue: 1,
				currentCourse: [],
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
			shareMenu()
			const {classList} = await getFindClass()
			if (classList) {
				this.navLists = classList
				this.currentNav = classList[0]
				const {lessons} = await getFindLessons(this.currentNav)
				this.courses = lessons
				this.filterLevel(this.levelValue)
			}
		},
		methods: {
			async navTap (nav){
				const {lessons} = await getFindLessons(nav)
				this.currentNav = nav
				this.courses = lessons
				this.filterLevel(this.levelValue)
			},
			getCourseDetail (course) {
				console.log('course', course)
				const lessonStore = useLessonStore()
				lessonStore.getFavoriteLesson(course.lessonId)
				uni.navigateTo({
					url: '/pages/Course/Course?courseId=1'
				})
			},
			levelChange (val) {
				console.log('lelevelChange')
				this.filterLevel(val)
			},
			filterLevel (val) {
				const level = this.levels.find(item => item.value === val)
				console.log('filterLevel', level, this.courses)
				if (!this.courses) {
					this.currentCourse = []
					return
				}
				if (level && this.courses) {
					this.currentCourse = level.value === 1 ? this.courses : this.courses.filter((i) => i.level === level.text)
				}
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
			width: 200rpx;
			background: #F4F5F7;
			overflow: hidden;
			overflow-y: auto;
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
				// min-width: 220rpx;
				// width: 220rpx;
			}
			.course-item {
				padding: 0 40rpx;
			}
			.course-item:not(:first-child) {
				margin-top: 40rpx;
			}
			.course-box {
				overflow-y: auto;
				height: calc(100% - 108rpx);
			}
			.right-content {
				margin-left: 40rpx;
				.title {
					font-size: 30rpx;
					font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
					font-weight: 500;
					color: #202127;
				}
				.sub-title {
					font-size: 26rpx;
					font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
					font-weight: 500;
					color: #BDBDBD;
					margin-top: 8rpx;
				}
				.info {
					font-size: 26rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
					color: #BDBDBD;
					margin-top: 32rpx;
				}
			}
			.poster {
				width: 136rpx;
				height: 162rpx;
				background: #D8D8D8;
				border-radius: 12rpx;
			}
			.vip {
				width: 60rpx;
				height: 60rpx;
				top: -30rpx;
				left: -20rpx;
				transform: rotate(-30deg);
				z-index: 10000;
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