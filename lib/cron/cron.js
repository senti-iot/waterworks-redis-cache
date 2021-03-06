import { execCronUsage, execCronBenchmark, execCronWaterTemperature, execCronAmbientTemperature, execCronMaxFlow, execCronMinFlow, execCronReading } from './waterworks.js'
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
	console.log('Getting Usage')
	await Promise.all(list.map(async l => await execCronUsage(l.deviceUuids, l.orgId)))
	console.log('Getting Benchmark')
	await Promise.all(list.map(async l => await execCronBenchmark(l.deviceUuids, l.orgId)))

	console.log("Getting the rest")
	await Promise.all(list.map(async l => {
		if (l.deviceUuids && l.deviceUuids.length > 0) {

				console.log('Getting Wtemp')
				await execCronWaterTemperature(l.deviceUuids, l.orgId)
				console.log('Getting ATemp')
				await execCronAmbientTemperature(l.deviceUuids, l.orgId)
				console.log('Getting maxFlow')
				await execCronMaxFlow(l.deviceUuids, l.orgId)
				console.log('Getting minFlow')
				await execCronMinFlow(l.deviceUuids, l.orgId)
				console.log('Getting Reading')
				await execCronReading(l.deviceUuids, l.orgId)
				console.log('Done Running')

		}
		else return null
	}))


}

export const runCron = () => {
	cron.schedule("0 5 * * *", async () => {
		console.log('Running CRON Job at 05:00am')
		await runOnceCron()
	})

}
