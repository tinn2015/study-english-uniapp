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
			if (uni.getStorageSync('authorization')) {
				return true
			} else {
				return false
			}
		},
		async login () {
			console.log('login', this)
			const isLogin = this.checkLogin()
			if (isLogin) return true
			const result = await uni.login()
			const loginRes = await login(result.code)
			console.log('login result', result, loginRes)
		}
	},
});
