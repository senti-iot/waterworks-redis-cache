import express from 'express'
import { rClient } from '../../../server.js'
import SHA2 from 'sha2'

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

router.post('/get-data', async (req, res, next) => {
	let data = await rClient.get('data')
	let all = await rClient.getAll();
	console.log(data, all)
	res.status(200).json(data)
})

router.post('/usage', async (req, res, next) => {
	let orgId = req.body.orgId
	let uuids = req.body.uuids
	let period = req.body.period
	console.log(period)
	/**
	  * Create key
	  */
	//Get a string of the period
	let pString = period.from.toString() + period.to.toString()
	console.log(pString)
	//Get the string of uuids from the devices
	let dString = uuids.join('')

	//Generate the string
	let fString = orgId + dString + pString
	let shaString = SHA2['SHA-256'](fString).toString('hex')
	let result = await rClient.jsonGet(shaString)
	console.log(result)
	res.status(200).json(result)
})

export default router