// stores/counter.js
import { defineStore } from 'pinia';
import { login, getInviteCode } from '@/utils/request.js';
import {ref} from 'vue'
import { useInviteStore } from '@/stores/invite.js'
export const useLoginStore = defineStore('loginStore', {
	state: () => {
		return { 
			isLogin: false,
			showLoginBtn: false, // 重新登录弹框
			getUserProfileBtnVisible: true ,// 获取
			isIos: false //手机系统 iOS android
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
			if (!uni.getStorageSync('authorization') || !expireTime || expireTime <= now || (now > expireTime && now - expireTime < 3600 * 24 * 1000)) {
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
			 // 获取用户信息
			uni.getUserInfo({
			  provider: 'weixin',
			  success: function (infoRes) {
				console.log(infoRes);
				console.log('用户昵称为：' + infoRes.userInfo.nickName);
			  }
			});
			const inviteStore =  useInviteStore()
			const loginRes = await login(result.code, inviteStore.invitedCode)
			this.setLoginStatus(true)
			console.log('login result', result, loginRes)
			return false
		},
		
		getUserInfo () {
			// 通过 wx.getSetting 查询用户是否已授权头像昵称信息
			uni.getSetting({
			  success (res){
			    if (res.authSetting['scope.userInfo']) {
			      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
			      wx.getUserInfo({
			        success: function(res) {
			          console.log(res.userInfo)
			        }
			      })
			    } else {
			      // 否则，先通过 wx.createUserInfoButton 接口发起授权
			      let button = wx.createUserInfoButton({
			        type: 'text',
			        text: '获取用户信息',
			        style: {
			          left: 10,
			          top: 76,
			          width: 200,
			          height: 40,
			          lineHeight: 40,
			          backgroundColor: '#ff0000',
			          color: '#ffffff',
			          textAlign: 'center',
			          fontSize: 16,
			          borderRadius: 4
			        }
			      })
			      button.onTap((res) => {
			        // 用户同意授权后回调，通过回调可获取用户头像昵称信息
			        console.log(res)
			      })
			    }
			  }
			})
		},
		async getUserProfile () {
			const userProfile = await uni.getUserProfile({
				desc: '用于完善用户信息',
				success: (res) => {
					console.log('userprofile11', res)
				}
			})
			console.log('userProfile', userProfile)
		},
		async getSystemInfo () {
			const systemInfo = await uni.getSystemInfoAsync()
			console.log('systemInfo', systemInfo)
			// this.systemInfo = systemInfo
			if (systemInfo.platform === 'ios') {
				this.isIos = true
			}
		}
	},
});
