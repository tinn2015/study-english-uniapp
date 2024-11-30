<template>
	<view class="dict-list flex fd-c">
		<view class='dict-item' v-for="dict in dictList.list" @click="getDictHandle(dict.id)">
			<view>{{dict.title}}</view>
		</view>
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
	import { useDictStore } from '@/stores/dict.js'
	
	// 字典状态管理
	const dictStore = useDictStore()
	
	// 单词本列表
	const dictList = reactive({
		list: {}
	})
	
	const getDictHandle = () => {
		dictStore.getDictDetail(3)
		uni.navigateTo({
			url: '/packageDict/pages/DictDetail/DictDetail'
		})
	}
	
	onMounted(() => {
		getDictList().then(res => {
			console.log('==单词本列表==', res)
			dictList.list = res.lessons
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
	.dict-item {
		border-radius: 16rpx;
		background: #eeeeee;
		margin-top: 20rpx;
		padding: 20rpx;
	}
	
</style>