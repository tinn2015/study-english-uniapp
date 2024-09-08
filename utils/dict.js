import { request, baseUrl } from './request.js'

/**
 * 单词本列表查询
 */
export const getDictList = async (code) => {
	const result = await request({
		url: '/dict/favorite/query',
		method: 'POST'
	})
	return result
}