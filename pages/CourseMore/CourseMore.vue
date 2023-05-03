<template>
	<view class="box">
		<view v-for="course in courses" class="flex course-item">
			<image class="poster" :src="course.poster" mode=""></image>
			<view class="right-content flex fd-c jc-sb">
				<view>
					<view class="course-title">{{course.title}}</view>
					<view class="course-process flex ai-c">
						<view class="process">
							<progress :percent="course.process" stroke-width="3" />
						</view>
						<view class="process-label">已完成<text>{{course.process}}%</text></view>
					</view>
				</view>
				<view class="course-views">{{course.views}}已学习</view>
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
						poster: '',
						title: '日常必备口语30句',
						process: 30,
						views: 1000
					},{
						poster: '',
						title: '日常必备口语30句',
						process: 30,
						views: 1000
					},{
						poster: '',
						title: '日常必备口语30句',
						process: 30,
						views: 1000
					},{
						poster: '',
						title: '日常必备口语30句',
						process: 30,
						views: 1000
					},{
						poster: '',
						title: '日常必备口语30句',
						process: 30,
						views: 1000
					},{
						poster: '',
						title: '日常必备口语30句',
						process: 30,
						views: 1000
					},
				]
			}
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
</style>