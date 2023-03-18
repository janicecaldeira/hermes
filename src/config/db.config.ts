import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv-flow';

import { BrandEntity } from '../common/database/entities/brand.entity';
import { ProductEntity } from '../common/database/entities/product.entity';
import { SellerEntity } from '../common/database/entities/seller.entity';

config({ silent: true });
const configService = new ConfigService();

export default {
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [BrandEntity, ProductEntity, SellerEntity],
  synchronize: configService.get('NODE_ENV') === 'development',
};
