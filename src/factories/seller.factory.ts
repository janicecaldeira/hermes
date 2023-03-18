import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { SellerEntity } from '../common/database/entities/seller.entity';
import { TestHelper } from '../helpers/test.helper';

Factory.define('seller') // eslint-disable-line prettier/prettier
  .sequence('id')
  .option('created', false)
  .option('deleted', false)
  .option('save', false)
  .attrs({
    name: null,
  })
  .after(async (seller, options) => {
    if (!seller.name) seller.name = faker.company.name();

    if (options.deleted) {
      seller.deletedAt = new Date();
    }

    if (options.created) {
      seller.createdAt = new Date();
      seller.updatedAt = new Date();
    }

    if (options.save) {
      const testHelper = TestHelper.getInstance();

      seller = await testHelper.saveDataAsEntity<SellerEntity>(
        seller,
        SellerEntity,
      );
    }

    return seller;
  });
