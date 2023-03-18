import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ProductEntity } from '@/common/database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FindOptions } from './dto/find-options.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { CreateProductSerializer } from './serializers/create-product.serializer';
import { UpdateProductSerializer } from './serializers/update-product.serializer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: FindOptions): Promise<ProductEntity[]> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductEntity | undefined> {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: CreateProductDto,
  ): Promise<CreateProductSerializer | undefined> {
    return this.productsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<UpdateProductSerializer | undefined> {
    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
