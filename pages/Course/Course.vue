<template>
	<view class="find">
		<view class="header">
			
		</view>
		<view class="find-content">
			<view class="tip flex jc-sb ai-c">
				<image src="../../static/images/horn.png" class="horn" mode=""></image>
				<text class="tip-text">推荐你一门系统学习课、高效提高英语能力</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			<view class="process-box">
				<view class="process-label">完成进度 0/2</view>
				<view v-for="course in courses" class="flex jc-sb ai-c course-box">
					<image class="course-img" :src="course.img" mode=""></image>
					<view class="course-info">
						<view class="course-title">{{course.title}}</view>
						<view class="course-desc">{{course.desc}}</view>
					</view>
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
			<view class="handles flex jc-sb ai-c">
				<view class="flex fd-c ai-c">
					<image class="add-icon" src="../../static/images/add-course.png" mode=""></image>
					<text class='add-label'>添加课程</text>
				</view>
				<view class="get-study flex jc-c ai-c">开始学习</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
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
		methods: {
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
		background: #808080;
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
		padding: 32rpx;
		.tip {
			height: 72rpx;
			background: #F4F5F7;
			border-radius: 16rpx;
			padding: 0 22rpx;
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
			margin-top: 32rpx;
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
			border-top: 1px solid #BDBDBD;
			position: absolute;
			bottom: 84rpx;
			left: 0;
			padding-left: 24rpx;
			padding-right: 32rpx;
			padding-top: 16rpx;
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