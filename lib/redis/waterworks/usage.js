import { rClient } from '../../../server.js'
import SHA2 from 'sha2'
import moment from 'moment'


const getData = async () => {

	// await rClient.set('data', JSON.stringify({ usage: 100 }))
	const data = await rClient.get('data')
	// console.log(data)
}

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
 * @param orgId
 * @param uuids
 * @param data
 */
export const storeData = (uuids, orgId, data, type) => {
	console.log('Storing Data')
	Promise.all(data.map(async d => {
		// console.log(d)
		let shaString = generateKey(type, orgId, uuids, d.p)
		console.log(shaString)
		await rClient.jsonSet(`${shaString}`, d.data)
		return true
	}))
}
export default getData