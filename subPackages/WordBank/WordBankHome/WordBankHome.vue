<template>
	<view class="dict-page flex fd-c">
		<view class="search-box">
			<input class="input" @input="getInput" @confirm="search" v-model="queryWordValue" type="text" search="查询" placeholder="搜索课程和词汇">
			<view class="search-clear-btn" @click="clearSearchValue">
				<image class="search-clear-img" src="../../static/images/dict/close.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="search-container">
			<view class="tips-box" v-if="blockVisible === blockVisibleConfig.tips">
				<view @click="searchByHistory(item.word)" v-for="item in tips.list">
					<view class="tip flex ai-c">
						<view class="word">{{item.word}}</view>
						<view class="desc">{{item.desc}}</view>
					</view>
				</view>
			</view>
			<view class="search-history" v-else-if="blockVisible === blockVisibleConfig.history">
				<scroll-view class="history-box" scroll-y="true">
					<view @click="searchByHistory(item.word)" v-for="item in queryHistory.list">
						<view class="history-item flex ai-c">
							<view class="word">{{item.word}}</view>
							<view class="desc">{{item.desc}}</view>
						</view>
						<!-- <view @click="searchByHistory(item.word)" v-for="item in queryHistory.list">
							<view class="history-item flex ai-c">
								<view class="word">{{item.word}}</view>
								<view class="desc">{{item.desc}}</view>
							</view>
						</view> -->
					</view>
					<view class="clear-btn-box flex jc-c ai-c">
						<view class="clear-btn flex jc-c ai-c">清空搜索历史</view>
					</view>
				</scroll-view>
				<view class="word-list flex jc-c ai-c">
					<view class="word-list-btn flex jc-c ai-c">进入单词本</view>
				</view>
			</view>
			<!-- 搜索结果 -->
			<view class="search-result" v-else>
				<view class="word-desc">
					<view class="word-desc-word">{{queryResult.list.word}}</view>
					<view class='pronounce flex'>
						<view class="flex ai-c">
							<image @click="playAudio(queryResult.list.phonetics[0].recUrl)" class="speaker-icon" src="../../static/images/dict/speaker.png" mode=""></image>
							<view class="pronounce-symbol">{{queryResult.list.phonetics[0].symbol}}</view>
						</view>
						<view class="flex ai-c ml32">
							<image @click="playAudio(queryResult.list.phonetics[1].recUrl)" class="speaker-icon" src="../../static/images/dict/speaker.png" mode=""></image>
							<view class="pronounce-symbol">{{queryResult.list.phonetics[1].symbol}}</view>
						</view>
					</view>
					<view class="translate">
						<view v-for="item in queryResult.list.trans">
							{{item}}
						</view>
					</view>
				</view>
				<view class="sentences">
					<view class="s-title">例句</view>
					<view class="mt24" v-for="(item, _i) in queryResult.list.sentences">
						<rich-text :nodes="getHighlight(item.content, _i)"></rich-text>
						<view class="cn">{{item.cn}}</view>
					</view>
				</view>
				<view class="phrases">
					<view class="s-title">短语</view>
					<view class="mt24" v-for="(item, index) in queryResult.list.phrases">
						<rich-text :nodes="getHighlight(item.content, index)"></rich-text>
						<view class="cn">{{item.cn}}</view>
					</view>
				</view>
				<view class="synos"></view>
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
	import { getTips, queryWord, queryWordHistory, queryWordAddCollect, queryWordRemoveCollect } from '@/utils/dict.js'
	
	// 显示模块控制
	const blockVisible = ref(1);
	
	// 搜索框内容
	const queryWordValue = ref('')
	
	const blockVisibleConfig = {
		/**
		 * 历史记录
		 */
		history: 1,
		// 提示
		tips: 2,
		// 查询结果
		result: 3,
	}
	
	// 搜索结果
	const queryResult = reactive({
		list: {}
	})
	
	// 历史记录
	const queryHistory = reactive({
		list: []
	})
	
	onMounted(() => {
		queryWordHistory().then(res => {
			console.log('==历史记录==', res)
			queryHistory.list = res.words
		})
	})
	
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
			dictTipsQuery(words)
		}, 500)
	}
	
	/**
	 * 查询接口
	 */
	const tips = reactive({
		list: []
	})
	const dictTipsQuery = (word) => {
		if (!word) {
			blockVisible.value = blockVisibleConfig.history
			return
		}
		const mockdata = [
			{word: 'look', desc: 'v. 看；寻找；与……外表相似；看似，显得；注意；'},
			{word: 'loose', desc: 'adj.未固定牢的，松动的；零散...'},
		]
		console.log('==开始查询==', word)
		getTips(word).then((res) => {
			blockVisible.value = blockVisibleConfig.tips
			console.log('==dictTipsQuery==', res)
			if (res.words && res.words.length) {
				tips.list = res.words
			}
		})
	}
	
	/**
	 * 单词搜索
	 */
	const search = (e) => {
		const word = e.detail.value
		console.log('单词搜索', word)
		if (inputTimer.value) {
			clearTimeout(inputTimer.value)
			inputTimer.value = 0
		}
		queryWord(word).then(res => {
			blockVisible.value = blockVisibleConfig.result
			console.log('==单词搜索结果==', res)
			queryResult.list = res
		})
	}
	
	/**
	 * 历史记录搜索
	 */
	const searchByHistory = (word) => {
		queryWord(word).then(res => {
			blockVisible.value = blockVisibleConfig.result
			console.log('==单词搜索结果==', res)
			queryResult.list = res
		})
	}
	
	
	/**
	 * 音频播放
	 */
	const innerAudioContext = uni.createInnerAudioContext();
	const playAudio = (url) => {
		innerAudioContext.stop()
		if (!url) {
			console.log('发音播放失败：未获取播放地址')
			return
		}
		innerAudioContext.src = url
		innerAudioContext.play()
	}
	
	/**
	 * 匹配指定单词高亮
	 */
	const getHighlight = (strings, index) => {
		const word = queryResult.list.word
		const regexp = new RegExp(word, 'ig')
		const html = strings.replace(regexp, `<span style="color:#58C898">$&</span>`)
		console.log('html', html)
		return `${index+1}.` + html
	}
