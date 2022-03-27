import { execCronUsage } from './waterworks.js'
import cron from 'node-cron'


export const runOnceCron = () => {
	let orgId = 'b6a4c127-8e70-49d1-baf8-b742d89e82c4'
	let uuids = [
		"3eb8ea22-c76d-43c8-9f94-49f0a1983e3e",
		"a5215254-844a-45f5-a1de-12efeb47fdb4",
		"a17263e5-3aab-4816-a41a-f0f72a491fb5"
	]
	execCronUsage(uuids, orgId)
}

export const runCron = () => {


}
