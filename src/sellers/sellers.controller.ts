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

import { SellerEntity } from '@/common/database/entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellersService } from './sellers.service';
import { CreateSellerSerializer } from './serializers/create-seller.serializer';
import { UpdateSellerSerializer } from './serializers/update-seller.serializer';
import {
  CREATE_SELLER_400_RESPONSE,
  CREATE_SELLER_OK_RESPONSE,
  DELETE_SELLER_404_RESPONSE,
  DELETE_SELLER_OK_RESPONSE,
  GET_BY_ID_SELLER_404_RESPONSE,
  GET_BY_ID_SELLER_OK_RESPONSE,
  GET_SELLER_OK_RESPONSE,
  PARAM_ID_SELLER,
  UPDATE_SELLER_400_RESPONSE,
  UPDATE_SELLER_404_RESPONSE,
  UPDATE_SELLER_OK_RESPONSE,
} from './swagger/seller.constant';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @ApiOkResponse(GET_SELLER_OK_RESPONSE)
  @Get()
  findAll(): Promise<SellerEntity[]> {
    return this.sellersService.findAll();
  }

  @ApiOkResponse(GET_BY_ID_SELLER_OK_RESPONSE)
  @ApiResponse(GET_BY_ID_SELLER_404_RESPONSE)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<SellerEntity | undefined> {
    return this.sellersService.findOne(+id);
  }

  @ApiOkResponse(CREATE_SELLER_OK_RESPONSE)
  @ApiResponse(CREATE_SELLER_400_RESPONSE)
  @ApiBody({ type: CreateSellerDto })
  @Post()
  create(
    @Body() data: CreateSellerDto,
  ): Promise<CreateSellerSerializer | undefined> {
    return this.sellersService.create(data);
  }

  @ApiOkResponse(UPDATE_SELLER_OK_RESPONSE)
  @ApiResponse(UPDATE_SELLER_400_RESPONSE)
  @ApiResponse(UPDATE_SELLER_404_RESPONSE)
  @ApiParam(PARAM_ID_SELLER)
  @ApiBody({ type: UpdateSellerDto })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateSellerDto,
  ): Promise<UpdateSellerSerializer | undefined> {
    return this.sellersService.update(+id, data);
  }

  @ApiOkResponse(DELETE_SELLER_OK_RESPONSE)
  @ApiResponse(DELETE_SELLER_404_RESPONSE)
  @ApiParam(PARAM_ID_SELLER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(+id);
  }
}
