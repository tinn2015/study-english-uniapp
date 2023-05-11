// stores/counter.js
import { defineStore } from 'pinia';
import { getFavoriteDetail } from '@/utils/request.js';
export const useLessonStore = defineStore('lesson', {
	state: () => {
		return { favoriteLessonInfo: {} };
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		async getFavoriteLesson (id) {
			const result = await getFavoriteDetail(id)
			console.log('getFavoriteLesson', result)
			this.favoriteLessonInfo = result
		}
	},
});
