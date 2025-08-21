import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { categoriesTable } from "src/database/schema/categoriesTable";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { eq } from "drizzle-orm";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
	constructor(private db: DatabaseService) {}

	async findAllCategories() {
		return await this.db.db.select().from(categoriesTable);
	}

	async createCategory(category: CreateCategoryDto) {
		return await this.db.db.insert(categoriesTable).values(category);
	}

	async updateCategory(category: UpdateCategoryDto, id: number) {
		return await this.db.db
			.update(categoriesTable)
			.set(category)
			.where(eq(categoriesTable.id, id));
	}

	async deleteCategory(id: number) {
		return await this.db.db
			.delete(categoriesTable)
			.where(eq(categoriesTable.id, id));
	}
}
