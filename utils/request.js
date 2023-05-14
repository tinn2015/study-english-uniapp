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
		return true
	}
	return false
}

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
 * 获取章节信息
 */
export const getSectionDetail = (id) => {
	return request({
		url: `/lesson/section/detail/${id}`,
		method: 'POST'
	})
}