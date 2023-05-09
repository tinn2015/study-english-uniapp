const baseUrl = 'https://api.itso123.com'

const request = ({method = 'GET', url, data}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method,
			data
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

export const login = (code) => {
	return request({
		url: '/user/login',
		data: {
			code
		}
	})
}

export const getLessons = () => {
	return request({})
}