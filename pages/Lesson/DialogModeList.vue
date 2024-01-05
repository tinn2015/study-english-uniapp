<template>
	<view>
		<view v-for="(paragraph, index) in sectionInfo">
			<view class="paragraph-active flex fd-c jc-sb ai-c" v-if="(paragraph.id === currentParagraph.id)">
				<image class="paragraph-avatar" :src="paragraph.headPic" mode=""></image>
				<view class="sentence text-center">{{paragraph.sentence}}</view>
				<view class="translation text-center">{{paragraph.translation}}</view>
				<view class="handles flex jc-c ai-c">
					<view v-if="isRecording" @click="stopRecord" class="wave-box flex fd-c ai-c">
						<!-- 正在录音中。。。 -->
						<view class="wave-label">点击结束录音</view>
						<view class="wave"></view>
					</view>
					<view v-else class="flex jc-c ai-c">
						<view class="btn">
							<image @click="stopAudio()" v-if="audioPlaying" class="icon-mini"
								src="http://api.itso123.com/image/audio-stop.png" mode=""></image>
							<image @click="playAudio(paragraph.sentenceUrl)" v-else class="icon-mini"
								src="http://api.itso123.com/image/audio-player.png" mode=""></image>
						</view>
						<view class="btn btn-mid" v-show="index > 0" @click="record">
							<image class="icon" src="http://api.itso123.com/image/mic.png" mode=""></image>
						</view>
						<!-- 有结果按钮 -->
						<view v-if="parseInt(paragraph.score) && index > 0" class="btn result">
							<ToolTip  :content="paragraph.result ? paragraph.result.tips : ''" :show="paragraph.tipShow || false" @close="toolTipClose">
									<view class="emoji-box" @click="playSelfAudio(paragraph.result || paragraph)">
										<view class="result-good result-label flex jc-c ai-c" v-if="parseInt(paragraph.score) && parseInt(paragraph.score) >= 80">{{parseInt(paragraph.score)}}</view>
										<view class="result-bad result-label flex jc-c ai-c" v-if="parseInt(paragraph.score) && parseInt(paragraph.score) < 60">
											<image class="result-bad-mask" src="http://api.itso123.com/image/bad-mask.png" mode=""></image>
										</view>
										<view class="result-normal result-label flex jc-c ai-c" v-else>{{parseInt(paragraph.score)}}</view>
									</view>
							</ToolTip>
							<view class="icon-box flex jc-c ai-c">
								<image class="result-icon-mini default-icon" src="http://api.itso123.com/image/smile-face.png" mode="">
								</image>
							</view>
						</view>
						<!-- 默认时按钮 -->
						<view v-else-if="index > 0" class="result-default flex jc-c ai-c">
							<image class="result-icon-mini" src="http://api.itso123.com/image/i.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="paragraph flex fd-c jc-sb ai-c" v-else @click="changeParagraph(paragraph, index)">
				<view class="text-center">{{paragraph.sentence}}</view>
				<view class="mt16 paragraph-translate">{{paragraph.translation}}</view>
				<view class="triangle" v-if="paragraph.score !== ''"  :style="{'borderTopColor': parseInt(paragraph.score) > 80 ? '#207340' : parseInt(paragraph.score) < 60 ? '#FF0000' : '#E5860C'}"></view>
				<view v-if="paragraph.score !== ''" class="triangle-label" >{{ parseInt(paragraph.score) }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style>
</style>