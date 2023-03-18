import { TestHelper } from '@/helpers/test.helper';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { Factory } from 'rosie';
import { Repository } from 'typeorm';

import { BrandRepository } from '@/brands/repository/brand.repository';
import { BrandEntity } from '@/common/database/entities/brand.entity';
import { ProductEntity } from '@/common/database/entities/product.entity';
import { SellerEntity } from '@/common/database/entities/seller.entity';
import { SellerRepository } from '@/sellers/repository/seller.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let testHelper: TestHelper;

  let repository: ProductRepository;
  let brandRepository: BrandRepository;
  let sellerRepository: SellerRepository;
  let originalRepository: Repository<ProductEntity>;
  let originalBrandRepository: Repository<BrandEntity>;
  let originalSellerRepository: Repository<SellerEntity>;
  let brand: BrandEntity;
  let brandId: number;
  let seller: SellerEntity;
  let sellerId: number;

  beforeAll(() => {
    testHelper = TestHelper.getInstance();

    return testHelper.initialize();
  });

  afterAll(() => {
    return testHelper.destroy();
  });

  beforeEach(() => {
    originalRepository = testHelper.getRepository(ProductEntity);
    originalBrandRepository = testHelper.getRepository(BrandEntity);
    originalSellerRepository = testHelper.getRepository(SellerEntity);
    repository = new ProductRepository(originalRepository);
    brandRepository = new BrandRepository(originalBrandRepository);
    sellerRepository = new SellerRepository(originalSellerRepository);

    return testHelper.cleanDatabase().then(async () => {
      brand = await Factory.build('brand', {}, { save: true });
      brandId = brand.id;

      seller = await Factory.build('seller', {}, { save: true });
      sellerId = seller.id;
    });
  });

  afterEach(() => {
    return testHelper.cleanDatabase();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('.findAll', () => {
    it('returns empty when there is no records', async () => {
      expect(await repository.findAll()).toBeEmpty();
    });

    it('returns all products', async () => {
      const products = await Promise.all(
        Factory.buildList('product', 3, { brandId, sellerId }, { save: true }),
      );

      const results = await repository.findAll();
      expect(results).toIncludeAllMembers(products);
    });
  });

  describe('.findOne', () => {
    it('throws NotFoundException when id not found', async () => {
      await expect(repository.findOne(123456)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns a product', async () => {
      const product: ProductEntity = await Factory.build<ProductEntity>(
        'product',
        { brandId, sellerId },
        { save: true },
      );
      await Factory.build('product', { brandId, sellerId }, { save: true });

      expect(await repository.findOne(product.id)).toEqual(product);
    });
  });

  describe('.create', () => {
    let properties: CreateProductDto;
    let product: any;

    beforeEach(async () => {
      properties = {
        name: 'Product Test',
        price: '10.00' as unknown as number,
        brandId: brandId,
        sellerId: sellerId,
      };
    });

    it('creates a product', async () => {
      product = await repository.create(properties);
      expect(await originalRepository.count()).toBe(1);
    });

    it('creates product with the right properties', async () => {
      product = await repository.create(properties);
      const reloaded = await repository.findOne(product.id);

      expect(reloaded).toContainKeys(Object.keys(properties));

      expect(reloaded).toContainEntry(['name', properties.name]);
      expect(reloaded).toContainEntry(['price', properties.price]);
      expect(reloaded).toContainEntry(['brandId', properties.brandId]);
      expect(reloaded).toContainEntry(['sellerId', properties.sellerId]);
      expect(reloaded).toContainKeys([
        'id',
        'slug',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ]);
    });

    it('throws a ConflictException when trying to create a duplicate product', async () => {
      const properties = {
        name: 'Product Test',
        price: 10,
        brandId: brandId,
        sellerId: sellerId,
      };

      await repository.create(properties);

      await expect(repository.create(properties)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('.update', () => {
    it('updates a product', async () => {
      const product: ProductEntity = await Factory.build<ProductEntity>(
        'product',
        { brandId, sellerId },
        { save: true },
      );

      const updateResponse = await repository.update(product.id, {
        price: 25,
      });

      const reloaded = await repository.findOne(product.id);

      expect(reloaded).toContainEntry(['price', '25.00']);
      expect(updateResponse).toEqual({ success: true });
    });

    it('throws a NotFoundException when trying to update a not found id', async () => {
      await expect(
        repository.update(10000, {
          price: 25,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('.remove', () => {
    let product: ProductEntity;

    beforeEach(async () => {
      product = await Factory.build<ProductEntity>(
        'product',
        { brandId, sellerId },
        { save: true },
      );
    });

    describe('test setup', () => {
      it('has a single item in database', async () => {
        expect(await originalRepository.count()).toBe(1);
      });

      it('has a single not deleted item', async () => {
        const products = await originalRepository.find({ take: 1, skip: 0 });

        expect(products[0].isDeleted()).toBeFalse();
      });
    });

    it('deletes an existent product', async () => {
      await repository.remove(product.id);

      expect(await repository.exist(product.id)).toBeFalse();
      expect(await originalRepository.count()).toBe(0);
    });

    it('uses soft delete', async () => {
      await repository.remove(product.id);
      expect(await originalRepository.count({ withDeleted: true })).toBe(1);
    });

    it('ignores an inexistent id', async () => {
      await repository.remove(1000000);

      expect(await originalRepository.count({ withDeleted: true })).toBe(1);
    });
  });
});
