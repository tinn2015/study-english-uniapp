<template>
	<view class="ball-pulse flex jc-c ai-c">
		<view class="bot bot-1" :style="{backgroundColor: color || '#58C898'}"></view>
		<view class="bot bot-2" :style="{backgroundColor: color || '#58C898'}"></view>
		<view class="bot bot-3" :style="{backgroundColor: color || '#58C898'}"></view>
		<view class="bot bot-4" :style="{backgroundColor: color || '#58C898'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			color: String
		}
	}
</script>

<style scoped lang="scss">
	.bot-1 {
	        animation: scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
	}
	
	.bot-2 {
	        animation: scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
	}
	
	.bot-3 {
	        animation: scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
	}
	
	.bot-4 {
	        animation: scale 0.75s 0.48s infinite cubic-bezier(.2, .68, .18, 1.08);
	}
	
	.bot {
	        background-color: #58C898;
	        width: 10rpx;
	        height: 10rpx;
	        border-radius: 100%;
	        margin: 10rpx;
	        -webkit-animation-fill-mode: both;
	        animation-fill-mode: both;
	        display: inline-block;
	}
	
	.ball-pulse {
		width: 100%;
		height: 100%
	}
	
	@keyframes scale {  
	  0% {  
	    transform: scale(1);  
	  }  
	 50% {
		 transform: scale(1.5); 
	 } 
	  100% {  
	    transform: scale(1) 
	  }  
	}  
</style>