import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { BrandEntity } from '../common/database/entities/brand.entity';
import { TestHelper } from '../helpers/test.helper';

Factory.define('brand') // eslint-disable-line prettier/prettier
  .sequence('id')
  .option('created', false)
  .option('deleted', false)
  .option('save', false)
  .attrs({
    name: null,
  })
  .after(async (brand, options) => {
    if (!brand.name) brand.name = faker.company.name();

    if (options.deleted) {
      brand.deletedAt = new Date();
    }

    if (options.created) {
      brand.createdAt = new Date();
      brand.updatedAt = new Date();
    }

    if (options.save) {
      const testHelper = TestHelper.getInstance();

      brand = await testHelper.saveDataAsEntity<BrandEntity>(
        brand,
        BrandEntity,
      );
    }

    return brand;
  });
