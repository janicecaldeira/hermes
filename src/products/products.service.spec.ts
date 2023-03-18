import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { createMock } from '@golevelup/ts-jest';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ProductRepository } from './repository/product.repository';

describe('ProductsService', () => {
  let service: ProductsService;

  const id = 1;

  const createData: CreateProductDto = {
    name: 'Test',
    price: 10.0,
    brandId: 1,
    sellerId: 1,
  };

  const updateData: UpdateProductDto = {
    price: 20.0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductRepository),
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

    service = module.get<ProductsService>(ProductsService);
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
