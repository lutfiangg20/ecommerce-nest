import "dotenv/config";
import { Injectable } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

@Injectable()
export class DatabaseService {
	public db: ReturnType<typeof drizzle>;

	constructor() {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
		this.db = drizzle(pool);
	}
}
