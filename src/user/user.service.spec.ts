import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { DatabaseService } from "src/database/database.service";

describe("UserService", () => {
	let service: UserService;
	let db: DatabaseService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, DatabaseService],
		}).compile();

		service = module.get<UserService>(UserService);
		db = module.get<DatabaseService>(DatabaseService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("findAll", () => {
		it("should return an array of users", async () => {
			// const data = jest.spyOn(service, "findAllUsers");
			// console.log("data users", data);
			const users = await service.findAllUsers();
			console.log("data users", users);
		});
	});

	afterAll(async () => {
		await db.onModuleDestroy();
	});
});
