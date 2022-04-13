import dbAPI from '../api/dataBroker.js'
import moment from 'moment'
import { create } from 'apisauce'
import { storeData } from '../redis/waterworks/usage.js'

const timeTables = [
	// //Today
	// {
	// 	from: moment().startOf('d').format('YYYY-MM-DD').format('YYYY-MM-DD'),
	// 	to: moment().endOf('d').format('YYYY-MM-DD').format('YYYY-MM-DD'),
	// },
	// //Yesterday
	// {
	// 	from: moment().subtract(1, 'd').startOf('d').format('YYYY-MM-DD'),
	// 	to: moment().subtract(1, 'd').endOf('d').format('YYYY-MM-DD')
	// },
	// //last 3 days
	// {
	// 	from: moment().subtract(3, 'd').startOf('d').format('YYYY-MM-DD'),
	// 	to: moment().subtract(1, 'd').endOf('d').format('YYYY-MM-DD')
	// },
	// //this week
	{
		from: moment().startOf('week').startOf('day').format('YYYY-MM-DD'),
		to: moment().startOf('day').format('YYYY-MM-DD')
	},
	//last 7 days
	{
		from: moment().subtract(7, 'd').startOf('day').format('YYYY-MM-DD'),
		to: moment().subtract(1, 'd').startOf('day').format('YYYY-MM-DD')
	},
	//this month
	{
		from: moment().startOf('month').endOf('d').format('YYYY-MM-DD'),
		to: moment().startOf('d').format('YYYY-MM-DD')
	},

	// //last 30 days
	{
		from: moment().subtract(30, 'd').startOf('d').format('YYYY-MM-DD'),
		to: moment().subtract(1, 'd').endOf('d').format('YYYY-MM-DD')
	},
	// //last 60 days
	// {
	// 	from: moment().subtract(60, 'd').startOf('d').format('YYYY-MM-DD'),
	// 	to: moment().subtract(1, 'd').endOf('d').format('YYYY-MM-DD')
	// },
	// last 90 days
	{
		from: moment().subtract(90, 'd').startOf('d').format('YYYY-MM-DD'),
		to: moment().subtract(1, 'd').endOf('d').format('YYYY-MM-DD')
	},
	// last year
	{
		from: moment().subtract(1, 'y').startOf('y').format('YYYY-MM-DD'),
		to: moment().startOf('y').format('YYYY-MM-DD')
	}
]
/**
 * Get Benchmark of devices
 */
const getBenchmark = async (orgId, uuids, p) => {

	let response = await dbAPI.get(`/v2/waterworks/data/benchmark/${orgId}/${p.from}/${p.to}`)
	if (response.ok) {
		return response.data
	}
	else {
		console.log('Error getting Benchmark', response)
	}
}
/**
 * Get Min Water Temperature
 */
const getWaterTemperature = async (orgId, uuids, p) => {
	if (uuids) {
		let response = await dbAPI.post(`/v2/waterworks/data/minWTemp/${p.from}/${p.to}`, uuids)
		if (response.ok) {
			return response.data
		}
		else {
			return	console.log('Error getting minWaterTemp', response.ok)
		}
	}
	else {
		let response = await dbAPI.get(`/v2/waterworks/data/minWTemp/${p.from}/${p.to}`)
		if (response.ok) {
			return response.data
		}
		else {
			return console.log('Error getting minWaterTemp', response.ok)
		}
	}
}
/**
 * Get Min Ambient Temperature
 */
const getAmbientTemperature = async (orgId, uuids, p) => {
	if (uuids) {
		let response = await dbAPI.post(`/v2/waterworks/data/minATemp/${p.from}/${p.to}`, uuids)
		if (response.ok) {
			return response.data
		}
		else {
			console.log('Error getting minAmbientTemp', response.ok)
		}
	}
	else {
		let response = await dbAPI.get(`/v2/waterworks/data/minATemp/${p.from}/${p.to}`)
		if (response.ok) {
			return response.data
		}
		else {
			console.log('Error getting minAmbientTemp', response.ok)
		}
	}
}
/**
 * Get Max Flow
 */
