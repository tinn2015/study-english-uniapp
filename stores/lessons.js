// stores/counter.js
import { defineStore } from 'pinia';
import { getFavoriteDetail, getSectionDetail } from '@/utils/request.js';
export const useLessonStore = defineStore('lesson', {
	state: () => {
		return { 
			lessonInfo: {},
			sectionInfo: {},
			currentSection: {},
			// 当前章节是否完成
			currentSectionFinished: false
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		async getFavoriteLesson (id) {
			const result = await getFavoriteDetail(id)
			console.log('getFavoriteLesson', result)
			this.lessonInfo = result
		},
		async getSectionInfo (section) {
			const result = await getSectionDetail(section.id)
			console.log('getSectionInfo', result)
			this.sectionInfo = result.contexts
			this.currentSection = section
			this.currentSectionFinished = result.displayGetReport === 1
			return true
		},
	},
});
