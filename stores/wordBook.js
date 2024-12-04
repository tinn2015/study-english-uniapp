// stores/counter.js
import { defineStore } from 'pinia';
import { getWordBookList, getWordBook } from '@/utils/wordBook.js';
import {ref} from 'vue'

export const useWordBookStore = defineStore('wordBookStore', {
	state: () => {
		return { 
			wordBooklist: {},
			wordBookDetail: {}
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		getWordBookList() {
			getWordBookList().then((res) => {
				console.log('==单词本列表==', res)
				this.wordBooklist = res.lessons
			})
		},
		getWordBook(id) {
			getWordBook(id).then(res => {
				console.log('==获取单词本详情==', res)
				this.wordBookDetail = res
			})
		}
	},
});
