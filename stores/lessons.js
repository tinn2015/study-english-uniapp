// stores/counter.js
import { defineStore } from 'pinia';
import { getFavoriteDetail, getSectionDetail } from '@/utils/request.js';
export const useLessonStore = defineStore('lesson', {
	state: () => {
		return { 
			lessonInfo: {},
			sectionInfo: {},
			currentSection: {},
			nextSection: {},
			/**
			 * 当前第几章节
			 * 用于学习下一节功能
			 */
			currentSectionIndex: 0,
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
		async getSectionInfo (section, index) {
			const result = await getSectionDetail(section.id)
			console.log('getSectionInfo', result, this.lessonInfo.sections.length)
			this.sectionInfo = result.contexts
			this.currentSection = section
			this.currentSectionIndex = index
			// 记录下一章节
			if (index >= this.lessonInfo.sections.length - 1) {
				// 没有下一章节
				this.nextSection = null
			} else {
				this.nextSection = this.lessonInfo.sections[index + 1]
			}
			console.log('nextSection', this.nextSection, index)
			this.currentSectionFinished = result.displayGetReport === 1
			return true
		},
		/**
		 * 切换当前课程
		 */
		changeCurrentSection () {
			this.currentSection = JSON.parse(JSON.stringify(this.nextSection))
			if (this.currentSectionIndex >= this.lessonInfo.sections.length - 1) {
				// 没有下一章节
				this.nextSection = null
			} else {
				this.nextSection = this.lessonInfo.sections[this.currentSectionIndex + 1]
				this.currentSectionIndex = this.currentSectionIndex + 1
			}
		}
	},
});
