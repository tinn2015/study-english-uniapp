<template>
	<view class="box">
		<qiun-data-charts type="radar" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script>
	import {
		defineComponent,
		ref,
		nextTick
	} from 'vue'

	export default {
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['radar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					// padding: [5,5,5,5],
					dataLabel: false,
					enableScroll: false,
					legend: {
						show: false,
						position: "right",
						lineHeight: 25
					},
					extra: {
						radar: {
							gridType: "radar",
							gridColor: "#ffffff",
							gridCount: 3,
							opacity: 0.2,
							max: 200,
							labelShow: true,
							border: true
						}
					},
				}
			}
		},
		mounted() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["维度1", "维度2", "维度3", "维度4", "维度5", "维度6"],
						series: [{
								name: "成交量1",
								data: [90, 110, 165, 195, 187, 172]
							},
							{
								name: "成交量2",
								data: [190, 210, 105, 35, 27, 102]
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	}
</script>

<style scoped>
	.box {
		width: 800rpx;
		height: 800rpx
	}
</style>