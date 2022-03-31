import { execCronUsage } from './waterworks.js'
import cron from 'node-cron'
import mysqlCon from '../mysql/mysqlCon.js'

const getList = async () => {
	let selectQuery = 'SELECT * from redis'
	// let selectFormat = await mysqlCon.format(selectQuery)
	let selectResult = await mysqlCon.query(selectQuery)
	return selectResult[0]
}

export const runOnceCron = async () => {

	let list = await getList()
	await Promise.all(list.map(l => execCronUsage(l.deviceUuids, l.orgId)))
	// execCronUsage(uuids, orgId)
}

export const runCron = () => {
	cron.schedule("0 5 * * *", async () => {
		console.log('Running CRON Job at 05:00am')
		await runOnceCron()
	})

}
