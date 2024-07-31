import { useLoginStore } from '@/stores/login.js'
import { filterFreeLessons } from '@/utils/index.js'
const miniProgram = uni.getAccountInfoSync().miniProgram
console.log('====envVersion====', miniProgram.envVersion, uni.getAccountInfoSync())
const baseUrl = miniProgram.envVersion === 'release' ? 'https://api.itso123.com/v1' : 'https://api.itso123.com/v2'
// const baseUrl = 'https://api.itso123.com/v1'
console.log('====baseUrl====', baseUrl)


const request = ({method = 'GET', url, data}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method,
			data,
			header: {
				authorization: uni.getStorageSync('authorization')
			}
		}).then(result => {
			const {data, statusCode, errMsg} = result
			console.log('result', result, statusCode)
			
			// 登录已过期，请重新登录
			if (data.result === '403' || data.result === '401') {
				console.log('登录过期')
				const loginStore = useLoginStore()
				loginStore.setLoginStatus(false, true)
				reject(data)
			}
			if (statusCode === 500) {
				reject(errMsg)
			} else {
				resolve(data)
			}
		})
	})
	return 
}

export const login = async (code, inviteCode) => {
	const loginResult = await request({
		url: '/user/login',
		data: {
			code,
			inviteCode
		}
	})
	if (loginResult.result === '0') {
		console.log('authorization', loginResult.authorization)
		uni.setStorageSync('authorization', loginResult.authorization)
		uni.setStorageSync('expireTime', new Date().getTime() + (loginResult.expireSec * 1000))
		return true
	}
	return false
}

/**
 * 历史课程（累计学习）列表查询
 */
export const getHistory = async (code) => {
	const result = await request({
		url: '/lesson/history/query',
		method: 'POST'
	})
	result.lessons = filterFreeLessons(result.lessons)
	return result
}

/**
 * 今日学习列表查询
 */
export const getTodayLessons = async (code) => {
	const result = await request({
		url: '/lesson/study/today/query',
		method: 'POST'
	})
	result.lessons = filterFreeLessons(result.lessons)
	return result
}



/**
 * 首页，轻松学
 */
export const getFavorite = async () => {
	const result = await request({
		url: '/lesson/favorite/query',
		method: 'POST'
	})
	result.lessons = filterFreeLessons(result.lessons)
	return result
}

/**
 * 收藏夹（轻松学）的课程详情
 */
export const getFavoriteDetail = (id) => {
	return request({
		url: `/lesson/detail/${id}`,
		method: 'POST'
	})
}

/**
 * 移除课程
 */
export const removeFavoriteCourse = (id) => {
	return request({
		url: `/lesson/favorite/del/${id}`,
		method: 'POST'
	})
}

/**
 * 添加课程
 */
export const addFavoriteCourse = (data) => {
	return request({
		url: `/lesson/favorite/add`,
		method: 'POST',
		data
	})
}

/**
 * 获取章节信息
 */
export const getSectionDetail = (id, lessonId) => {
	return request({
		url: `/lesson/section/detail/${lessonId}/${id}`,
		method: 'POST'
	})
}

/**
 * 发现课程列表查询（全部课程查询）
 */
export const getFindLessons = async (key) => {
	const result = await request({
		url: '/lesson/search/query',
		method: 'POST',
		data: {
			class: key
		}
	})
	result.lessons = filterFreeLessons(result.lessons)
	return result
}

/**
 * 发现课程分类查询（全部课程分类查询）
 */
export const getFindClass = async (key) => {
	return request({
		url: '/lesson/search/class/query',
		method: 'POST'
	})
}

/**
 * 学习页统计、热门广告位查询（累计学习、今日学习、热门）
 */
export const getHomeInfo = () => {
	return request({
		url: '/lesson/study/statistic/query',
		method: 'POST'
	})
}

/**
 * 综合评测分析
 */
export const getReportOverAll = ({lessonId, sectionId}) => {
	return request({
		url: `/report/overall/generate/${lessonId}/${sectionId}`,
		method: 'POST',
		data: {
			lid: lessonId,
			sid: sectionId
		}
	})
}

/**
 * 查看报告
 */
export const getReport = (reportId) => {
	return request({
		url: `/report/query/${reportId}`,
		method: 'POST',
	})
}

