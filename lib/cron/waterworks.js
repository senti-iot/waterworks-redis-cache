import dbAPI from '../api/dataBroker.js'
import moment from 'moment'
import { create } from 'apisauce'
import { storeUsageData } from '../redis/waterworks/usage.js'

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
		storeUsageData(uuids, orgId, [{ p: period, data: usageByDate }])
	}
	else {
		/**
		 * Store the data in redis
		 */
		let usagesByDate = await Promise.all(timeTables.map(async t => ({ p: t, data: await getUsageByDay(orgId, uuids, t) })))
		storeUsageData(uuids, orgId, usagesByDate)
	}


}