const getMaxFlow = async (orgId, uuids, p) => {
	if (uuids) {
		let response = await dbAPI.post(`/v2/waterworks/data/maxFlow/${p.from}/${p.to}`, uuids)
		if (response.ok) {
			return response.data
		}
		else {
			console.log('Error getting maxFlow', response.ok)
		}
	}
	else {
		let response = await dbAPI.get(`/v2/waterworks/data/maxFlow/${p.from}/${p.to}`)
		if (response.ok) {
			return response.data
		}
		else {
			console.log('Error getting maxFlow', response.ok)
		}
	}
}
/**
 * Get Min Flow
 */
const getMinFlow = async (orgId, uuids, p) => {
	if (uuids) {
		let response = await dbAPI.post(`/v2/waterworks/data/minFlow/${p.from}/${p.to}`, uuids)
		if (response.ok) {
			return response.data
		}
		else {
			console.log('Error getting minFlow', response.ok)
		}
	}
	else {
		let response = await dbAPI.get(`/v2/waterworks/data/minFlow/${p.from}/${p.to}`)
		if (response.ok) {
			return response.data
		}
		else {
			console.log('Error getting minFlow', response.ok)
		}
	}
}

const getReading = async (orgId, uuids, p) => {
	if (uuids) {
		let response = await dbAPI.post(`/v2/waterworks/data/volume/${p.from}/${p.to}`, uuids)
		if (response.ok) {
			return response.data
		}
		else {
			console.log('Error getting Volume', response.ok)
		}
	}
	else {
		let response = await dbAPI.get(`/v2/waterworks/data/volume/${p.from}/${p.to}`)
		if (response.ok) {
			return response.data
		}
		else {
			console.log('Error getting Volume', response.ok)
		}
	}
}

const getUsageByDay = async (orgId, uuids, p) => {
	//https://services.senti.cloud/databroker/v2/waterworks/data/totalusagebyday/2021-12-31/2022-03-01
	if (uuids) {
		let response = await dbAPI.post(`/v2/waterworks/data/usagebyday/${p.from}/${p.to}`, uuids)//?
		if (response.ok) {
			return response.data//?
		}
		else {
			response.ok
		}
	}
	else {
		let response = await dbAPI.get(`/v2/waterworks/data/totalusagebyday/${orgId}/${p.from}/${p.to}`)
		if (response.ok) {
			return response.data//?
		}
		else {
			response.ok
		}
	}
}

/**
 * @param uuids List of device UUIDS
 * @param {UUIDv4} orgId Org UUID
 */
export const execCronUsage = async (uuids, orgId, period) => {
	/**
	 * Get the data
	 */
	if (period) {
		/**
		 * Custom request
		 */
		let usageByDate = await getUsageByDay(orgId, uuids, period)
		storeData(uuids, orgId, [{ p: period, data: usageByDate }], 'usage')
	}
	else {
		/**
		 * Store the data in redis
		 */

		// let usagesByDate2 = await Promise.all(timeTables.map(async t => ({ p: t, data: await getUsageByDay(orgId, uuids, t) })))
		let usageGet = async () => {
			let res = []
			for (const t in timeTables) {
				console.log(timeTables[t], t)
				let data = await getUsageByDay(orgId, uuids, timeTables[t])
				res.push({ p: timeTables[t], data: data})
			}
			return res
		}
		let usagesByDate = await usageGet()
		storeData(uuids, orgId, usagesByDate, 'usage')
	}


}

export const execCronBenchmark = async (uuids, orgId, period) => {
	if (period) {
		let benchmark = await getBenchmark(orgId, uuids, period)
		storeData(uuids, orgId, [{ p: period, data: benchmark }], 'benchmark')
	}
	else {
		let benchmarkGet = async () => {
			let res = []
			for (const t in timeTables) {
				let data = await getBenchmark(orgId, uuids, timeTables[t])
				res.push({ p: timeTables[t], data: data })
			}
			return res
		}
		let benchm = await benchmarkGet()
			//  await Promise.all(timeTables.map(async t => ({ p: t, data: await getBenchmark(orgId, uuids, t) })))
		storeData(uuids, orgId, benchm, 'benchmark')
	}
}

