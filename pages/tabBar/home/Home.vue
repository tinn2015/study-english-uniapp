<template>
	<view class="home flex fd-c">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
			<view class="label" :style="{ top: menuButtonInfo.top + 'px' }">Hi，欢迎来到开口说练口语</view>
		</view>
		<view class="content flex fd-c">
			<view class="panel flex jc-sb ai-c">
				<view class="flex-1 flex fd-c ai-c">
					<view class="panel-title flex" @click="routerToRecord">
						<text>累计学习</text>
						<uni-icons type="forward" size="15" color="#999A9F"></uni-icons>
					</view>
					<view class="panel-info">{{historyStatistic}}</view>
				</view>
				<view class="line"></view>
				<view class="flex-1 flex fd-c ai-c">
					<view class="panel-title" @click="routerToToday">
						<text>今日学习</text>
						<uni-icons type="forward" size="15" color="#999A9F"></uni-icons>
					</view>
					<view class="panel-info">{{todayStatistic}}</view>
				</view>
			</view>
			<view class="part-1">
				<!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机号测试</button> -->
				<view class="title">热销</view>
				<swiper class="swiper" circular :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="item in hotBanners" @click="bannerTap(item)">
						<image class="swiper-item" :src="item.headPic" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="part-2">
				<view class="header flex jc-sb ai-c">
					<view class="title" @click="request1">轻松学</view>
					<view class="more flex jc-c ai-c" @click="routerToMore">
						更多
						<uni-icons type="forward" size="13" color="#999A9F"></uni-icons>
					</view>
				</view>
				<view class="courses flex fw-w">
					<view v-for="(item, index) in favorites" class="course-item" @click="routeToCourse(item.lessonId, item.mode)" :class="{mr0: (index + 1) % 3 === 0}">
						<view class="poster-box">
							<image class="poster" :src="item.img" mode=""></image>
							<!-- <image v-show="item.mode === 2" class="vip" src="../../../static/images/vip.png" mode=""></image> -->
							<div class="vip-tag flex jc-c ai-c c-fff" v-show="item.mode === 2">VIP</div>
						</view>
						<view class="course-title">{{ item.title }}</view>
						<view class="course-info flex jc-sb ai-c">
							<view class="course-info-text">{{ item.level }}</view>
							<view class="course-info-text">
								<image class="eye-icon" src="https://api.itso123.com/image/read-eye-icon.png" mode=""></image>
								<text>{{ item.read }}</text>
							</view>
						</view>
					</view>
					<view class="poster flex fd-c jc-c ai-c course-add" @click="routeToFind">
						<uni-icons type="plusempty"></uni-icons>
						<text class="add-course-label">添加课程</text>
					</view>
					<!-- <button class="poster flex fd-c jc-c ai-c course-add" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
						<uni-icons type="plusempty"></uni-icons>
						<text class="add-course-label">添加课程</text>
					</button> -->
				</view>
			</view>
		</view>
		<LoginPopup></LoginPopup>
		<!-- <GetUserProfilePopup></GetUserProfilePopup> -->
	</view>
</template>

