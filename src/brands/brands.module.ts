import { Module } from '@nestjs/common';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandRepositoryModule } from './repository/brand.repository.module';

@Module({
  imports: [BrandRepositoryModule],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
