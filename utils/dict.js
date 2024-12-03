import { request, baseUrl } from './request.js'

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
		url: `/dict/notebook/add`,
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
		url: `/dict/notebook/remove`,
		method: 'POST',
		data: {
			word
		}
	})
}

/**
 * 单词本详情查询
 */
export const getDictDetail = async (id) => {
	const result = await request({
		url: `/dict/detail/${id}`,
		method: 'POST'
	})
	return result
}