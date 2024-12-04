<template>
	<view class="word-book-desc flex fd-c">
		<view class="desc-header">
			<view class="flex">
				<image class="word-book-poster" src="" mode=""></image>
				<view class="desc-info flex fd-c jc-sb">
					<view class="desc-info-title">单词本1</view>
					<view class="desc-detail">收录你平时阅读过程遇到的单词，并通过【艾犯得上发射点犯得上发射点发射点犯得上发射点发射点发射点热望认为人发射点发射点</view>
					<view class="desc-nums flex jc-sb">
						<view>单词数288</view>
						<view>待复习23/265</view>
					</view>
				</view>
			</view>
			<view class="flex jc-c">
				<view class="study">开始学习</view>
			</view>
			<view class="review-time flex jc-sb ai-c">
				<view class="flex ai-c">
					<image class="speaker-icon" src="../../../static/images/wordbook/speaker.png" mode=""></image>
					<view class="review-label">下次最佳复习时间 2024/03/02 08:00</view>
				</view>
				<image class="right-arrow-icon" src="../../../static/images/wordbook/right-arrow.png" mode=""></image>
			</view>
		</view>
		
		<view class="content flex fd-c">
			<view class="segment-tap">
				<uni-segmented-control :current="currentTap" :values="tabs" active-color="#007AFF" style-type="text" @clickItem="tabClick"></uni-segmented-control>
			</view>
			<view class="segment-content">
				<view class="h-full" v-show="currentTap === 0">
					<WordView @update="updateList" :wordList="mockData.list"></WordView>
				</view>
				<view class="h-full" v-show="currentTap === 1">
					选项卡2的内容
				</view>
				<view class="h-full" v-show="currentTap === 2">
					选项卡3的内容
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { useWordBookStore } from '@/stores/wordBook.js'
	import {
		reactive,
		onBeforeMount,
		ref,
		createApp,
		onMounted,
	} from 'vue';
	import WordView from './components/WordView/Wordview'
	
	const currentTap = ref(0)
	
	const wordBookStore = useWordBookStore()
	const tabs = reactive(['已学单词', '未学单词', '已牢单词'])
	const learnedWordsTag = '已学单词' + (wordBookStore.wordBookDetail.learnedWords.length || '')
	const learningWordsTag = '已学单词' + (wordBookStore.wordBookDetail.learningWords.length || '')
	const pendingWordsTag = '已学单词' + (wordBookStore.wordBookDetail.pendingWordsNum.length || '')
	
	const mockData = reactive({
		list: [
	  {
		"word": "example1",
		"desc": "这是一段解释，A1，B2，C3",
		"visible": true
	  },
	  {
		"word": "example2",
		"desc": "这是一段说明，D4，E5，F6",
		"visible": true
	  },
	  {
		"word": "example3",
		"desc": "这是一段描述，G7，H8，I9",
		"visible": true
	  },
	  {
		"word": "example4",
		"desc": "这是一段阐释，J10，K11，L12",
		"visible": true
	  },
	  {
		"word": "example5",
		"desc": "这是一段讲解，M13，N14，O15这是一段讲解，M13，N14，O15这是一段讲解，M13，N14，O15这是一段讲解，M13，N14，O15这是一段讲解，M13，N14，O15"
	  },
	  {
		"word": "example6",
		"desc": "这是一段注解，P16，Q17，R18"
	  },
	  {
		"word": "example7",
		"desc": "这是一段阐述，S19，T20，U21"
	  },
	  {
		"word": "example8",
		"desc": "这是一段解说，V22，W23，X24"
	  },
	  {
		"word": "example9",
		"desc": "这是一段诠释，Y25，Z26，AA27"
	  },
	  {
		"word": "example10",
		"desc": "这是一段细说，AB28，AC29，AD30"
	  },
	  {
	  		"word": "example1",
	  		"desc": "这是一段解释，A1，B2，C3"
	  },
	  {
	  		"word": "example2",
	  		"desc": "这是一段说明，D4，E5，F6"
	  },
	  {
	  		"word": "example3",
	  		"desc": "这是一段描述，G7，H8，I9"
	  },
	  {
	  		"word": "example4",
	  		"desc": "这是一段阐释，J10，K11，L12"
	  },
	  {
	  		"word": "example5",
	  		"desc": "这是一段讲解，M13，N14，O15"
	  },
	  {
	  		"word": "example6",
	  		"desc": "这是一段注解，P16，Q17，R18"
	  },
	  {
	  		"word": "example7",
	  		"desc": "这是一段阐述，S19，T20，U21"
	  },
	  {
	  		"word": "example8",
	  		"desc": "这是一段解说，V22，W23，X24"
	  },
	  {
	  		"word": "example9",
	  		"desc": "这是一段诠释，Y25，Z26，AA27"
	  },
	  {
	  		"word": "example10",
	  		"desc": "这是一段细说，AB28，AC29，AD30"
	  },
	  {
	  		"word": "example4",
	  		"desc": "这是一段阐释，J10，K11，L12"
	  },
	  {
	  		"word": "example5",
	  		"desc": "这是一段讲解，M13，N14，O15"
	  },
	  {
	  		"word": "example6",
	  		"desc": "这是一段注解，P16，Q17，R18"
	  },
	  {
	  		"word": "example7",
	  		"desc": "这是一段阐述，S19，T20，U21"
	  },
	  {
	  		"word": "example8",
	  		"desc": "这是一段解说，V22，W23，X24"
	  },
	  {
	  		"word": "example111",
	  		"desc": "这是一段诠释，Y25，Z26，AA27"
	  },
	  {
	  		"word": "example222",
	  		"desc": "这是一段细说，AB28，AC29，AD30"
	  }
	]
	})
	
	const updateList = (list) => {
		mockData.list = list
	}
	
	const tabClick = (e) => {
		console.log('tabclick', e)
		if (currentTap.value !== e.currentIndex) {
			currentTap.value = e.currentIndex
		}
	}
	
	
