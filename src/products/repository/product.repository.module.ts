import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsModule } from '@/brands/brands.module';
import { ProductEntity } from '@/common/database/entities/product.entity';
import { SellersModule } from '@/sellers/sellers.module';
import { ProductRepository } from './product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    BrandsModule,
    SellersModule,
  ],
  controllers: [],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class ProductRepositoryModule {}
