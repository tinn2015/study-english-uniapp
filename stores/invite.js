// stores/counter.js
import { defineStore } from 'pinia';
import { login, getInviteCode } from '@/utils/request.js';
export const useInviteStore = defineStore('inviteStore', {
	state: () => {
		return { 
			inviteCode: '', // 邀请码
			inviteNum: 0,
			invitedCode: '' // 被邀请的code
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		getInviteCode () {
			getInviteCode().then((res) => {
				console.log('getInviteCode', res)
				this.inviteCode = res.inviteCode
				this.inviteNum = res.inviteCnt
			})
		},
		setInvitedCode (code) {
			this.invitedCode = code
		}
	},
});
