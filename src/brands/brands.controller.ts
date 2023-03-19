import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandSerializer } from './serializers/create-brand.serializer';
import { UpdateBrandSerializer } from './serializers/update-brand.serializer';
import {
  CREATE_BRAND_400_RESPONSE,
  CREATE_BRAND_409_RESPONSE,
  CREATE_BRAND_OK_RESPONSE,
  DELETE_BRAND_404_RESPONSE,
  DELETE_BRAND_OK_RESPONSE,
  GET_BRAND_OK_RESPONSE,
  GET_BY_ID_BRAND_404_RESPONSE,
  GET_BY_ID_BRAND_OK_RESPONSE,
  PARAM_ID_BRAND,
  UPDATE_BRAND_400_RESPONSE,
  UPDATE_BRAND_404_RESPONSE,
  UPDATE_BRAND_409_RESPONSE,
  UPDATE_BRAND_OK_RESPONSE,
} from './swagger/brands.constant';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOkResponse(GET_BRAND_OK_RESPONSE)
  @Get()
  findAll(): Promise<BrandEntity[]> {
    return this.brandsService.findAll();
  }

  @ApiOkResponse(GET_BY_ID_BRAND_OK_RESPONSE)
  @ApiResponse(GET_BY_ID_BRAND_404_RESPONSE)
  @ApiParam(PARAM_ID_BRAND)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<BrandEntity | undefined> {
    return this.brandsService.findOne(+id);
  }

  @ApiOkResponse(CREATE_BRAND_OK_RESPONSE)
  @ApiResponse(CREATE_BRAND_400_RESPONSE)
  @ApiResponse(CREATE_BRAND_409_RESPONSE)
  @ApiBody({ type: CreateBrandDto })
  @Post()
  create(
    @Body() data: CreateBrandDto,
  ): Promise<CreateBrandSerializer | undefined> {
    return this.brandsService.create(data);
  }

  @ApiOkResponse(UPDATE_BRAND_OK_RESPONSE)
  @ApiResponse(UPDATE_BRAND_400_RESPONSE)
  @ApiResponse(UPDATE_BRAND_404_RESPONSE)
  @ApiResponse(UPDATE_BRAND_409_RESPONSE)
  @ApiParam(PARAM_ID_BRAND)
  @ApiBody({ type: UpdateBrandDto })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateBrandDto,
  ): Promise<UpdateBrandSerializer | undefined> {
    return this.brandsService.update(+id, data);
  }

  @ApiOkResponse(DELETE_BRAND_OK_RESPONSE)
  @ApiResponse(DELETE_BRAND_404_RESPONSE)
  @ApiParam(PARAM_ID_BRAND)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
