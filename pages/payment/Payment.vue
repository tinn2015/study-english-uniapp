<template>
	<view class="container flex fd-c ai-c jc-sb">
		<view class="header">
			<Navigator></Navigator>
		</view>
		<view class="content">
			<view class="vip flex jc-sb ai-c" v-for="item in vipList">
				<view class="tip">{{item.tip}}</view>
				<view>
					<view class="title">{{ item.title }}</view>
					<view class="f-gray mt26">{{ item.subTitle }}</view>
					<view class="f-gray">{{ item.desc }}</view>
				</view>
				<view class="price-box flex ai-c"><view class="symbol">￥</view><view class="price">{{item.price}}</view></view>
			</view>
		</view>
		<view class="footer flex-1">
			<view class="btn flex jc-c ai-c">
				<image class="icon-diamond" src="../../static/images/payment/diamond.png" mode=""></image>
				<view>立即开通</view>
			</view>
			<view class="protocol flex ai-c jc-c">
				<label class="radio">
					<radio color="#58C898" value="" />
				</label>
				我已阅读并同意
				<view class="mlr8 link">会员协议</view>
				和
				<view class="link ml8">续费规则</view>
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
	} from 'vue'
	
	const vipList = reactive([
		{
			title: '包月会员',
			subTitle: '不限场景、话题',
			desc: '地道口语发音，随时随地练习英语口语',
			price: '39',
			tip: '免费600分钟/月'
		},
		{
			title: '季度会员',
			subTitle: '不限场景、话题',
			desc: '地道口语发音，随时随地练习英语口语',
			price: '39',
			tip: '免费600分钟/月'
		},
		{
			title: '年度会员',
			subTitle: '不限场景、话题',
			desc: '地道口语发音，随时随地练习英语口语',
			price: '299',
			tip: '享受升级AI课程'
		}
	])
</script>

<style scoped lang="scss">
	.container {
		height: 100vh;
		width: 100vw;
	}
	.header {
		background: #65DBA4;
		min-height: 419rpx;
		width: 100%
	}
	.content {
		padding: 0 32rpx;
		position: relative;
		height: 100%;
		width: 100%;
		margin-top: -120rpx;
		box-sizing: border-box;
		.vip {
			// width: 100%;
			position: relative;
			padding: 48rpx 32rpx 40rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(3,59,8,0.12);
			border-radius: 24rpx;
			&:not(:first-child) {
				margin-top: 32rpx
			}
			.tip {
				position: absolute;
				background: #E97F41;
				border-radius: 0rpx 16rpx 0rpx 16rpx;
				top: 0;
				right: 0;
				padding: 8rpx 12rpx;
				font-size: 20rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			.title {
				// color: linear-gradient(90deg, #FCA877 0%, #C3AB13 100%)
				color: #FCA877
			}
			.mt26 {
				margin-top: 26rpx
			}
			.f-gray {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #999A9F;
			}
			.symbol {
				font-size: 32rpx;
				font-family: DINPro, DINPro;
				font-weight: 400;
				color: #E97F41;
			}
			.price {
				font-size: 60rpx;
				font-family: DINPro, DINPro;
				font-weight: bold;
				color: #E97F41;
			}
		}
	}
	.footer {
		box-sizing: border-box;
		width: 100%;
		padding: 0 40rpx;
		margin-bottom: 60rpx;
		.btn {
			height: 96rpx;
			background: linear-gradient(90deg, #F8E0A0 0%, #FF864F 100%);
			border-radius: 60rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			.icon-diamond {
				width: 38rpx;
				height: 32rpx;
				display: block;
				margin-right: 8rpx;
			}
		}
		.protocol {
			margin-top: 36rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #202127;
			.radio {
				transform:scale(0.7)
			}
			.link {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #E97F41;
			}
		}
		.ml8 {
			margin-left: 8rpx;
		}
		.mlr8 {
			margin: 0 8rpx;
		}
	}
</style>