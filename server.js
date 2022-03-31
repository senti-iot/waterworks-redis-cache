#!/usr/bin/env nodejs
process.title = "senti_service"
import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { sentiAuthClient,sentiAclBackend,sentiAclClient, } from 'senti-apicore'
import path, { dirname } from 'path';



let dotenv = config()
// const dotenv = require('dotenv').config()
if (dotenv.error) {
	console.warn(dotenv.error)
}
// const express = require('express')
// const cors = require('cors')
// const helmet = require('helmet')
const app = express()


// ACL Client

// const sentiAuthClient = require('senti-apicore').sentiAuthClient
export const authClient = new sentiAuthClient(process.env.AUTHCLIENTURL, process.env.PASSWORDSALT)


// const sentiAclBackend = require('senti-apicore').sentiAclBackend
// const sentiAclClient = require('senti-apicore').sentiAclClient

const aclBackend = new sentiAclBackend(process.env.ACLBACKENDTURL)
export const aclClient = new sentiAclClient(aclBackend)
// module.exports.aclClient = aclClient

// API Request Parsers

const port = process.env.NODE_PORT || 3007

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// API Endpoints
// import auth from "./api/auth/auth.js"
import wsData from './api/redis/waterworks/getData.js'
// console.log(auth)
// // const auth = require('./api/auth/auth')
app.use([wsData])

//Redis
import client from "./lib/redis/redisCon.js"
console.log(await client)
export const rClient = new client()


//---Start the express server---------------------------------------------------
import printRoutes from './lib/printRoutes.js'
import getData from './lib/redis/waterworks/usage.js'
import { runOnceCron, runCron } from './lib/cron/cron.js'
// var printRoutes = require('./lib/printRoutes')

const startServer = async () => {
	// console.clear()
	// const appDir = dirname(require.main.filename);
	printRoutes(app)
	await rClient.connect()
	// await getData()

	await runOnceCron()
	await runCron()

	app.listen(port, () => {
		console.log('Senti Service started on port', port)
	}).on('error', (err) => {
		if (err.errno === 'EADDRINUSE') {
			console.log('Service not started, port ' + port + ' is busy')
		} else {
			console.log(err)
		}
	})
}

await startServer()
console.log('Node version', process.version)
// await client.set('key', 'value', {
// 	EX: 10,
// 	NX: true
// })
// await client.hGetAll('key') // { field1: 'value1', field2: 'value2' }
