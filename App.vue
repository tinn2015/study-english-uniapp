<script>
	import { useInviteStore } from '@/stores/invite.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			
			const inviteStore = useInviteStore()
			inviteStore.getInviteCode()
			
			// uni.onShareAppMessage(res) {
			// 	// if (res.from === 'button') {// 来自页面内分享按钮
			// 	//   console.log(res.target)
			// 	// }
			// 	return {
			// 	  title: '我的AI外教1对1，就在“开口说”',
			// 	  path: 'pages/tabBar/home/Home',
			// 	  imageUrl: 'https://api.itso123.com/image/share-poster.png'
			// 	}
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>q
