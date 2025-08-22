import { Test, TestingModule } from "@nestjs/testing";
import { CategoryService } from "./category.service";
import { DatabaseService } from "src/database/database.service";

describe("CategoryService", () => {
	let service: CategoryService;
	let db: DatabaseService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CategoryService, DatabaseService],
		}).compile();

		service = module.get<CategoryService>(CategoryService);
		db = module.get<DatabaseService>(DatabaseService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should return array of categories", async () => {
		const categories = await service.findAllCategories();
		expect(Array.isArray(categories)).toBe(true);
	});

	it("should return type of category", async () => {
		const categories = await service.findAllCategories();
		console.log("categories", categories);
		expect(categories).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
				}),
			]),
		);
	});

	afterAll(async () => {
		await db.onModuleDestroy();
	});
});