/**
 * 报告页，学习效果的评价反馈
 */
export const studyFeedback = ({label, lessonId, reportId, sectionId}) => {
	console.log('studyFeedback', label, lessonId, reportId, sectionId)
	return request({
		url: `/statistics/report/appraise/set`,
		method: 'POST',
		data: {
			label,
			lessonId,
			reportId,
			sectionId
		}
	})
}

/**
 * 获取手机号
 */
export const getPhoneCode = (code) => {
	return request({
		url: `/user/phone/bind?code=${code}`,
		method: 'POST',
		data: {
			code
		}
	})
}

/**
 * 我的页面
 */
export const getMe = () => {
	return request({
		url: `/statistics/me/query`,
		method: 'POST'
	})
}

/**
 * 语速设置
 */
export const setSpeechRate = (speechRate) => {
	return request({
		url: `/user/speech/rate/set`,
		method: 'POST',
		data: {
			speechRate
		}
	})
}

// ============================== 闲聊接口 ===============================

/**
 *  获取历史
 * 	lid: 课程id
 */
export const getChatHistory = (lid, data) => {
	return request({
		url: `/dialog/chat/records/query/${lid}`,
		method: 'POST',
		data
	})
}

/**
 *  文本聊天
 * 
 */
export const sendChatText = (data) => {
	return request({
		url: `/dialog/chat/text/analyse`,
		method: 'POST',
		data
	})
}

/**
 *  语音聊天
 * 
 */
export const getChatAudio = (lid, data) => {
	return request({
		url: `/dialog/chat/voice/analyse/${lid}`,
		method: 'POST',
		data
	})
}

/**
 * 支付页获取商品列表
 */
export const getSales = () => {
	return request({
		url: `/order/sales/query`,
		method: 'POST'
	})
}

/**
 * 创建订单
 */
export const genOrder = (saleNo) => {
	return request({
		url: `/order/pay/create`,
		method: 'POST',
		data: {saleNo}
	})
}

/**
 * 获取课程类型
 * 课程类型[0:跟读，1:对话，2:聊天课程] 
 */
export const getLessonType = (lessonId, sectionId) => {
	return request({
		url: `/lesson/section/detail/${lessonId}/${sectionId}`,
		method: 'POST',
		// data: {saleNo}
	})
}

/**
 * 设置课程类型
 */
export const setLessonMode = (lessonId, mode) => {
	return request({
		url: `/lesson/mode/set/${lessonId}/${mode}`,
		method: 'POST',
		// data: {saleNo}
	})
}

// ================================ 邀请 ===========================
/**
 * 获取邀请码
 */
export const getInviteCode = () => {
	return request({
		url: `/user/invite/info/query`,
		method: 'POST',
	})
}

/**
 * 效验邀请码
 */
export const checkInviteCode = (code) => {
	return request({
		url: `/user/invite/code/check`,
		method: 'POST',
		data: {
			"inviteCode":code
		}
	})
}

/**
 * 获取会员过期时间
 */
export const getVipExpiretime = (code) => {
	return request({
		url: `/user/vip/expire/query`,
		method: 'POST'
	})
}

// ================================ 字典 ===========================

/**
 * 查询提示词
 */
export const getTips = (word) => {
	return request({
		url: `/dict/search/fuzzy`,
		method: 'POST',
		data: {
			word
		}
	})
}

/**
 * 单词查询
 */
export const queryWord = (word) => {
	return request({
		url: `/dict/search/precise`,
		method: 'POST',
		data: {
			word
		}
	})
}

/**
 * 查询历史记录
 */
export const queryWordHistory = (word) => {
	return request({
		url: `/dict/search/logs/query`,
		method: 'POST',
		data: {
			page: 1 //分页时使用，默认1为第1页
		}
	})
}

/**
 * 搜藏单词
 */
export const queryWordAddCollect = (word) => {
	return request({
		url: `/dict/favorite/add`,
		method: 'POST',
		data: {
			word
		}
	})
}

/**
 * 取消单词搜藏
 */
export const queryWordRemoveCollect = (word) => {
	return request({
		url: `/dict/favorite/remove`,
		method: 'POST',
		data: {
			word
		}
	})
}