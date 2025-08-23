import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
	@IsString()
	@IsOptional()
	name: string;

	@IsOptional()
	category_id: number;

	@IsOptional()
	@IsInt()
	price: number;

	@IsOptional()
	@IsInt()
	stock: number;

	@IsOptional()
	@IsString()
	description: string;
}
