<template>
	<view class="home flex fd-c">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
			<view class="label" :style="{top: menuButtonInfo.top + 'px'}">Hello!</view>
		</view>
		<view class="content flex jc-c ai-c">
			<view class="panel">看板</view>
		</view>
	</view>
</template>

<script>
	import {onMounted, defineComponent, reactive} from 'vue'
	import { onReady, onInit } from '@dcloudio/uni-app'
	export default defineComponent({
		setup () {
			console.log(11)
			// 小程序胶囊位置
			const menuButtonInfo  = reactive(uni.getMenuButtonBoundingClientRect())
			onReady(() => {
				console.log('ready',menuButtonInfo )
			})
			onInit(() => {
				console.log('init2')
			})
			return {
				menuButtonInfo
			}
		},
		mounted () {
			console.log('mounted')
		},
		onLoad () {
			console.log('load')
		},
		onInit () {
			console.log('init')
		}
	})
</script>

<style lang="scss">
	.home {
		height: 100vh
	}
	.status_bar {
		height: 298rpx;
		width: 100%;
		color: red;
		background: linear-gradient(90deg, #59C47F 0%, #6BE7B7 100%);
		.label {
			position: relative;
			left: 20rpx;
			font-size: 48rpx;
			font-family: Roboto-Bold, Roboto;
			font-weight: bold;
			color: #FFFFFF;
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
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0,0,0,0.05);
			border-radius: 24rpx;
			top: -102rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>