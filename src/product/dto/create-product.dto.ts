import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	category_id: number;
}
