<template>
	<view class="tool-tip">
		<view class="tip" v-show="visible">{{content}}</view>
		<view @click="changeStatus">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: Boolean,
			content: String
		},
		data () {
			return {
				localShow: false
			}
		},
		computed: {
			visible () {
				if (this.show || this.localShow) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			changeStatus () {
				if (this.show) {
					this.show = false
				} else {
					this.localShow = !this.localShow
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tool-tip {
		position: relative;
		box-sizing: border-box;
		.tip {
			color: #ffffff;
			font-size: 26rpx;;
			position: absolute;
			border-radius: 8rpx;
			left: 50%;
			transform: translateX(-50%) translateY(calc(-100% - 10rpx));
			background: rgba(0,0,0,0.8);
			padding: 10rpx 20rpx;
			box-sizing: border-box;
		}
	}
</style>