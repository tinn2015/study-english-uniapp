<template>
	<view class="find">
		<view class="header">
			<image class="banner" mode="aspectFit" src="../../../static/images/find-bg.png"></image>
		</view>
		<view class="find-content flex">
			<view class="left">
				<view class="nav-item flex jc-c ai-c" @click="navTap(nav)" :class="currentNav === nav.id ? 'nav-active' : ''" v-for="nav in navLists">{{nav.label}}</view>
			</view>
			<view class="right"></view>
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
				currentNav: 1
			}
		},
		methods: {
			navTap (nav){
				this.currentNav = nav.id
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