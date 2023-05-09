// stores/counter.js
import { defineStore } from 'pinia';
import { login } from '@/utils/request.js';
export const useLoginStore = defineStore('counter', {
	state: () => {
		return { isLogin: false };
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		checkLogin() {
			return false
		},
		async login () {
			const result = await uni.login()
			const loginRes = login(result.code)
			console.log('login result', result, loginRes)
		}
	},
});
