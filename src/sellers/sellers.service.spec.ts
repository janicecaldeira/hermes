import { Test, TestingModule } from '@nestjs/testing';

import { createMock } from '@golevelup/ts-jest';

import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerRepository } from './repository/seller.repository';
import { SellersService } from './sellers.service';

describe('SellersService', () => {
  let service: SellersService;

  const id = 1;

  const createData: CreateSellerDto = {
    name: 'Test',
  };

  const updateData: UpdateSellerDto = {
    name: 'Test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SellersService,
        {
          provide: getRepositoryToken(SellerRepository),
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

    service = module.get<SellersService>(SellersService);
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
