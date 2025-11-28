import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAllCategories();
    return { data: categories, message: 'success' };
  }

  @Post()
  async create(@Body() category: CreateCategoryDto) {
    await this.categoryService.createCategory(category);
    return { message: 'Success' };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    await this.categoryService.updateCategory(category, Number(id));
    return { message: 'Success' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.categoryService.deleteCategory(Number(id));
    return { message: 'Success' };
  }
}
