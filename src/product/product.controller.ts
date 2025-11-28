import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll() {
    const products = await this.productService.findAllProducts();
    return { data: products, message: 'Success' };
  }

  @Post()
  async create(@Body() product: CreateProductDto) {
    await this.productService.create(product);
    return { message: 'Success' };
  }

  @Put(':id')
  async update(@Body() product: UpdateProductDto, @Param('id') id: string) {
    await this.productService.update(product, Number(id));
    return { message: 'Success' };
  }
}
