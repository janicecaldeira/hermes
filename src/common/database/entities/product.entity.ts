import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';

import { BasicEntity } from './basic.entity';
import { BrandEntity } from './brand.entity';
import { SellerEntity } from './seller.entity';

@Entity({
  name: 'product',
  synchronize: false,
})
@Unique(['name', 'slug'])
export class ProductEntity extends BasicEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  price: number;

  @Column({
    type: 'int',
  })
  brandId: number;

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {
    nullable: false,
    eager: true,
  })
  brand: BrandEntity;

  @Column({
    type: 'int'
  })
  sellerId: number;

  @ManyToOne(() => SellerEntity, (seller) => seller.products, {
    nullable: false,
    eager: true,
  })
  seller: SellerEntity;
}