</script>

<style scoped lang="scss">
	.dict-page {
		width: 100%;
		height: 100vh;
		padding: 0 32rpx;
		box-sizing: border-box;
	}
	.search-box {
		width: 100%;
		margin: 0 auto;
		position: relative;
		padding: 32rpx 0;
		box-sizing: border-box;
		.input {
			padding: 0 32rpx;
			height: 96rpx;
			line-height: 96rpx;
			border-radius: 52rpx;
			background: #F3F4F6;
		}
		.search-clear-btn {
			position: absolute;
			right: 20rpx;
			top: 50rpx;
			z-index: 20;
			width: 60rpx;
			height: 60rpx;
			.search-clear-img {
				width: 100%;
				height: 100%
			}
		}
	}
	.search-container {
		height: calc(100% - 164rpx);
		// margin-top: 40rpx;
		// position: relative;
		// border: 1px solid green;
		
	}
	.word {
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 32rpx;
		color: #58C898;
		line-height: 48rpx;
		text-align: left;
		font-style: normal;
	}
	.desc {
		margin-left: 34rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 24rpx;
		color: #999A9F;
		line-height: 36rpx;
		text-align: left;
		font-style: normal;
	}
	.tips-box {
		// position: absolute;
		// top: 0;
		// left: 0;
		// z-index: 200;
		// // border: 1px solid red;
		// height: 100%;
		// width: 100%;
		.tip {
			border-bottom: 1px solid #E5E4E9;
			padding: 0 20rpx;
			height: 92rpx
		}
	}
	.search-history {
		height: 100%;
		padding-bottom: 40rpx;
		box-sizing: border-box;
		.history-box {
			height: calc(100% - 80rpx)
		}
		.history-item {
			border-bottom: 1px solid #E5E4E9;
			padding: 0 20rpx;
			height: 92rpx
		}
		.clear-btn-box {
			padding: 20rpx 0;
		}
		.clear-btn {
			// width: 686rpx;
			// height: 96rpx;
			width: 264rpx;
			// min-height: 80rpx;
			border-radius: 40rpx;
			border: 2rpx solid #58C898;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			font-size: 26rpx;
			color: #BDBDBD;
			line-height: 20rpx;
			padding: 20rpx;
			font-style: normal;
			box-sizing: border-box;
		}
		.word-list {
			padding: 16rpx 32rpx;
			border-top: 1px solid #BDBDBD;
			.word-list-btn {
				background: linear-gradient( 90deg, #59C47F 0%, #6BE7B7 100%);
				border-radius: 60rpx;
				height: 96rpx;
				width: 100%;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #FFFFFF;
				line-height: 48rpx;
				text-align: right;
				font-style: normal;
			}
		}
	}
	.search-result {
		// border: 1px solid blueviolet;
		height: 100%;
		.word-desc {
			padding-bottom: 40rpx;
			border-bottom: 2rpx dashed #E5E4E9;
			.word-desc-word {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 52rpx;
				color: #202127;
				line-height: 74rpx;
				font-style: normal;
				margin-top: 24rpx;
			}
			.pronounce {
				margin-top: 22rpx;
				.speaker-icon {
					width: 60rpx;
					height: 60rpx;
				}
				.pronounce-symbol {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #999A9F;
					line-height: 44rpx;
					text-align: left;
					font-style: normal;
					margin-left: 16rpx;
				}
			}
			.translate {
				margin-top: 46rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #202127;
				line-height: 44rpx;
				text-align: left;
				font-style: normal;
			}
		}
		.phrases {
			padding-bottom: 60rpx;
		}
		.sentences {
			padding-bottom: 60rpx;
			border-bottom: 2rpx dashed #E5E4E9;
		}
		.sentences, .phrases {
			margin-top: 60rpx;
			.s-title {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 28rpx;
				color: #202127;
				line-height: 44rpx;
				text-align: left;
				font-style: normal;
			}
			.content {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #202127;
				line-height: 44rpx;
				text-align: left;
				font-style: normal;
			}
			.cn {
				margin-top: 8rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #999A9F;
				line-height: 44rpx;
				text-align: left;
				font-style: normal;
			}
			.hight-light-word {
				color: #58C898 
			}
		}
	}
	.ml32 {
		margin-left: 32rpx;
	}
	.mt24 {
		margin-top: 24rpx;
	}
</style>