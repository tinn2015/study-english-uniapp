<template>
	<View
		class="music-wave flex music ai-c jc-c"
	  >
		<View class='item one ml0'></View>
		<View class='item two'></View>
		<View class='item three'></View>
		<View class='item four'></View>
		<View class='item five'></View>
		<!-- <View class='item six'></View>
		<View class='item seven'></View> -->
	  </View>
</template>

<script>
</script>

<style scoped lang="scss">
	.music-wave {
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(175,175,175, 0.5);
		padding: 0 40rpx;
		height: 160rpx;
		border-radius: 16px;
		&.is-cancle {
			background: #f32f2f;
			.item {
				background-color: #fff;
			}
		}
		.item {
			width: 8px;
			border-radius: 6px;
			background-color: rgba(0,0,0,0.7);
			animation-iteration-count: infinite;
			-webkit-animation-iteration-count: infinite;
			animation-direction: alternate;
			-webkit-animation-direction: alternate; 
			margin-left: 20px
		}
		.ml0 {
			margin-left: 0;
		}
		.one {
			height: 20px;
			animation: radius-animation .5s ease infinite;
		}
		.two {
				height: 30px;
				animation: radius-animation .6s ease infinite;
		}
		.three {
				height: 40px;
				animation: radius-animation .7s ease infinite;
		}
		.four {
			height: 50px;
			animation: radius-animation .6s ease infinite;
		}
	
		.five {
			height: 40px;
				animation: radius-animation .5s ease infinite;
		}
	
		// .six {
		// 	height: 30px;
		// 		animation: radius-animation .6s ease infinite;
		// }
		// .seven {
		// 	height: 20px;
		// 		animation: radius-animation .5s ease infinite;
		// }
		@keyframes radius-animation {
			0% {
					height: 70px;
					filter: contrast(2);
			}
			100% {
				height: 20px;
				filter: contrast(2);
			}
		}
	
	}
</style>