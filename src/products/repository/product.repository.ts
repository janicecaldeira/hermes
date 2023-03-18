import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductEntity } from '@/common/database/entities/product.entity';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { UpdateProductDto } from '@/products/dto/update-product.dto';
import { CreateProductSerializer } from '@/products/serializers/create-product.serializer';
import { UpdateProductSerializer } from '@/products/serializers/update-product.serializer';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    return await this.repository.find({
      loadRelationIds: true,
    });
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
        loadRelationIds: true,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async create(
    data: CreateProductDto,
  ): Promise<CreateProductSerializer | undefined> {
    try {
      if (await this.nameExists(data.name)) {
        throw new ConflictException('Name already exists');
      }

      const newProduct = this.repository.create(data);

      await this.repository.save(newProduct);

      const product = await this.repository.findOneOrFail({
        where: { id: newProduct.id },
        loadRelationIds: true,
      });

      return product;
    } catch (error) {
      this.throwValidError(error);
    }
  }

  async update(
    id: number,
    data: UpdateProductDto,
  ): Promise<UpdateProductSerializer | undefined> {
    try {
      const product = await this.repository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException({
          message: 'Product not found',
          status: 'PRODUCT_NOT_FOUND',
        });
      }

      if (data.name) {
        if (await this.nameExists(data.name)) {
          throw new ConflictException('Name already exists');
        }
      }

      await this.repository.save(Object.assign(product, data));
      return { success: true };
    } catch (error) {
      this.throwValidError(error);
    }
  }

  async remove(id: number) {
    await this.repository.softDelete({
      id,
    });

    return { sucess: true };
  }

  async nameExists(name: string): Promise<boolean> {
    return (
      (await this.repository
        .createQueryBuilder('product')
        .where('product.name = :name', { name })
        .getCount()) === 1
    );
  }

  async exist(id: number) {
    return await this.repository.exist({
      where: {
        id,
      },
    });
  }

  private throwValidError(error: HttpException | Error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException({
        status: 'INTERNAL_ERROR',
        message: error.message,
      });
    }
  }
}