export const execCronWaterTemperature = async (uuids, orgId, period) => {
	if (period) {
		let waterTemp = await getWaterTemperature(orgId, uuids, period)
		storeData(uuids, orgId, [{ p: period, data: waterTemp }], 'minWTemp')
	}
	else {
		let minWTempGet = async () => {
			let res = []
			for (const t in timeTables) {
				let data = await getWaterTemperature(orgId, uuids, timeTables[t])
				res.push({ p: timeTables[t], data: data })
			}
			return res
		}
		let waterTemp = await minWTempGet()
			// await Promise.all(timeTables.map(async t => ({ p: t, data: await getWaterTemperature(orgId, uuids, t) })))
		storeData(uuids, orgId, waterTemp, 'minWTemp')
	}
}
export const execCronAmbientTemperature = async (uuids, orgId, period) => {
	if (period) {
		let ambientTemp = await getAmbientTemperature(orgId, uuids, period)
		storeData(uuids, orgId, [{ p: period, data: ambientTemp }], 'minATemp')
	}
	else {
		let minATempGet = async () => {
			let res = []
			for (const t in timeTables) {
				let data = await getAmbientTemperature(orgId, uuids, timeTables[t])
				res.push({ p: timeTables[t], data: data })
			}
			return res
		}
		let ambientTemp = await minATempGet()
			// await Promise.all(timeTables.map(async t => ({ p: t, data: await getAmbientTemperature(orgId, uuids, t) })))
		storeData(uuids, orgId, ambientTemp, 'minATemp')
	}
}
export const execCronMaxFlow = async (uuids, orgId, period) => {
	if (period) {
		let maxFlow = await getMaxFlow(orgId, uuids, period)
		storeData(uuids, orgId, [{ p: period, data: maxFlow }], 'maxFlow')
	}
	else {
		let maxFlowGet = async () => {
			let res = []
			for (const t in timeTables) {
				let data = await getMaxFlow(orgId, uuids, timeTables[t])
				res.push({ p: timeTables[t], data: data })
			}
			return res
		}
		let maxFlow = await maxFlowGet()
			// await Promise.all(timeTables.map(async t => ({ p: t, data: await getMaxFlow(orgId, uuids, t) })))
		storeData(uuids, orgId, maxFlow, 'maxFlow')
	}
}
export const execCronMinFlow = async (uuids, orgId, period) => {
	if (period) {
		let minFlow = await getMinFlow(orgId, uuids, period)
		storeData(uuids, orgId, [{ p: period, data: minFlow }], 'minFlow')
	}
	else {
		let minFlowGet = async () => {
			let res = []
			for (const t in timeTables) {
				let data = await getMinFlow(orgId, uuids, timeTables[t])
				res.push({ p: timeTables[t], data: data })
			}
			return res
		}
		let minFlow = await minFlowGet()
			// await Promise.all(timeTables.map(async t => ({ p: t, data: await getMinFlow(orgId, uuids, t) })))
		storeData(uuids, orgId, minFlow, 'minFlow')
	}
}
export const execCronReading = async (uuids, orgId, period) => {
	if (period) {
		let reading = await getReading(orgId, uuids, period)
		storeData(uuids, orgId, [{ p: period, data: reading }], 'volume')
	}
	else {
		let volumeGet = async () => {
			let res = []
			for (const t in timeTables) {
				let data = await getReading(orgId, uuids, timeTables[t])
				res.push({ p: timeTables[t], data: data })
			}
			return res
		}
		let reading = await volumeGet()
			// await Promise.all(timeTables.map(async t => ({ p: t, data: await getReading(orgId, uuids, t) })))
		storeData(uuids, orgId, reading, 'volume')
	}
}