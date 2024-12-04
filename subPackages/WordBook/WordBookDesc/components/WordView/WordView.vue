<template>
	<scroll-view class="word-list" scroll-y="true" >
		<view class="word-list-item flex jc-sb ai-c" v-for="(word, index) in props.wordList">
			<view class="item-word">{{word.word}}</view>
			<view class="item-desc" v-if="word.visible">{{word.desc}}</view>
			<view class="item-desc-hidden" v-else></view>
			<image @click="changeDescVisble(index)" class="visible-icon" src="../../../../../static/images/wordbook/eyes.png" mode=""></image>
		</view>
	</scroll-view>
</template>

<script setup>
	import { defineProps, defineEmits } from 'vue';
	const props = defineProps({
		wordList: Array
	})
	
	const emit = defineEmits(['updateList'])
	
	const changeDescVisble = (index) => {
		props.wordList[index].visible = !props.wordList[index].visible
		console.log('changeDescvisible', index, props.wordList)
		emit('updateList', props.wordList)
	}
	console.log('==props==', props)
</script>

<style scoped lang="scss">
	.word-list {
		height: 100%;
		box-sizing: border-box;
	}
	.word-list-item {
		padding: 20rpx 0;
		border-bottom: 1px solid #E5E4E9;
		.item-word {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #202127;
			line-height: 48rpx;
			font-style: normal;
		}
		.item-desc {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #999A9F;
			line-height: 36rpx;
			font-style: normal;
			flex: 1;
			margin-left: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.item-desc-hidden {
			background: #F4F5F7;
			width: 100%;
			height: 40rpx;
			margin-left: 20rpx;
			border-radius: 10rpx;
		}
		.visible-icon {
			width: 42rpx;
			height: 42rpx;
			flex-shrink: 0;
			margin-left: 20rpx;
		}
	}
</style>