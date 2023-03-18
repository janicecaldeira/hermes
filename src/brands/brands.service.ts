import { Injectable } from '@nestjs/common';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from './repository/brand.repository';
import { CreateBrandSerializer } from './serializers/create-brand.serializer';
import { UpdateBrandSerializer } from './serializers/update-brand.serializer';

@Injectable()
export class BrandsService {
  constructor(private readonly brandRepository: BrandRepository) {}

  findAll(): Promise<BrandEntity[]> {
    return this.brandRepository.findAll();
  }

  findOne(id: number): Promise<BrandEntity | undefined> {
    return this.brandRepository.findOne(id);
  }

  create(data: CreateBrandDto): Promise<CreateBrandSerializer | undefined> {
    return this.brandRepository.create(data);
  }

  update(
    id: number,
    data: UpdateBrandDto,
  ): Promise<UpdateBrandSerializer | undefined> {
    return this.brandRepository.update(id, data);
  }

  remove(id: number) {
    return this.brandRepository.remove(id);
  }
}
