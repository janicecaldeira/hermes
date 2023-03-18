import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BasicEntity } from './basic.entity';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'brand',
  synchronize: false,
})
@Unique(['name'])
export class BrandEntity extends BasicEntity {
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

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products: ProductEntity[];
}
