import express from 'express'
import { rClient } from '../../../server.js'
// const express = require('express')
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


export default router