import { Module } from '@nestjs/common';

import { SellerRepositoryModule } from './repository/seller.repository.module';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  imports: [SellerRepositoryModule],
  providers: [SellersService],
  controllers: [SellersController],
})
export class SellersModule {}
