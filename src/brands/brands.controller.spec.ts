import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Factory } from 'rosie';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandSerializer } from './serializers/create-brand.serializer';
import { UpdateBrandSerializer } from './serializers/update-brand.serializer';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  let brandListMock: BrandEntity[];
  let firstBrand: BrandEntity;
  let firstId: string;

  const createBrandDto: CreateBrandDto = {
    name: 'Brand 1',
  };

  const updateBrandDto: UpdateBrandDto = {
    name: 'Brand 1',
  };

  beforeAll(async () => {
    brandListMock = await Promise.all(
      Factory.buildList('brand', 10, {}, { created: true }),
    );

    firstBrand = brandListMock[0];
    firstId = String(firstBrand.id);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        {
          provide: BrandsService,
          useValue: {
            findAll: jest.fn().mockReturnValue(brandListMock),
            findOne: jest.fn().mockResolvedValue(firstBrand),
            create: jest.fn().mockResolvedValue(firstBrand),
            update: jest.fn().mockResolvedValue({ success: true }),
            remove: jest.fn().mockReturnValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const response = await controller.findAll();
      expect(response).toEqual(brandListMock);
    });
  });

  describe('findOne', () => {
    it('should return a brand', async () => {
      const response = await controller.findOne(firstId);
      expect(response).toEqual(firstBrand);
    });
  });

  describe('create', () => {
    it('should create a brand', async () => {
      const response: CreateBrandSerializer | undefined =
        await controller.create(createBrandDto);
      expect(response).toEqual(firstBrand);
    });
  });

  describe('update', () => {
    it('should update a brand', async () => {
      const response: UpdateBrandSerializer | undefined =
        await controller.update(firstId, updateBrandDto);

      expect(response).toEqual({ success: true });
    });
  });

  describe('remove', () => {
    it('should return sucessfully', async () => {
      const response = controller.remove(firstId);
      expect(response).toEqual([]);
    });
  });

  describe('remove', () => {
    it('should return a http exception', async () => {
      try {
        jest.spyOn(service, 'remove').mockRejectedValue(
          new InternalServerErrorException({
            message: 'INTERNAL_ERROR',
            status: 'INTERNAL_ERROR',
          }),
        );

        await controller.remove(firstId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('INTERNAL_ERROR');
      }
    });
  });
});
