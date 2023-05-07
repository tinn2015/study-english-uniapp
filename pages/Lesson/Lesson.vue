<template>
	<view class="lesson">
		<view class="part-1 flex jc-c ai-c">
			<view>Excuse me,are you Am</view>
		</view>
		<view class="part-2">
			<view class="flex jc-c ai-c">Are you Canadian?</view>
			<view class="handles flex jc-c ai-c">
				<view class="btn">
					<image class="icon-mini" src="http://api.itso123.com/image/speaker.png" mode=""></image>
				</view>
				<view class="btn btn-mid">
					<image class="icon" src="http://api.itso123.com/image/microphone.png" mode=""></image>
				</view>
				<view class="btn">
					<image class="icon-mini" src="http://api.itso123.com/image/play.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="part-3">
			<view class="btn flex jc-c ai-c" @click="routeToReport">完成并获取报告</view>
		</view>
	</view>
</template>

<script setup>
	const routeToReport =  () => {
		console.log(1111)
		uni.navigateTo({
			url: "/pages/Report/Report"
		})
	}
</script>

<style scoped lang="scss">
	.part-1 {
		height: 322rpx;
		background: #F2F2F2;
	}
	.part-2 {
		.handles {
			margin-top: 88rpx;
		}
		.icon-mini {
			width: 96rpx;
			height: 96rpx
		}
		.icon {
			width: 120rpx;
			height: 120rpx
		}
		.btn-mid {
			margin: 0 70rpx
		}
	}
	.part-3 {
		padding: 0 32rpx;
		margin-top: 60rpx;
		.btn {
			background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
			border-radius: 60rpx;
			height: 96rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
	}
</style>