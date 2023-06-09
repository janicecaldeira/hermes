import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Factory } from 'rosie';

import { ProductEntity } from '@/common/database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FindOptions } from './dto/find-options.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductSerializer } from './serializers/create-product.serializer';
import { UpdateProductSerializer } from './serializers/update-product.serializer';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  let productListMock: ProductEntity[];
  let firstProduct: ProductEntity;
  let firstId: string;
  let slug: string;

  const createProductDto: CreateProductDto = {
    name: 'Test',
    price: 10.0,
    brandId: 1,
    sellerId: 1,
  };

  const updateProductDto: UpdateProductDto = {
    price: 20.0,
  };

  const findOptions: FindOptions = {};

  beforeAll(async () => {
    productListMock = await Promise.all(
      Factory.buildList('product', 10, {}, { created: true }),
    );

    firstProduct = productListMock[0];
    firstId = String(firstProduct.id);
    slug = firstProduct.slug;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockReturnValue(productListMock),
            findBySlug: jest.fn().mockReturnValue(firstProduct),
            findOne: jest.fn().mockResolvedValue(firstProduct),
            create: jest.fn().mockResolvedValue(firstProduct),
            update: jest.fn().mockResolvedValue({ success: true }),
            remove: jest.fn().mockReturnValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const response = await controller.findAll(findOptions);
      expect(response).toEqual(productListMock);
    });
  });

  describe('findBySlug', () => {
    it('should return a product find by slug', async () => {
      const response = await controller.findBySlug(slug);
      expect(response).toEqual(firstProduct);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const response = await controller.findOne(firstId);
      expect(response).toEqual(firstProduct);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const response: CreateProductSerializer | undefined =
        await controller.create(createProductDto);
      expect(response).toEqual(firstProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const response: UpdateProductSerializer | undefined =
        await controller.update(firstId, updateProductDto);

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
