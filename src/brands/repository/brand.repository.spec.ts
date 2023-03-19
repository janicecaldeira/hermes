import { ConflictException, NotFoundException } from '@nestjs/common';

import { createMock } from '@golevelup/ts-jest';
import { Logger } from 'nestjs-pino';
import { Factory } from 'rosie';
import { Repository } from 'typeorm';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { TestHelper } from '@/helpers/test.helper';
import { BrandRepository } from './brand.repository';

describe('BrandRepository', () => {
  let repository: BrandRepository;
  let originalRepository: Repository<BrandEntity>;
  let testHelper: TestHelper;
  let logger: Logger;

  beforeAll(() => {
    testHelper = TestHelper.getInstance();

    return testHelper.initialize();
  });

  afterAll(() => {
    return testHelper.destroy();
  });

  beforeEach(() => {
    originalRepository = testHelper.getRepository(BrandEntity);
    logger = createMock<Logger>()
    repository = new BrandRepository(originalRepository, logger);

    return testHelper.cleanDatabase();
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

    it('returns all brands', async () => {
      const brands = await Promise.all(
        Factory.buildList('brand', 3, {}, { save: true }),
      );

      const results = await repository.findAll();
      expect(results).toIncludeAllMembers(brands);
    });
  });

  describe('.findOne', () => {
    it('throws NotFoundException when id not found', async () => {
      await expect(repository.findOne(123456)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns brand', async () => {
      const brand: BrandEntity = await Factory.build(
        'brand',
        {},
        { save: true },
      );
      await Factory.build('brand', {}, { save: true });

      expect(await repository.findOne(brand.id)).toEqual(brand);
    });
  });

  describe('.create', () => {
    const properties = {
      name: 'Brand 1',
    };

    let brand: any;

    it('creates a brand', async () => {
      brand = await repository.create(properties);
      expect(await originalRepository.count()).toBe(1);
    });

    it('creates brand with the right properties', async () => {
      brand = await repository.create(properties);
      const reloadedBrand = await repository.findOne(brand.id);

      expect(reloadedBrand).toContainKeys(Object.keys(properties));

      expect(reloadedBrand).toContainEntry(['name', properties.name]);
      expect(reloadedBrand).toContainKeys([
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ]);
    });

    it('throws a ConflictException when trying to create a duplicate brand', async () => {
      const properties = {
        name: 'Brand 1',
      };

      await repository.create(properties);

      await expect(repository.create(properties)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('.update', () => {
    it('updates a brand', async () => {
      const brand: BrandEntity = await Factory.build(
        'brand',
        {},
        { save: true },
      );

      const updateResponse = await repository.update(brand.id, {
        name: 'Brand 2',
      });

      const reloadedBrand = await repository.findOne(brand.id);

      expect(reloadedBrand).toContainEntry(['name', 'Brand 2']);
      expect(updateResponse).toEqual({ success: true });
    });

    it('throws a NotFoundException when trying to update a not found id', async () => {
      await expect(
        repository.update(10000, {
          name: 'Brand 2',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('.remove', () => {
    let brand: BrandEntity;

    beforeEach(async () => {
      brand = await Factory.build('brand', {}, { save: true });
    });

    describe('test setup', () => {
      it('has a single item in database', async () => {
        expect(await originalRepository.count()).toBe(1);
      });

      it('has a single not deleted item', async () => {
        const brands = await originalRepository.find({ take: 1, skip: 0 });

        expect(brands[0].isDeleted()).toBeFalse();
      });
    });

    it('deletes an existent brand', async () => {
      await repository.remove(brand.id);

      expect(await repository.exist(brand.id)).toBeFalse();
      expect(await originalRepository.count()).toBe(0);
    });

    it('uses soft delete', async () => {
      await repository.remove(brand.id);
      expect(await originalRepository.count({ withDeleted: true })).toBe(1);
    });

    it('ignores an inexistent id', async () => {
      await repository.remove(1000000);

      expect(await originalRepository.count({ withDeleted: true })).toBe(1);
    });
  });
});
