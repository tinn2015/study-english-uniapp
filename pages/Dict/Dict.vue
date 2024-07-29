<template>
	<view class="dict-page flex fd-c">
		<view class="search-box">
			<input class="input" @input="getInput" @confirm="search" v-model="queryWordValue" type="text" search="查询">
			<view class="search-clear-btn" @click="clearSearchValue">clear</view>
		</view>
		<view class="search-container">
			<view class="tips-box" v-if="blockVisible === blockVisibleConfig.tips">
				<view v-for="item in tips.list">
					<view class="tip flex">
						<view class="tip-word">{{item.word}}</view>
						<view class="tip-desc">{{item.desc}}</view>
					</view>
				</view>
			</view>
			<view class="search-history" v-else-if="blockVisible === blockVisibleConfig.history">
				<view class="flex fw-w">
					<view class="history-item" @click="searchByHistory(item.word)" v-for="item in queryHistory">
						{{ item.word }}
					</view>
				</view>
				<view class="clear-btn">清空搜索历史</view>
			</view>
			<view class="search-result" v-else>
				<view class='pronounce flex jc-sb'>
					<view class="flex ai-c">美 <image class="speaker-icon" src="../../static/images/dict/speaker.png" mode=""></image></view>
					<view class="flex ai-c">英 <image class="speaker-icon" src="../../static/images/dict/speaker.png" mode=""></image></view>
					<view>搜藏</view>
				</view>
				<view class="translate">
					<view v-for="item in queryResult.trans">
						{{item}}
					</view>
				</view>
				<view class="phrases">
					<view v-for="item in queryResult.phrases">
						<view>{{item.content}}</view>
						<view>{{item.cn}}</view>
					</view>
				</view>
				<view class="synos"></view>
				<view class="sentences">
					<view v-for="item in queryResult.sentences">
						<view>{{item.content}}</view>
						<view>{{item.cn}}</view>
					</view>
				</view>
			</view>
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
	import { getTips, queryWord, queryWordHistory, queryWordAddCollect, queryWordRemoveCollect } from '@/utils/request.js'
	
	// 显示模块控制
	const blockVisible = ref(1);
	
	// 搜索框内容
	const queryWordValue = ref('')
	
	const blockVisibleConfig = {
		history: 1,
		tips: 2,
		result: 3,
	}
	
	const queryHistory = [
		{word: 'click', desc: 'v.(在计算机屏幕上用鼠标)点击；豁然开朗；使咔嗒(或咔嚓)响；配合默契；被突然明白；（与某人）顷刻成为朋友'},
		{word: 'clock', desc: 'n.时钟；钟'},
		{word: 'good', desc: 'n.时钟；钟'},
		{word: 'much', desc: 'n.时钟；钟'},
		{word: 'positive', desc: 'adj.积极乐观的；完全的；良好的；正数的；建设性的；正电的；自信的；阳性的；拥护的；表示赞同的；有绝对把握；证据确凿的；朝着成功的'},
		{word: 'active', desc: 'adj.积极乐观的；完全的；良好的；正数的；建设性的；正电的；自信的；阳性的；拥护的；表示赞同的；有绝对把握；证据确凿的；朝着成功的'},
	]
	
	const queryResult = {
		"result": "0",
		"reason": "success",
		"word": "knock",
		"usRecUrl": "https://api.itso123.com/upload/words/k/knock.wav",
		"ukRecUrl": "https://api.itso123.com/upload/words/k/knock.wav",
		"trans": [
			"n. 敲；敲打；爆震声",
			"v. 敲；打；敲击"
		],
		"phrases": [
			{
				"content": "knock on",
				"cn": "撞击撞出；敲击（门、窗）"
			},
			{
				"content": "knock out",
				"cn": "敲空；击倒；打破；使筋疲力竭"
			}
		],
		"synos": [
			{
				"words": [
					"strike",
					"hit"
				],
				"cn": "vi. 敲；打；[动力]敲击"
			},
			{
				"words": [
					"strike",
					"stroke",
					"dong"
				],
				"cn": "vt. 敲；打；[动力]敲击；批评"
			},
			{
				"words": [
					"beating"
				],
				"cn": "n. 敲；敲打；[力]爆震声"
			}
		],
		"sentences": [
			{
				"content": "I knocked and knocked but nobody answered.",
				"cn": "我把门敲了又敲，但无人回应。"
			}
		]
	}
	
	/**
	 * 清除搜索框
	 */
	const clearSearchValue = () => {
		console.log('清除搜索框')
		queryWordValue.value = ''
		blockVisible.value = blockVisibleConfig.history
	}
	
	/**
	 * 获取输入框
	 */
	const inputTimer = ref(0)
	const getInput = (e) => {
		console.log('==获取查询输入框==', e.detail.value)
		console.log('==获取查询输入框2==', queryWordValue.value)
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
			blockVisible.value = blockVisibleConfig.history
			return
		}
		const mockdata = [
			{word: 'look', desc: 'v. 看；寻找；与……外表相似；看似，显得；注意；'},
			{word: 'loose', desc: 'adj.未固定牢的，松动的；零散...'},
		]
		console.log('==开始查询==', words)
		setTimeout(async () => {
			blockVisible.value = blockVisibleConfig.tips
			tips.list = mockdata
			// const tipResult = await getTips(words)
			// console.log('tipResult', tipResult)
			console.log('tips', tips)
		}, 200)
	}
	
	/**
	 * 单词搜索
	 */
	const search = (word) => {
		setTimeout(async () => {
			blockVisible.value = blockVisibleConfig.result
			console.log('单词搜索', word)
			// tips.list = mockdata
			// const tipResult = await getTips(words)
			// console.log('tipResult', tipResult)
			// console.log('tips', tips)
		}, 200)
	}
	
	/**
	 * 历史记录搜索
	 */
	const searchByHistory = (word) => {
		setTimeout(async () => {
			blockVisible.value = blockVisibleConfig.result
			console.log('历史单词搜索', word)
			// tips.list = mockdata
			// const tipResult = await getTips(words)
			// console.log('tipResult', tipResult)
			// console.log('tips', tips)
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
		.search-clear-btn {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			z-index: 20;
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
	.search-history {
		.history-item {
			padding: 20rpx 40rpx;
			margin-top: 20rpx;
			background: #e6f4ff;
			margin-right: 20rpx;
			border-radius: 10rpx;
		}
		.clear-btn {
			margin-top: 40rpx;
			padding: 20rpx;
			text-align: center;
		}
	}
	.search-result {
		// border: 1px solid blueviolet;
		.pronounce {
			.speaker-icon {
				width: 40rpx;
				height: 40rpx;
			}
			padding: 20rpx 40rpx 40rpx;
			border-bottom: 1px solid #dddddd;
		}
		.translate {
			margin-top: 20rpx;
			padding: 0 20rpx;
		}
		.phrases {
			margin-top: 20rpx;
		}
	}
</style>