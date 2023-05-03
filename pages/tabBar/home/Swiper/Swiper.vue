<template>
	<view class="home-swiper">
		<swiper class="swiper" circular :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item>
				<view class="swiper-item uni-bg-red" :style="{background: 'yellow'}">A</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green" :style="{background: 'red'}">B</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-blue" :style="{background: 'green'}">C</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		}
	}
</script>

<style scoped lang="scss">
	.home-swiper {
		height: 300rpx
	}
	.swiper {
		overflow: hidden;
		height: 210rpx;
		box-sizing: border-box;
	}
	.swiper-item {
		display: block;
		text-align: center;
		height: 200rpx;
		border: 1px solid green;
	}
</style>
<style>
	swiper {
		height: 100%
	}
</style>