<script>
import { onMounted, defineComponent, reactive, onBeforeMount, ref } from 'vue';
import { getFavorite, getHomeInfo, getPhoneCode } from '@/utils/request.js';
import Swiper from './Swiper/Swiper.vue';
import { onReady, onInit, onShow } from '@dcloudio/uni-app';
import { useLoginStore } from '@/stores/login';
import { useLessonStore } from '@/stores/lessons.js'
import { ToolTip } from '@/components/ToolTip/ToolTip.vue'
import { LoginPopup } from '@/components/LoginPopup/LoginPopup.vue'
import { shareMenu } from '@/utils/share.js'
// import GetUserProfilePopup from '@/components/GetUserProfilePopup/GetUserProfilePopup.vue'
export default defineComponent({
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
		  console.log(res.target)
		}
		return {
		  title: '一对一练口语，就在“开口说”',
		  path: 'pages/tabBar/home/Home',
		  imageUrl: 'https://api.itso123.com/image/share-poster.png'
		}
	  },
	onShareTimeline() {
		return {
			title: '一对一练口语，就在“开口说”'
		}
	},
	setup() {
		const favorites = reactive([])
		const historyStatistic = ref('')
		const todayStatistic = ref('')
		const hotBanners = reactive([])
		// 小程序胶囊位置
		const menuButtonInfo = reactive(uni.getMenuButtonBoundingClientRect());
		onReady(() => {
			shareMenu()
			console.log('ready', menuButtonInfo);
		});
		onInit(() => {
			console.log('init2');
		});
		const loginStore = useLoginStore();
		onShow(() => {
			console.log('home onshow')
			uni.showLoading({
				title: "加载中",
				icon: "none"
			})
			getHomeData()
		})
		
		onBeforeMount(async () => {
			// loginStore.getUserProfile()
			const loginFlag = await loginStore.login();
			if (!loginFlag) {	
				getHomeData()
			}
		})
		
		const getHomeData = () => {
			// 获取轻松学
			// getFavorite().then((res) => {
			// 	favorites.splice(0, favorites.length)
			// 	if (res.lessons > 8) {
			// 		favorites.push(...res.lessons)
			// 	} else {
			// 		favorites.push(...res.lessons.slice(0, 8))
			// 	}
			// 	console.log('favorites', favorites)
			// })
			// // 获取统计数据和banner图
			// getHomeInfo().then((res) =>{
			// 	console.log('getHomeInfo', res)
			// 	hotBanners.splice(0, hotBanners.length)
			// 	hotBanners.push(...res.hotBanners)
			// 	historyStatistic.value = res.historyStatistic
			// 	todayStatistic.value = res.todayStatistic
			// 	uni.hideLoading()
			// })
			Promise.all([getFavorite(), getHomeInfo()]).then((resultList) => {
				console.log('resultList', resultList)
				favorites.splice(0, favorites.length)
				if (resultList[0].lessons > 8) {
					favorites.push(...resultList[0].lessons)
				} else {
					favorites.push(...resultList[0].lessons.slice(0, 8))
				}
				
				hotBanners.splice(0, hotBanners.length)
				hotBanners.push(...resultList[1].hotBanners)
				historyStatistic.value = resultList[1].historyStatistic
				todayStatistic.value = resultList[1].todayStatistic
				uni.hideLoading()
			})
		}
		
		return {
			menuButtonInfo,
			favorites,
			loginStore,
			todayStatistic,
			historyStatistic,
			hotBanners
		};
	},
	data() {
		return {
			background: ['color1', 'color2', 'color3'],
			indicatorDots: false,
			autoplay: true,
			interval: 10000,
			duration: 500,
			favorites: [],
			courses: [
				{
					poster: '',
					title: '英语水平测试',
					tip: '零基础',
					viewNum: '1200'
				}
			]
		};
	},
	mounted() {
		console.log('mounted');
	},
	components: {
		Swiper,
		ToolTip,
		LoginPopup,
		// GetUserProfilePopup
	},
	onLoad() {
		console.log('load');
	},
	onInit() {
		console.log('init');
	},
	methods: {
		getPhoneNumber (e) {
			getPhoneCode(e.detail.code).then(res => {
				console.log(res)
			})
		},
		request1() {
			console.log('request');
			// uni.login({
			// 	success(res) {
			// 		console.log('login', res);
			// 	}
			// });
			// getLessons()
			// 	.then(res => {
			// 		console.log('success', res);
			// 	})
			// 	.catch(err => {
			// 		console.log('err', err);
			// 	});
			uni.navigateTo({
				url: '/pages/Chat/Chat'
			});
		},
		routeToCourse(lessonId, mode) {
			const lessonStore = useLessonStore()
			lessonStore.getFavoriteLesson(lessonId)
			if (mode === 2) {
				uni.navigateTo({
					url: '/pages/chatCourse/chatCourse'
				});
			} else {
				uni.navigateTo({
					url: '/pages/Course/Course'
				});
			}
		},
		routerToMore() {
			uni.navigateTo({
				url: '/pages/CourseMore/CourseMore'
			});
		},
		routerToRecord() {
			uni.navigateTo({
				url: '/pages/StudyRecord/StudyRecord'
			});
		},
		routerToToday() {
			uni.navigateTo({
				url: '/pages/StudyToday/StudyToday'
			});
		},
		routeToFind () {
			uni.switchTab({
				url: "/pages/tabBar/find/Find"
			})
		},
		bannerTap (item) {
			if (item.type && item.type === 'lesson') {
				this.routeToCourse(item.lessonId)
			} else {
				uni.navigateTo({
					url: `/pages/webview/webview?src=${item.advUrl}&title=${item.advTitle}`,
				})
			}
		}
	}
});
</script>

<style lang="scss">
.home {
	height: 100vh;
	overflow-x: hidden;
	box-sizing: border-box;
}
.status_bar {
	height: 298rpx;
	width: 100%;
	color: red;
	background: linear-gradient(90deg, #59c47f 0%, #6be7b7 100%);
	overflow: hidden;
	.label {
		position: relative;
		left: 20rpx;
		font-size: 43rpx;
		font-family: Roboto-Bold, Roboto;
		font-weight: bold;
		color: #ffffff;
	}
}
.content {
	position: relative;
	width: 100vw;
	height: calc(100% - 298rpx);
	.panel {
		position: absolute;
		width: 686rpx;
		height: 204rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.05);
		border-radius: 24rpx;
		top: -102rpx;
		left: 50%;
		transform: translateX(-50%);
		.line {
			height: 120rpx;
			border-right: 1px solid #e5e4e9;
		}
		.panel-title {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #999a9f;
		}
		.panel-info {
			margin-top: 24rpx;
			font-size: 32rpx;
			font-family: Roboto-Bold, Roboto;
			font-weight: bold;
			color: #202127;
		}
	}
	.title {
		font-size: 40rpx;
		font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
		font-weight: 500;
		color: #202127;
	}
	.part-1 {
		margin-top: 166rpx;
		padding: 0 32rpx;
		.swiper {
			overflow: hidden;
			box-sizing: border-box;
			height: 257rpx;
			margin-top:  20rpx;
		}
		.swiper-item {
			display: block;
			text-align: center;
			height: 257rpx;
			width: 686rpx;
			border-radius: 8rpx;
		}
	}
	.part-2 {
		padding: 0 30rpx;
		margin-top: 64rpx;
		padding-bottom: 64rpx;
		.more {
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #999a9f;
		}
		.courses {
			// margin-top: 16rpx;
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
			.course-item {
				margin-right: calc((100vw - (207rpx * 3) - 60rpx)/2);
				margin-top: 20rpx;
				.course-title {
					font-size: 28rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
					color: #202127;
					margin-top: 16rpx;
					width: 207rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.course-info {
					.course-info-text {
						font-size: 24rpx;
						font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
						font-weight: 400;
						color: #999a9f;
					}
					.eye-icon {
						width: 24rpx;
						height: 16rpx;
						margin-right: 5rpx;
					}
				}
			}
			.course-add {
				margin-top: 10px;
				background-color: #f4f5f7;
				&::after {
					border: none
				}
			}
			.mr0 {
				margin-right: 0;
			}
		}
	}
}
</style>
