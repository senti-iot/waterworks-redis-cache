import dbAPI from '../api/dataBroker.js'
import moment from 'moment'
import { create } from 'apisauce'
import { storeUsageData } from '../redis/waterworks/usage.js'

const timeTables = [
	// //Today
	// {
	// 	from: moment().startOf('d').format('YYYY-MM-DD'),
	// 	to: moment().endOf('d').format('YYYY-MM-DD'),
	// },
 	// //Yesterday
	// {
	// 	from: moment().subtract(1, 'd').startOf('d'),
	// 	to: moment().subtract(1, 'd').endOf('d')
	// },
	// //last 3 days
	// {
	// 	from: moment().subtract(3, 'd').startOf('d'),
	// 	to: moment().subtract(3, 'd').endOf('d')
	// },
	//last 7 days
	{
		from: moment().subtract(7, 'd').startOf('d').format('YYYY-MM-DD'),
		to: moment().subtract(1, 'd').endOf('d').format('YYYY-MM-DD')
	},
	//last 30 days
	{
		from: moment().subtract(30, 'd').startOf('d').format('YYYY-MM-DD'),
		to: moment().subtract(1, 'd').endOf('d').format('YYYY-MM-DD')
	},
	// //last 60 days
	// {
	// 	from: moment().subtract(60, 'd').startOf('d'),
	// 	to: moment().subtract(60, 'd').endOf('d')
	// },
	// //last 90 days
	// {
	// 	from: moment().subtract(90, 'd').startOf('d'),
	// 	to: moment().subtract(90, 'd').endOf('d')
	// },
	// //last year
	// {
	// 	from: moment().startOf('y'),
	// 	to: moment().subtract(1,'y').startOf('y')
	// }
]

const getUsageByDay = async (uuids, p) => {
	//https://services.senti.cloud/databroker/v2/waterworks/data/totalusagebyday/2021-12-31/2022-03-01
	let response = await dbAPI.post(`/v2/waterworks/data/usagebyday/${p.from}/${p.to}`, uuids)//?
	console.log(response.ok, response.data)
	if (response.ok) {
		return response.data//?
	}
	else {
		response.ok
	}
}
/**
 * @param uuids List of device UUIDS
 * @param {UUIDv4} orgId Org UUID
 */
export const execCronUsage = async (uuids, orgId) => {
	/**
	 * Get the data
	 */
	let usagesByDate = await Promise.all(timeTables.map(async t => ({ p: t, data: await getUsageByDay(uuids, t) })))
	/**
	 * Store the data in redis
	 */
	console.log(usagesByDate)
	storeUsageData(uuids, orgId, usagesByDate)

}
