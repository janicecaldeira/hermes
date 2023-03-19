import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Logger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { SellerEntity } from '@/common/database/entities/seller.entity';
import { CreateSellerDto } from '../dto/create-seller.dto';
import { CreateSellerSerializer } from '../serializers/create-seller.serializer';
import { UpdateSellerSerializer } from '../serializers/update-seller.serializer';
import { UpdateSellerDto } from './../dto/update-seller.dto';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectRepository(SellerEntity)
    private repository: Repository<SellerEntity>,
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
      throw new NotFoundException('Seller not found');
    }
  }

  async create(
    data: CreateSellerDto,
  ): Promise<CreateSellerSerializer | undefined> {
    try {
      const newSeller = this.repository.create(data);

      await this.repository.save(newSeller);

      const seller = await this.repository.findOneOrFail({
        where: { id: newSeller.id },
      });

      return seller;
    } catch (error) {
      this.logger.error('Failed to create seller', error);
      this.throwValidError(error);
    }
  }

  async update(
    id: number,
    data: UpdateSellerDto,
  ): Promise<UpdateSellerSerializer | undefined> {
    if (!(await this.exist(id))) {
      throw new NotFoundException({
        message: 'Seller not found',
        status: 'SELLER_NOT_FOUND',
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
      this.logger.error('Failed to update seller', error);
      this.throwValidError(error);
    }
  }

  async remove(id: number) {
    await this.repository.softDelete({
      id,
    });

    return { sucess: true };
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
