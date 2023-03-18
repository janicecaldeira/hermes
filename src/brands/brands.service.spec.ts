import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { createMock } from '@golevelup/ts-jest';

import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from './repository/brand.repository';

describe('BrandsService', () => {
  let service: BrandsService;

  const id = 1;

  const createData: CreateBrandDto = {
    name: 'Test',
  };

  const updateData: UpdateBrandDto = {
    name: 'Test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(BrandRepository),
          useValue: {
            findAll: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', async () => {
      const response = service.findAll();
      expect(response).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', async () => {
      const response = service.findOne(id);
      expect(response).toBeDefined();
    });
  });

  describe('create', () => {
    it('should be defined', async () => {
      const response = service.create(createData);
      expect(response).toBeDefined();
    });
  });

  describe('update', () => {
    it('should be defined', async () => {
      const response = service.update(id, updateData);
      expect(response).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should be defined', async () => {
      const response = service.remove(id);
      expect(response).toBeDefined();
    });
  });
});
