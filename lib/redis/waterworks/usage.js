import { rClient } from '../../../server.js'
import SHA2 from 'sha2'



const getData = async () => {

	// await rClient.set('data', JSON.stringify({ usage: 100 }))
	const data = await rClient.get('data')
	console.log(data)
}
/**
 * @param orgId
 * @param uuids
 * @param data
 */
export const storeUsageData = (uuids, orgId, data) => {
	Promise.all(data.map(async d => {
		//Get the period out
		let period = d.p
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

		/**
		 * Store the data
		 */
		// console.log(d)
		await rClient.jsonSet(`${shaString}`, d.data)
		return true
	}))



}
export default getData