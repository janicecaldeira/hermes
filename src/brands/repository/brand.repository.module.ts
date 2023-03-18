import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { BrandRepository } from './brand.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [],
  providers: [BrandRepository],
  exports: [BrandRepository],
})
export class BrandRepositoryModule {}
