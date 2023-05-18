<template>
	<view class="tool-tip">
		<uni-transition :mode-class="fade" :show="visible">
			<view class="tip">{{content}}</view>
		</uni-transition>
<!-- 		<Transition name="fade">
			<view class="tip" v-show="visible">{{content}}</view>
		</Transition> -->
		<view @click="changeStatus">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			content: String
		},
		data () {
			return {
				localShow: false
			}
		},
		mounted() {
			console.log('this.show', this.show)
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
				console.log('tootip changeStatus1', this.show, this.localShow)
				if (!this.show && !this.localShow) {
					this.$emit('close')
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
<style>
	.fade-enter-active,
	.fade-leave-active {
	  transition: opacity 0.5s ease;
	}
	
	.fade-enter-from,
	.fade-leave-to {
	  opacity: 0;
	}
</style>