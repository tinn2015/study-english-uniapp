import {useLoginStore} from '@/stores/login.js'
export const filterFreeLessons = (lessons) => {
	const loginStore = useLoginStore()
	console.log('====loginStore====', loginStore.isIos)
	if (loginStore.isIos && lessons) {
		const freeLessons = lessons.filter((lesson) => lesson.mode !== 2)
		console.log('filterFreeLessons', freeLessons)
		return freeLessons
	}	
	return lessons
}