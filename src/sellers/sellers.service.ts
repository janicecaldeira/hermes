import { Injectable } from '@nestjs/common';

import { SellerEntity } from '@/common/database/entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerRepository } from './repository/seller.repository';
import { CreateSellerSerializer } from './serializers/create-seller.serializer';
import { UpdateSellerSerializer } from './serializers/update-seller.serializer';

@Injectable()
export class SellersService {
  constructor(private readonly sellerRepository: SellerRepository) {}

  findAll(): Promise<SellerEntity[]> {
    return this.sellerRepository.findAll();
  }

  findOne(id: number): Promise<SellerEntity | undefined> {
    return this.sellerRepository.findOne(id);
  }

  create(data: CreateSellerDto): Promise<CreateSellerSerializer | undefined> {
    return this.sellerRepository.create(data);
  }

  update(
    id: number,
    data: UpdateSellerDto,
  ): Promise<UpdateSellerSerializer | undefined> {
    return this.sellerRepository.update(id, data);
  }

  remove(id: number) {
    return this.sellerRepository.remove(id);
  }
}
