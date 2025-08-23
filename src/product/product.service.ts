import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { productsTable } from "src/database/schema/productsTable";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-products.dto";
import { eq } from "drizzle-orm";
import { categoriesTable } from "src/database/schema/categoriesTable";

@Injectable()
export class ProductService {
	constructor(private db: DatabaseService) {}
	async findAllProducts() {
		const data = await this.db.db
			.select({
				id: productsTable.id,
				name: productsTable.name,
				category: categoriesTable.name,
				price: productsTable.price,
				stock: productsTable.stock,
				description: productsTable.description,
			})
			.from(productsTable)
			.innerJoin(
				categoriesTable,
				eq(productsTable.category_id, categoriesTable.id),
			);
		return data;
	}

	async create(product: CreateProductDto) {
		return await this.db.db.insert(productsTable).values(product);
	}

	async update(product: UpdateProductDto, id: number) {
		console.log("product update", product);
		return await this.db.db
			.update(productsTable)
			.set(product)
			.where(eq(productsTable.id, id));
	}

	async delete(id: number) {
		return await this.db.db
			.delete(productsTable)
			.where(eq(productsTable.id, id));
	}
}
