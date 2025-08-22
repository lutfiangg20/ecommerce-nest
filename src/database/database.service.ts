import "dotenv/config";
import { Injectable } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

@Injectable()
export class DatabaseService {
	public db: ReturnType<typeof drizzle>;
	private pool: Pool;

	constructor() {
		this.pool = new Pool({ connectionString: process.env.DATABASE_URL! });
		this.db = drizzle(this.pool);
	}

	async onModuleDestroy() {
		await this.pool.end();
	}
}
