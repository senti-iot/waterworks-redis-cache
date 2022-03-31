import express from 'express'
import { rClient } from '../../../server.js'
import SHA2 from 'sha2'
import { execCronUsage } from '../../../lib/cron/waterworks.js'

const router = express.Router()

router.get('/', (req, res) => {
	res.status(200).json({message: "WRC running"})
})

export default router