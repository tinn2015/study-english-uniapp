<template>
	<view class="custom-navigator" :style="{top: top + 'px'}">
		<view class="flex ai-c jc-sb" :style="{height: height + 'px', width: `calc(100% - ${menuButtonWidth - 20}px)`}">
			<view class="flex ai-c" @click="navigatorBack">
				<view>
					<uni-icons type="back"></uni-icons>
				</view>
				<view>返回</view>
			</view>
			<slot></slot>
			<view></view>
		</view>
	</view>
</template>

<script>
	import {onMounted, defineComponent, reactive} from 'vue'
	export default defineComponent({
		props: {
			NavTop: Number,
		},
		data () {
			return {
				top: 0,
				height: 0,
				menuButtonWidth: 0
			}
		},
		mounted () {
			// if (this.NavTop) {
			// 	this.top = this.NavTop
			// } else {
				
			// }
			const menuButtonInfo  = reactive(uni.getMenuButtonBoundingClientRect())
			console.log('custom-navigator', menuButtonInfo)
			this.top = menuButtonInfo.top
			this.height = menuButtonInfo.height
			this.menuButtonWidth = menuButtonInfo.width
		},
		methods: {
			navigatorBack () {
				uni.navigateBack()
			}
		}
	})
</script>

<style scoped lang="scss">
	.custom-navigator {
		position: fixed;
		top: 0;
		left: 0rpx;
		z-index: 2023;
		// padding: 10rpx 0 10rpx 20rpx;
		padding: 10rpx 0 0 20rpx;
		width: 100%;
		box-sizing: border-box;
	}
</style>