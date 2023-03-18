import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'seller',
  synchronize: false,
})
export class SellerEntity extends BasicEntity {
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

  @OneToMany(() => ProductEntity, (product) => product.seller)
  products: ProductEntity[];
}
