<template>
	<scroll-view scroll-y class="word-book-home flex fd-c">
		<view class='word-book-item flex jc-sb' v-for="wordBook in wordBookStore.wordBooklist" @click="routerToWordBookDesc(wordBook.lessonId)">
			<image class="word-book-poster" :src="wordBook.img" mode=""></image>
			<view class="word-book-desc flex fd-c jc-sb">
				<view class="word-book-title">{{wordBook.title}}</view>
				<view class="flex jc-sb">
					<view class="word-book-label">{{wordBook.wordsNum}}个单词</view>
					<view class="word-book-label">今天待复习{{wordBook.pendingWordsNum}}个</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import {
		reactive,
		onBeforeMount,
		ref,
		createApp,
		onMounted,
	} from 'vue';
	import {
		onReady,
		onUnload,
		onShow,
	} from '@dcloudio/uni-app';
	import { useWordBookStore } from '@/stores/wordBook.js'
	
	// 字典状态管理
	const wordBookStore = useWordBookStore()
	
	const routerToWordBookDesc = async (id) => {
		await wordBookStore.getWordBook(id)
		uni.navigateTo({
			url: '/subPackages/WordBook/WordBookDesc/WordBookDesc'
		})
	}
	
	onShow(() => {
		wordBookStore.getWordBookList()
	})
	
	
</script>

<style scoped lang="scss">
	.word-book-home {
		width: 100%;
		height: 100vh;
		padding: 40rpx 40rpx;
		box-sizing: border-box;
	}
	.word-book-item {
		margin-bottom: 40rpx;
		width: 100%;
		font-size: 30rpx;
		font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
		font-weight: 500;
		color: #202127;
	}
	.word-book-desc {
		width: 100%;
		margin-left: 20rpx;
	}
	.word-book-poster {
		width: 136rpx;
		height: 162rpx;
		border-radius: 12rpx;
	}
	.word-book-label {
		font-size: 26rpx;
		font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
		font-weight: 400;
		color: #BDBDBD;
		margin-top: 32rpx;
	}
</style>