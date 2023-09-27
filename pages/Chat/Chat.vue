<template>
	<view class="chat flex fd-c">
		<view class="chat-box flex-1"></view>
		<view class="footer-box flex jc-sb ai-c">
			<view class="icon"></view>
			<view class="input-box flex-1">
				<input type="text" @input="onInput">
			</view>
			<view class="send-box text-center flex jc-c ai-c" :style="{width: textInput ? '160rpx' : 0}">发送</view>
		</view>
	</view>
</template>

<script>
	import Navigator from '@/components/Navigator/Navigator.vue'
	import {useLessonStore} from '@/stores/lessons.js'
	import LoginPopup from '@/components/LoginPopup/LoginPopup.vue'
	import { removeFavoriteCourse, getSectionDetail, addFavoriteCourse } from "@/utils/request.js"
	import { shareMenu } from '@/utils/share.js'
	export default {
		onShareAppMessage(res) {
			return {
			  title: '一对一口语练习，就在“开口说”',
			  path: 'pages/tabBar/home/Home',
			  imageUrl: 'https://api.itso123.com/image/share-poster.png'
			}
		  },
		setup () {
			shareMenu()
			const lessonStore = useLessonStore()
			console.log('lessonStore', lessonStore)
			return {
				lessonStore
			}
		},
		data () {
			return {
				courses: [],
				textInput: ''
			}
		},
		components: {
			Navigator,
			LoginPopup
		},
		methods: {
			onInput (e) {
				console.log('oninput', e.detail.value)
				this.textInput = e.detail.value
			}
		}
	}
</script>

<style scoped lang="scss">
	.chat {
		height: 100vh;
		overflow: hidden;
	}
	.chart-box {
		height: 100%;
		border: 1px solid green
	}
	.footer-box {
		height: 120rpx;
		background: #c7c9c9;
		padding: 0 40rpx;
		.icon {
			width: 60rpx;
			height: 60rpx;
			border: 1px solid red
		}
		.input-box {
			width: 100%;
			background: #fff;
			margin: 0 20rpx;
			height: 60rpx;
		}
		.send-box {
			width: 0;
			height: 60rpx;
			background: #00aa00;
			color: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			transition: all .3s ease-in-out; 
			white-space: nowrap;
		}
	}
</style>