import { NotFoundException } from '@nestjs/common';

import { createMock } from '@golevelup/ts-jest';
import { Logger } from 'nestjs-pino';
import { Factory } from 'rosie';
import { Repository } from 'typeorm';

import { SellerEntity } from '@/common/database/entities/seller.entity';
import { TestHelper } from '@/helpers/test.helper';
import { SellerRepository } from './seller.repository';

describe('SellerRepository', () => {
  let repository: SellerRepository;
  let originalRepository: Repository<SellerEntity>;
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
    originalRepository = testHelper.getRepository(SellerEntity);
    logger = createMock<Logger>();
    repository = new SellerRepository(originalRepository, logger);

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

    it('returns all sellers', async () => {
      const sellers = await Promise.all(
        Factory.buildList('seller', 3, {}, { save: true }),
      );

      const results = await repository.findAll();
      expect(results).toIncludeAllMembers(sellers);
    });
  });

  describe('.findOne', () => {
    it('throws NotFoundException when id not found', async () => {
      await expect(repository.findOne(123456)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns seller', async () => {
      const seller: SellerEntity = await Factory.build(
        'seller',
        {},
        { save: true },
      );
      await Factory.build('seller', {}, { save: true });

      expect(await repository.findOne(seller.id)).toEqual(seller);
    });
  });

  describe('.create', () => {
    const properties = {
      name: 'Seller 1',
    };

    let seller: any;

    it('creates a seller', async () => {
      seller = await repository.create(properties);
      expect(await originalRepository.count()).toBe(1);
    });

    it('creates seller with the right properties', async () => {
      seller = await repository.create(properties);
      const reloadedSeller = await repository.findOne(seller.id);

      expect(reloadedSeller).toContainKeys(Object.keys(properties));

      expect(reloadedSeller).toContainEntry(['name', properties.name]);
      expect(reloadedSeller).toContainKeys([
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ]);
    });
  });

  describe('.update', () => {
    it('updates a seller', async () => {
      const seller: SellerEntity = await Factory.build(
        'seller',
        {},
        { save: true },
      );

      const updateResponse = await repository.update(seller.id, {
        name: 'Seller 2',
      });

      const reloadedSeller = await repository.findOne(seller.id);

      expect(reloadedSeller).toContainEntry(['name', 'Seller 2']);
      expect(updateResponse).toEqual({ success: true });
    });

    it('throws a NotFoundException when trying to update a not found id', async () => {
      await expect(
        repository.update(10000, {
          name: 'Seller 2',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('.remove', () => {
    let seller: SellerEntity;

    beforeEach(async () => {
      seller = await Factory.build('seller', {}, { save: true });
    });

    describe('test setup', () => {
      it('has a single item in database', async () => {
        expect(await originalRepository.count()).toBe(1);
      });

      it('has a single not deleted item', async () => {
        const sellers = await originalRepository.find({ take: 1, skip: 0 });

        expect(sellers[0].isDeleted()).toBeFalse();
      });
    });

    it('deletes an existent seller', async () => {
      await repository.remove(seller.id);

      expect(await repository.exist(seller.id)).toBeFalse();
      expect(await originalRepository.count()).toBe(0);
    });

    it('uses soft delete', async () => {
      await repository.remove(seller.id);
      expect(await originalRepository.count({ withDeleted: true })).toBe(1);
    });

    it('ignores an inexistent id', async () => {
      await repository.remove(1000000);

      expect(await originalRepository.count({ withDeleted: true })).toBe(1);
    });
  });
});
