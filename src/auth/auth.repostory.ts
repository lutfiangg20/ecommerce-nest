import { Injectable, UnauthorizedException } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { DatabaseService } from "src/database/database.service";
import { refreshTokenTable } from "src/database/schema/refreshTokenTable";

@Injectable()
export class AuthRepository {
	constructor(private db: DatabaseService) {}
	async findRefreshToken(userId: number, userAgent: string) {
		const find = await this.db.db
			.select()
			.from(refreshTokenTable)
			.where(
				and(
					eq(refreshTokenTable.userId, userId),
					eq(refreshTokenTable.userAgent, userAgent),
				),
			);

		if (!find[0]) {
			throw new UnauthorizedException();
		}
		return find[0];
	}

	async createRefreshToken(id: number, token: string, userAgent: string) {
		await this.db.db.insert(refreshTokenTable).values({
			userId: id,
			token,
			userAgent,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});
	}

	async deleteRefreshToken(userId: number, userAgent: string) {
		await this.db.db
			.delete(refreshTokenTable)
			.where(
				and(
					eq(refreshTokenTable.userId, userId),
					eq(refreshTokenTable.userAgent, userAgent),
				),
			);
	}
}
