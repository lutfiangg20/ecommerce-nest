import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { usersTable } from "src/database/schema/usersTable";
import { hash } from "argon2";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { eq } from "drizzle-orm";

@Injectable()
export class UserService {
	constructor(private db: DatabaseService) {}
	async findAllUsers() {
		return await this.db.db
			.select({
				id: usersTable.id,
				name: usersTable.name,
				email: usersTable.email,
			})
			.from(usersTable);
	}

	async findUserByEmail(email: string) {
		const data = await this.db.db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (!data[0]) {
			throw new UnauthorizedException();
		}
		return data[0];
	}

	async createUser(user: CreateUserDto) {
		const hashedPassword = await hash(user.password);
		await this.db.db.insert(usersTable).values({
			name: user.name,
			email: user.email,
			password: hashedPassword,
		});
	}

	async updateUser(id: number, user: UpdateUserDto) {
		const data = { ...user };
		if (user.password) {
			const hashedPassword = await hash(user.password);
			data.password = hashedPassword;
		}

		return await this.db.db
			.update(usersTable)
			.set(data)
			.where(eq(usersTable.id, id));
	}

	async deleteUser(id: number) {
		return await this.db.db.delete(usersTable).where(eq(usersTable.id, id));
	}
}
