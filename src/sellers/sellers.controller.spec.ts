import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Factory } from 'rosie';

import { SellerEntity } from '@/common/database/entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';
import { CreateSellerSerializer } from './serializers/create-seller.serializer';
import { UpdateSellerSerializer } from './serializers/update-seller.serializer';

describe('SellersController', () => {
  let controller: SellersController;
  let service: SellersService;

  let sellerListMock: SellerEntity[];
  let firstSeller: SellerEntity;
  let firstId: string;

  const createSellerDto: CreateSellerDto = {
    name: 'Seller 1',
  };

  const updateSellerDto: UpdateSellerDto = {
    name: 'Seller 1',
  };

  beforeAll(async () => {
    sellerListMock = await Promise.all(
      Factory.buildList('seller', 10, {}, { created: true }),
    );

    firstSeller = sellerListMock[0];
    firstId = String(firstSeller.id);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellersController],
      providers: [
        {
          provide: SellersService,
          useValue: {
            findAll: jest.fn().mockReturnValue(sellerListMock),
            findOne: jest.fn().mockResolvedValue(firstSeller),
            create: jest.fn().mockResolvedValue(firstSeller),
            update: jest.fn().mockResolvedValue({ success: true }),
            remove: jest.fn().mockReturnValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<SellersController>(SellersController);
    service = module.get<SellersService>(SellersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of sellers', async () => {
      const response = await controller.findAll();
      expect(response).toEqual(sellerListMock);
    });
  });

  describe('findOne', () => {
    it('should return a seller', async () => {
      const response = await controller.findOne(firstId);
      expect(response).toEqual(firstSeller);
    });
  });

  describe('create', () => {
    it('should create a seller', async () => {
      const response: CreateSellerSerializer | undefined =
        await controller.create(createSellerDto);
      expect(response).toEqual(firstSeller);
    });
  });

  describe('update', () => {
    it('should update a seller', async () => {
      const response: UpdateSellerSerializer | undefined =
        await controller.update(firstId, updateSellerDto);

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
