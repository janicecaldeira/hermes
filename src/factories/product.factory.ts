import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import slugify from 'slugify';

import { ProductEntity } from '@/common/database/entities/product.entity';
import { TestHelper } from '@/helpers/test.helper';

Factory.define('product') // eslint-disable-line prettier/prettier
  .sequence('id')
  .option('created', false)
  .option('deleted', false)
  .option('save', false)
  .attrs({
    name: null,
    price: null,
    slug: null,
    brand: null,
    brandId: null,
    seller: null,
    sellerId: null,
  })
  .after(async (product, options) => {
    if (!product.name) product.name = faker.commerce.productName();
    if (!product.slug) product.slug = slugify(product.name);
    if (!product.price) product.price = faker.commerce.price();

    if (options.deleted) {
      product.deletedAt = new Date();
    }

    if (options.created) {
      product.createdAt = new Date();
      product.updatedAt = new Date();
    }

    if (!product.brandId && !options.save) {
      if (!product.brand) product.brand = await Factory.build('brand');

      product.brandId = product.brand.id;
    }

    if (!product.brand) {
      product.brand = product.brandId;
    }

    if (!product.sellerId && !options.save) {
      if (!product.seller) product.seller = await Factory.build('seller');

      product.sellerId = product.seller.id;
    }

    if (!product.seller) {
      product.seller = product.sellerId;
    }

    if (options.save) {
      const testHelper = TestHelper.getInstance();

      product = await testHelper.saveDataAsEntity<ProductEntity>(
        product,
        ProductEntity,
      );
    }

    return product;
  });
