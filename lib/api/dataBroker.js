import { create as createAPI} from 'apisauce'
// const createAPI = require('apisauce').create

let token = process.env.SENTI_TOKEN
let dbAPI = createAPI({
	baseURL: process.env.SENTIDATABROKER,
	timeout: 300000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	}
})
dbAPI.addRequestTransform(request => {
	console.log(request.url)
})
const naviMonitor = response => console.log(response.config.url, response.ok)
dbAPI.addMonitor(naviMonitor)
export default dbAPI