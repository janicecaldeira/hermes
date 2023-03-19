import { Injectable } from '@nestjs/common';

import { ProductEntity } from '@/common/database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FindOptions } from './dto/find-options.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';
import { CreateProductSerializer } from './serializers/create-product.serializer';
import { UpdateProductSerializer } from './serializers/update-product.serializer';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  findAll(query: FindOptions): Promise<ProductEntity[]> {
    return this.productRepository.findAll(query);
  }

  findBySlug(slug: string): Promise<ProductEntity | undefined> {
    return this.productRepository.findBySlug(slug);
  }

  findOne(id: number): Promise<ProductEntity | undefined> {
    return this.productRepository.findOne(id);
  }

  create(data: CreateProductDto): Promise<CreateProductSerializer | undefined> {
    return this.productRepository.create(data);
  }

  update(
    id: number,
    data: UpdateProductDto,
  ): Promise<UpdateProductSerializer | undefined> {
    return this.productRepository.update(id, data);
  }

  remove(id: number) {
    return this.productRepository.remove(id);
  }
}
