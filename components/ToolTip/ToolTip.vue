<template>
	<view class="tool-tip">
		<uni-transition :mode-class="fade" :show="localShow">
			<view class="tip" :style="{'display': localShow ? 'block' : 'none'}">{{content}}</view>
		</uni-transition>
<!-- 		<Transition name="fade">
			<view class="tip" v-show="visible">{{content}}</view>
		</Transition> -->
		<view @click="changeStatus">
			<slot></slot>
		</view>
		<!-- <view class="mask" @click="maskTap" v-if="localShow"></view> -->
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
				localShow: false,
			}
		},
		watch: {
			show (val) {
				this.localShow = val
			}
		},
		mounted() {
			console.log('this.show', this.show)
			this.localShow = this.show
		},
		computed: {
			// visible () {
			// 	if (this.show || this.localShow) {
			// 		return true
			// 	} else {
			// 		return false
			// 	}
			// }
		},
		methods: {
			changeStatus () {
				// this.localShow = !this.localShow
				if (!this.localShow && this.content) {
					 this.localShow = true
				} else {
					this.localShow = false
				}
				// this.localShow = !this.localShow
				console.log('tootip changeStatus1', this.show, this.localShow)
				console.log('tooltip content', this.content)
				if (!this.localShow) {
					this.$emit('close')
				}
			},
			maskTap () {
				console.log('maskTap', this.localShow, this.visible)
				this.localShow = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.tool-tip {
		position: relative;
		box-sizing: border-box;
		z-index: 1000;
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
			min-width: 200rpx;
			word-wrap: break-word;
			display: none;
		}
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
		}
		&:hover {
			.tip {
				display: block;
			}
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