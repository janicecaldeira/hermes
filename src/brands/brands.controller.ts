import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandSerializer } from './serializers/create-brand.serializer';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { BrandsService } from './brands.service';
import { UpdateBrandSerializer } from './serializers/update-brand.serializer';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll(): Promise<BrandEntity[]> {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BrandEntity | undefined> {
    return this.brandsService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: CreateBrandDto,
  ): Promise<CreateBrandSerializer | undefined> {
    return this.brandsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateBrandDto,
  ): Promise<UpdateBrandSerializer | undefined> {
    return this.brandsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
