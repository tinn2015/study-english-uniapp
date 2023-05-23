<template>
	<view>
		<web-view
			:webview-styles="webviewStyles"
			:src="src"
		></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			},
			src: '',
			title: ''
		};
	},
	onLoad (option) {
		const {src, title} = option
		this.src = src
		this.title = title
		console.log('webview', title , src)
	},
	mounted () {
		console.log('mounted')
		uni.setNavigationBarTitle({
			title: this.title
		})
	}
};
</script>

<style></style>
