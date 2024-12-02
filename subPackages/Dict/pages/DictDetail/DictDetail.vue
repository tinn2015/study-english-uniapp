<template>
	<view class="dict-detail">
		<view class="dict-header">
			<view class="flex jc-c">{{dictDetail.title}}</view>
			<view>{{dictDetail.descript}}</view>
			<view>单词数： {{dictDetail.wordsNum}}</view>
			<button type="default">开始学习</button>
		</view>
		
		<view>
			<view class="flex jc-c ai-c">
				<view class="flex-1 flex jc-c">已学单词({{dictDetail.learnedWords.length}})</view>
				<view class="flex-1 flex jc-c">未学单词({{dictDetail.learningWords.length}})</view>
				<view class="flex-1 flex jc-c">已牢记单词(188)</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {useDictStore} from '@/stores/dict.js'
	import {
		reactive,
		onBeforeMount,
		ref,
		createApp,
		onMounted,
	} from 'vue';
	
	const dictStore  = useDictStore()
	
	const {dictDetail} = dictStore
	
	
	
	
</script>

<style lang="scss">
	.dict-detail {
		width: 100%;
		height: 100vh;
		border: 1px solid palevioletred;
		box-sizing: border-box;
	}
</style>