</script>

<style lang="scss">
	.word-book-desc {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		background: #F2F2F2;
	}
	.desc-header {
		background: #ffffff;
		padding: 32rpx 32rpx 24rpx;
		flex-shrink: 0;
		.word-book-poster {
			width: 152rpx;
			height: 200rpx;
			background: #6EE0A8;
			border-radius: 12rpx;
			flex-shrink: 0;
		}
		.desc-info {
			width: 100%;
			margin-left: 24rpx;
			.desc-info-title {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #202127;
				line-height: 44rpx;
				font-style: normal;
			}
			.desc-detail {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #999A9F;
				line-height: 44rpx;
				text-align: left;
				font-style: normal;
				/* 限制在一个块元素内显示的文本的行数 */
				  -webkit-line-clamp: 2;
				  /* 指定在块元素内的基线与块元素顶部的距离 */
				  display: -webkit-box;
				  /* 将对象作为弹性伸缩盒子模型显示 */
				  -webkit-box-orient: vertical;
				  /* 超出部分显示省略号 */
				  overflow: hidden;
				  /* 防止如果内容超出容器宽度，造成溢出 */
				  text-overflow: ellipsis;
			}
			.desc-nums {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #202127;
				line-height: 44rpx;
				text-align: left;
				font-style: normal;
			}	
		}
		.study {
			margin-top: 22rpx;
			background: #6EE0A8;
			color: #ffffff;
			padding: 15rpx 20rpx;
			border-radius: 12rpx;
			text-align: center;
			width: 60%;
		}
		.review-time {
			background: #F4F5F7;
			border-radius: 16rpx;
			padding: 16rpx;
			margin-top: 22rpx;
			.speaker-icon {
				width: 32rpx;
				height: 32rpx;
				flex-shrink: 0;
			}
			.review-label {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #202127;
				line-height: 40rpx;
				text-align: left;
				font-style: normal;
				margin-left: 16rpx;
			}
			.right-arrow-icon {
				width: 24rpx;
				height: 24rpx;
				flex-shrink: 0;
			}
		}
	}
	.content {
		margin-top: 16rpx;
		height: 100%;
		background: #ffffff;
		padding: 0 32rpx 24rpx;
		overflow: hidden;
		.segment-content {
			flex: 1;
			overflow: hidden;
			height: 100%;
			padding-top: 10rpx;
		}
	}
</style>