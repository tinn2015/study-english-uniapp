import { useLoginStore } from '@/stores/login.js'
const baseUrl = 'https://api.itso123.com/v1'

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

export const login = async (code) => {
	const loginResult = await request({
		url: '/user/login',
		data: {
			code
		}
	})
	if (loginResult.result === '0') {
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
	return request({
		url: '/lesson/history/query',
		method: 'POST'
	})
}

/**
 * 今日学习列表查询
 */
export const getTodayLessons = async (code) => {
	return request({
		url: '/lesson/study/today/query',
		method: 'POST'
	})
}



/**
 * 首页，轻松学
 */
export const getFavorite = () => {
	return request({
		url: '/lesson/favorite/query',
		method: 'POST'
	})
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
export const getFindLessons = (key) => {
	return request({
		url: '/lesson/search/query',
		method: 'POST',
		data: {
			class: key
		}
	})
}

/**
 * 发现课程分类查询（全部课程分类查询）
 */
export const getFindClass = (key) => {
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

export const getPhoneCode = (code) => {
	return request({
		url: `/user/phone/bind?code=${code}`,
		method: 'POST',
		data: {
			code
		}
	})
}