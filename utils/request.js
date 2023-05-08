const baseUrl = ''

const request = ({method = 'GET'}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: "http://api.itso123.com/lessons",
			method
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

export const getLessons = () => {
	return request({})
}