// stores/counter.js
import { defineStore } from 'pinia';
import { login } from '@/utils/request.js';
import {ref} from 'vue'
export const useLoginStore = defineStore('loginStore', {
	state: () => {
		return { 
			isLogin: false,
			showLoginBtn: false
		};
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
		/**
		 * 判断是否要重新登录
		 * 1. 没有authorization
		 * 2. 还有一天过期或者已经过期
		 */
		checkNeedLogin () {
			const now = new Date().getTime()
			const expireTime = uni.getStorageSync('expireTime')
			if (!uni.getStorageSync('authorization') || !expireTime || expireTime <= now || now - expireTime < 3600 * 24 * 1000) {
				return true
			} else {
				return false
			}
		},
		/**
		 * 修改登录状态
		 */
		setLoginStatus (loginStatus, showLoginBtn = false) {
			if (loginStatus) {
				this.isLogin = true
			} else {
				uni.removeStorageSync('authorization')
				this.isLogin = false
			}
			this.showLoginBtn = showLoginBtn
		},
		
		async login () {
			console.log('login', this)
			const needLogin = this.checkNeedLogin()
			console.log('needLogin', needLogin)
			if (!needLogin) return true
			const result = await uni.login()
			const loginRes = await login(result.code)
			this.setLoginStatus(true)
			console.log('login result', result, loginRes)
		}
	},
});
