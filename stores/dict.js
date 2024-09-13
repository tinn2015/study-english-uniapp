// stores/counter.js
import { defineStore } from 'pinia';
import { getDictDetail } from '@/utils/dict.js';
import {ref} from 'vue'

export const useDictStore = defineStore('dictStore', {
	state: () => {
		return { 
			dictDetail: {}
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		getDictDetail(id) {
			getDictDetail(id).then((res) => {
				console.log('==单词本详情==', res)
				this.dictDetail = res
			})
		},
		
	},
});
