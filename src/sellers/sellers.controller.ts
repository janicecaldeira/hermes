import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { SellerEntity } from '@/common/database/entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellersService } from './sellers.service';
import { CreateSellerSerializer } from './serializers/create-seller.serializer';
import { UpdateSellerSerializer } from './serializers/update-seller.serializer';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get()
  findAll(): Promise<SellerEntity[]> {
    return this.sellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SellerEntity | undefined> {
    return this.sellersService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: CreateSellerDto,
  ): Promise<CreateSellerSerializer | undefined> {
    return this.sellersService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateSellerDto,
  ): Promise<UpdateSellerSerializer | undefined> {
    return this.sellersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(+id);
  }
}
