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
	await Promise.all(list.map(l => execCronUsage(l.deviceUuids, l.orgId)))
	console.log('Getting Benchmark')
	await Promise.all(list.map(l => execCronBenchmark(l.deviceUuids, l.orgId)))

	await Promise.all(list.map(async l => {
		if (l.deviceUuids && l.deviceUuids.length > 0) {
			console.log('Getting WTemp')
			await Promise.all(list.map(l => execCronWaterTemperature(l.deviceUuids, l.orgId)))
			console.log('Getting ATemp')
			await Promise.all(list.map(l => execCronAmbientTemperature(l.deviceUuids, l.orgId)))
			console.log('Getting maxFlow')
			await Promise.all(list.map(l => execCronMaxFlow(l.deviceUuids, l.orgId)))
			console.log('Getting minFlow')
			await Promise.all(list.map(l => execCronMinFlow(l.deviceUuids, l.orgId)))
			console.log('Getting Reading')
			await Promise.all(list.map(l => execCronReading(l.deviceUuids, l.orgId)))
			console.log('Done Running')
		}
	}))


}

export const runCron = () => {
	cron.schedule("0 5 * * *", async () => {
		console.log('Running CRON Job at 05:00am')
		await runOnceCron()
	})

}
