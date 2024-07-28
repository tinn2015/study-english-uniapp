<template>
	<view class="dict-page flex fd-c">
		<view class="search-box">
			<input class="input" @input="getInput" type="text">
			<view class="search-btn">icon</view>
		</view>
		<view class="search-container">
			<view class="tips-box" v-if="tipsVisible">
				<view v-for="item in tips.list">
					<view class="tip flex">
						<view class="tip-word">{{item.word}}</view>
						<view class="tip-desc">{{item.desc}}</view>
					</view>
				</view>
			</view>
			<view class="search-result" v-else></view>
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
	
	const tipsVisible = ref(false);
	
	/**
	 * 获取输入框
	 */
	const inputTimer = ref(0)
	const getInput = (e) => {
		console.log('==获取查询输入框==', e.detail.value)
		const words = e.detail.value
		
		if (inputTimer.value) {
			clearTimeout(inputTimer.value)
			inputTimer.value = 0
		}
		inputTimer.value = setTimeout(() => {
			dictQuery(words)
		}, 500)
	}
	
	/**
	 * 查询接口
	 */
	const tips = reactive({
		list: []
	})
	const dictQuery = (words) => {
		if (!words) {
			tipsVisible.value = false
			return
		}
		const mockdata = [
			{word: 'look', desc: 'v. 看；寻找；与……外表相似；看似，显得；注意；'},
			{word: 'loose', desc: 'adj.未固定牢的，松动的；零散...'},
		]
		console.log('==开始查询==', words)
		setTimeout(() => {
			tipsVisible.value = true
			tips.list = mockdata
			console.log('tips', tips)
		}, 200)
	}
</script>

<style scoped lang="scss">
	.dict-page {
		width: 100%;
		height: 100vh;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.search-box {
		width: 100%;
		border: 1px solid indianred;
		margin: 0 auto;
		height: 80rpx;
		border-radius: 40rpx;
		position: relative;
		.input {
			padding: 0 40rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
		.search-btn {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
		}
	}
	.search-container {
		height: 100%;
		margin-top: 40rpx;
		position: relative;
	}
	.tips-box {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 200;
		// border: 1px solid red;
		height: 100%;
		width: 100%;
		.tip {
			border-bottom: 1px solid #333333;
			padding: 20rpx
		}
		.tip-word {
			font-weight: 600;
		}
		.tip-desc {
			margin-left: 40rpx;
		}
	}
	.search-result {
		// border: 1px solid blueviolet;
	}
</style>