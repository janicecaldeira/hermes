import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Logger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { CreateBrandSerializer } from '../serializers/create-brand.serializer';
import { UpdateBrandSerializer } from '../serializers/update-brand.serializer';
import { UpdateBrandDto } from './../dto/update-brand.dto';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectRepository(BrandEntity)
    private repository: Repository<BrandEntity>,
    @Inject(Logger)
    private readonly logger: Logger,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Brand not found');
    }
  }

  async create(
    data: CreateBrandDto,
  ): Promise<CreateBrandSerializer | undefined> {
    try {
      if (await this.nameExists(data.name)) {
        throw new ConflictException('Name already exists');
      }

      const newBrand = this.repository.create(data);

      await this.repository.save(newBrand);

      const brand = await this.repository.findOneOrFail({
        where: { id: newBrand.id },
      });

      return brand;
    } catch (error) {
      this.logger.error('Failed to create brand', error);
      this.throwValidError(error);
    }
  }

  async update(
    id: number,
    data: UpdateBrandDto,
  ): Promise<UpdateBrandSerializer | undefined> {
    if (!(await this.exist(id))) {
      throw new NotFoundException({
        message: 'Brand not found',
        status: 'BRAND_NOT_FOUND',
      });
    }

    try {
      await this.repository.update(
        {
          id,
        },
        data,
      );

      return {
        success: true,
      };
    } catch (error) {
      this.logger.error('Failed to update brand', error);
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
        .createQueryBuilder('brand')
        .where('brand.name = :name', { name })
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
