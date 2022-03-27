import { createClient } from 'redis'

class RedisClient {
	constructor() {
		this.host = 'localhost';
		this.client = null;
	}
	init() { }
	async connect() {
		this.client = createClient();
		this.client.on('error', err => console.log('REDIS Error:', err))
		this.client.on('connect', ()=> console.log('REDIS Connected'))
		await this.client.connect()
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