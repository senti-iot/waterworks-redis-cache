import { rClient } from '../../../server.js'
import crypto from 'crypto'




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
export const storeUsageData = (orgId, uuids, data) => {
	Promise.all(data.map(d => {
		//Get the period out
		let period = d.p
		console.log(period)
		let pString = period.from.toString() + period.to.toString()
		console.log(pString)
		/**
	 	* Create key
	 	*/
		let shaString = SHA2['SHA-256'](orgId+JSON.stringify(uuids)).toString('hex')

		return true
	}))



}
export default getData