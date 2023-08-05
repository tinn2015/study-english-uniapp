export const shareMenu = () => {
	uni.showShareMenu({
	  withShareTicket: true,
	  menus: ['shareAppMessage', 'shareTimeline']
	})
}