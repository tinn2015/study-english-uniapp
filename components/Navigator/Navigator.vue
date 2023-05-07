<template>
	<view class="custom-navigator flex" :style="{top: top + 'px'}" @click="navigatorBack">
		<view>
			<uni-icons type="back"></uni-icons>
		</view>
		<view>返回</view>
	</view>
</template>

<script>
	import {onMounted, defineComponent, reactive} from 'vue'
	export default defineComponent({
		props: {
			
		},
		data () {
			return {
				top: 0
			}
		},
		mounted () {
			const menuButtonInfo  = reactive(uni.getMenuButtonBoundingClientRect())
			console.log('custom-navigator', menuButtonInfo)
			this.top = menuButtonInfo.top
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
		left: 20rpx;
		z-index: 2023;
	}
</style>