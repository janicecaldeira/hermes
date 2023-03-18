import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SellerEntity } from '@/common/database/entities/seller.entity';
import { SellerRepository } from './seller.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity])],
  controllers: [],
  providers: [SellerRepository],
  exports: [SellerRepository],
})
export class SellerRepositoryModule {}
