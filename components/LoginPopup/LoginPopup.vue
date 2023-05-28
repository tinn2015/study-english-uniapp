<template>
	<view>
		<uni-popup ref="loginPopup" @change="change">
			<view class="popup-content fd-c jc-c ai-c">
				<view class="text">登录已过期，请重新登录</view>
				<view class="btn flex jc-c ai-c" @click="login">登录</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { defineComponent, ref, onMounted } from 'vue'
	import { useLoginStore } from '@/stores/login.js'
	export default defineComponent({
		watch: {
			'loginStore.showLoginBtn': {
				handler (val) {
					console.log('watch', val, this.$refs.loginPopup.open)
					this.$nextTick(() => {
						if (val) {
								this.$refs.loginPopup.open()
						} else {
							this.$refs.loginPopup.close()
						}
					})
				},
				immediate: true
			}
		},
		mounted () {
			console.log('monuted dom', this.$refs.loginPopup)
		},
		setup() {
			const loginStore = useLoginStore()
			return {
				loginStore
			}
		},
		methods: {
			login () {
				this.loginStore.login()
			}
		}
	})
</script>

<style scoped lang="scss">
	.popup-content {
		padding: 30rpx 30rpx;
		border-radius: 8rpx;
		overflow: hidden;
		background: #ffffff;
		.text {
			color: #808080
		}
		.btn {
			background: #59c47f;
			padding: 15rpx 30rpx;
			border-radius: 8rpx;
			margin-top: 20rpx;
			color: #fff
		}
	}
</style>