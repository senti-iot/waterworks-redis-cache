import { createClient } from 'redis'

class RedisClient {
	constructor() {
		this.host = process.env.REDIS_HOST
		this.port = process.env.REDIS_PORT
		this.user = process.env.REDIS_USER
		this.password = process.env.REDIS_PASSWORD
		this.client = null;
	}
	init() { }
	async connect() {
		this.client = createClient({
			url:`redis://${this.user}:${this.password}@${this.host}:${this.port}`
		});
		this.client.on('error', err => console.log('REDIS Error:', err))
		this.client.on('connect', ()=> console.log('REDIS Connected'))
		await this.client.connect()
	}
	async jsonGet(key, path = '$', options) {
		return await this.client.json.get(key, path)
	}
	async jsonSet(key, value, options) {
		return await this.client.json.set(key, '$', value, options)
	}
	async set(key, value, options) {
		return await this.client.set(key, value, options)
	}
	async get(key) {
		return JSON.parse(await this.client.get(key))
	}
	async getAll() {
		await this.client.hGetAll()
	}
}



export default RedisClient