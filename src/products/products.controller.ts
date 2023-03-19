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
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProductEntity } from '@/common/database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FindOptions } from './dto/find-options.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { CreateProductSerializer } from './serializers/create-product.serializer';
import { UpdateProductSerializer } from './serializers/update-product.serializer';
import {
  CREATE_PRODUCT_400_RESPONSE,
  CREATE_PRODUCT_409_RESPONSE,
  CREATE_PRODUCT_OK_RESPONSE,
  DELETE_PRODUCT_404_RESPONSE,
  DELETE_PRODUCT_OK_RESPONSE,
  GET_BY_ID_PRODUCT_404_RESPONSE,
  GET_BY_ID_PRODUCT_OK_RESPONSE,
  GET_BY_SLUG_PRODUCT_404_RESPONSE,
  GET_BY_SLUG_PRODUCT_OK_RESPONSE,
  GET_PRODUCT_OK_RESPONSE,
  PARAM_ID_PRODUCT,
  PARAM_SLUG_PRODUCT,
  UPDATE_PRODUCT_400_RESPONSE,
  UPDATE_PRODUCT_404_RESPONSE,
  UPDATE_PRODUCT_409_RESPONSE,
  UPDATE_PRODUCT_OK_RESPONSE,
} from './swagger/products.constant';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse(GET_PRODUCT_OK_RESPONSE)
  @Get()
  findAll(@Query() query: FindOptions): Promise<ProductEntity[]> {
    return this.productsService.findAll(query);
  }

  @ApiOkResponse(GET_BY_SLUG_PRODUCT_OK_RESPONSE)
  @ApiResponse(GET_BY_SLUG_PRODUCT_404_RESPONSE)
  @ApiParam(PARAM_SLUG_PRODUCT)
  @Get(':slug')
  findBySlug(@Param('slug') slug: string): Promise<ProductEntity | undefined> {
    return this.productsService.findBySlug(slug);
  }

  @ApiOkResponse(GET_BY_ID_PRODUCT_OK_RESPONSE)
  @ApiResponse(GET_BY_ID_PRODUCT_404_RESPONSE)
  @ApiParam(PARAM_ID_PRODUCT)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductEntity | undefined> {
    return this.productsService.findOne(+id);
  }

  @ApiOkResponse(CREATE_PRODUCT_OK_RESPONSE)
  @ApiResponse(CREATE_PRODUCT_400_RESPONSE)
  @ApiResponse(CREATE_PRODUCT_409_RESPONSE)
  @ApiBody({ type: CreateProductDto })
  @Post()
  create(
    @Body() data: CreateProductDto,
  ): Promise<CreateProductSerializer | undefined> {
    return this.productsService.create(data);
  }

  @ApiOkResponse(UPDATE_PRODUCT_OK_RESPONSE)
  @ApiResponse(UPDATE_PRODUCT_400_RESPONSE)
  @ApiResponse(UPDATE_PRODUCT_404_RESPONSE)
  @ApiResponse(UPDATE_PRODUCT_409_RESPONSE)
  @ApiParam(PARAM_ID_PRODUCT)
  @ApiBody({ type: UpdateProductDto })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<UpdateProductSerializer | undefined> {
    return this.productsService.update(+id, data);
  }

  @ApiOkResponse(DELETE_PRODUCT_OK_RESPONSE)
  @ApiResponse(DELETE_PRODUCT_404_RESPONSE)
  @ApiParam(PARAM_ID_PRODUCT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
