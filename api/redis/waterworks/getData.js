import express from 'express'
import { rClient } from '../../../server.js'
import SHA2 from 'sha2'
import { execCronUsage, execCronWaterTemperature, execCronAmbientTemperature, execCronMaxFlow, execCronMinFlow, execCronReading, execCronBenchmark } from '../../../lib/cron/waterworks.js'

const router = express.Router()
// const { authClient } = require('../../server')

// router.all('*', async (req, res, next) => {

// 	let lease = await authClient.getLease(req)
// 	let bearerToken = await authClient.parseBearerToken(req)
// 	if (lease === false) {
// 		res.status(401).json()
// 		return
// 	}
// 	console.log('Authenticated')
// 	req.bearer = bearerToken
// 	req.lease = lease
// 	next()
// })

/**
 * @desc Key Generator
 */

const generateKey = (type, orgId, uuids, period) => {
	let pString = period.from.toString() + period.to.toString()
	let dString = uuids ? uuids.join('') : ""
	let fString = orgId + dString + pString + type
	let shaString = SHA2['SHA-256'](fString).toString('hex')
	return shaString
}

/**
 * @desc Get usage and store it in cache
 * @param req Request
 * @param req.body Request body
 * @param req.body.orgId Org UUID
 * @param req.body.uuids Device UUIDs
 * @param req.body.period Data Period
 * @param req.body.period.from Date from
 * @param req.body.period.to Date to
 */
router.post('/usage', async (req, res, next) => {
	let orgId = req.body.orgId
	let uuids = req.body.uuids
	let period = req.body.period

	let shaString = generateKey('usage', orgId, uuids, period)

	let result = await rClient.jsonGet(shaString)

	if (result === null) {
		await execCronUsage(uuids, orgId, period)
		let result = await rClient.jsonGet(shaString)
		res.status(200).json(result)
	}
	else {
		res.status(200).json(result)
	}
})

/**
 * @desc Get water temperature and store it in cache
 * @param req Request
 * @param req.body Request body
 * @param req.body.orgId Org UUID
 * @param req.body.uuids Device UUIDs
 * @param req.body.period Data Period
 * @param req.body.period.from Date from
 * @param req.body.period.to Date to
 */
router.post('/minwtemp', async (req, res, next) => {
	let orgId = req.body.orgId
	let uuids = req.body.uuids
	let period = req.body.period

	let shaString = generateKey('minWTemp', orgId, uuids, period)

	let result = await rClient.jsonGet(shaString)

	if (result === null) {
		// await execCronUsage(uuids, orgId, period)
		await execCronWaterTemperature(uuids, orgId, period)
		let result = await rClient.jsonGet(shaString)
		res.status(200).json(result)
	}
	else {
		res.status(200).json(result)
	}
})
/**
 * @desc Get ambient temperature and store it in cache
 * @param req Request
 * @param req.body Request body
 * @param req.body.orgId Org UUID
 * @param req.body.uuids Device UUIDs
 * @param req.body.period Data Period
 * @param req.body.period.from Date from
 * @param req.body.period.to Date to
 */
router.post('/minatemp', async (req, res, next) => {
	let orgId = req.body.orgId
	let uuids = req.body.uuids
	let period = req.body.period

	let shaString = generateKey('minATemp', orgId, uuids, period)

	let result = await rClient.jsonGet(shaString)

	if (result === null) {
		await execCronAmbientTemperature(uuids, orgId, period)
		let result = await rClient.jsonGet(shaString)
		res.status(200).json(result)
	}
	else {
		res.status(200).json(result)
	}
})


/**
 * @desc Get max flow and store it in cache
 * @param req Request
 * @param req.body Request body
 * @param req.body.orgId Org UUID
 * @param req.body.uuids Device UUIDs
 * @param req.body.period Data Period
 * @param req.body.period.from Date from
 * @param req.body.period.to Date to
 */
router.post('/maxflow', async (req, res, next) => {
	let orgId = req.body.orgId
	let uuids = req.body.uuids
	let period = req.body.period

	let shaString = generateKey('maxFlow', orgId, uuids, period)

	let result = await rClient.jsonGet(shaString)

	if (result === null) {
		await execCronMaxFlow(uuids, orgId, period)
		let result = await rClient.jsonGet(shaString)
		res.status(200).json(result)
	}
	else {
		res.status(200).json(result)
	}
})

/**
 * @desc Get min flow and store it in cache
 * @param req Request
 * @param req.body Request body
 * @param req.body.orgId Org UUID
 * @param req.body.uuids Device UUIDs
 * @param req.body.period Data Period
 * @param req.body.period.from Date from
 * @param req.body.period.to Date to
 */
router.post('/minflow', async (req, res, next) => {
	let orgId = req.body.orgId
	let uuids = req.body.uuids
	let period = req.body.period

	let shaString = generateKey('minFlow', orgId, uuids, period)

	let result = await rClient.jsonGet(shaString)

	if (result === null) {
		await execCronMinFlow(uuids, orgId, period)
		let result = await rClient.jsonGet(shaString)
		res.status(200).json(result)
	}
	else {
		res.status(200).json(result)
	}
})
/**
 * @desc Get water temperature and store it in cache
 * @param req Request
 * @param req.body Request body
 * @param req.body.orgId Org UUID
 * @param req.body.uuids Device UUIDs
 * @param req.body.period Data Period
 * @param req.body.period.from Date from
 * @param req.body.period.to Date to
 */
router.post('/benchmark', async (req, res, next) => {
	let orgId = req.body.orgId
	let uuids = req.body.uuids
	let period = req.body.period

	let shaString = generateKey('benchmark', orgId, uuids, period)

	let result = await rClient.jsonGet(shaString)

	if (result === null) {
		// await execCronUsage(uuids, orgId, period)
		await execCronBenchmark(uuids, orgId, period)
		let result = await rClient.jsonGet(shaString)
		res.status(200).json(result)
	}
	else {
		res.status(200).json(result)
	}
})
/**
 * @desc Get reading and store it in cache
 * @param req Request
 * @param req.body Request body
 * @param req.body.orgId Org UUID
 * @param req.body.uuids Device UUIDs
 * @param req.body.period Data Period
 * @param req.body.period.from Date from
 * @param req.body.period.to Date to
 */
router.post('/reading', async (req, res, next) => {
	let orgId = req.body.orgId
	let uuids = req.body.uuids
	let period = req.body.period

	let shaString = generateKey('volume', orgId, uuids, period)

	let result = await rClient.jsonGet(shaString)

	if (result === null) {
		await execCronReading(uuids, orgId, period)
		let result = await rClient.jsonGet(shaString)
		res.status(200).json(result)
	}
	else {
		res.status(200).json(result)
	}
})

export default router