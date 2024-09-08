<template>
	<view class="dict-list flex fd-c">
		dadas
	</view>
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
	import { getDictList } from '@/utils/dict.js'
	
	// 单词本列表
	const dictList = reactive({
		list: {}
	})
	
	onMounted(() => {
		getDictList().then(res => {
			console.log('==单词本列表==', res)
			dictList.list = res.words
		})
	})
	
	
</script>

<style scoped lang="scss">
	.dict-list {
		width: 100%;
		height: 100vh;
		padding: 40rpx;
		box-sizing: border-box;
	}
	
</style>