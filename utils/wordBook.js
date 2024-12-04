import { request, baseUrl } from './request.js'

// ================================ 单词本 ===========================

/**
 * 单词本列表查询
 */
export const getWordBookList = async () => {
	const result = await request({
		url: '/lesson/favorite/query',
		method: 'POST',
		data: {
			mode: [3] // 3: 单词本课程查询
		}
	})
	return result
}

/**
 * 获取单词本的详情
 * 单词本查询，包含第一页单词
 * 已学单词、未学单词、已牢记单词3个类目
 */
export const getWordBook = async (id) => {
	const result = await request({
		url: `/dict/detail/${id}`,
		method: 'POST',
	})
	return result
}

/**
 * 指定类目单词分页查询
 * 已学单词、未学单词、已牢记单词3个类目
 */
export const getWordsByClass = async () => {
	const result = await request({
		url: '/dict/words/query',
		method: 'POST',
	})
	return result
}