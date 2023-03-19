import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Factory } from 'rosie';
import * as request from 'supertest';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { SellerEntity } from '@/common/database/entities/seller.entity';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { UpdateProductDto } from '@/products/dto/update-product.dto';
import { AppModule } from '../src/app.module';
import { TestHelper } from '../src/helpers/test.helper';

describe('ProductController (e2e)', () => {
  let app: any;
  const url = '/products';
  let testHelper: TestHelper;
  let brand: BrandEntity;
  let seller: SellerEntity;
  let createProductDto: CreateProductDto;

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generateString(length: number) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const productName = generateString(10);

  const updateProductDto: UpdateProductDto = {
    price: 10,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testHelper = TestHelper.getInstance();
    await testHelper.initialize();
  });

  afterAll(async () => {
    await testHelper.destroy();
    await app.close();
  });

  beforeEach(async () => {
    await testHelper.cleanDatabase();

    brand = await Factory.build<BrandEntity>('brand', {}, { save: true });
    seller = await Factory.build<BrandEntity>('seller', {}, { save: true });

    createProductDto = {
      name: productName,
      brandId: brand.id,
      sellerId: seller.id,
    };
  });

  afterEach(() => {
    return testHelper.cleanDatabase();
  });

  describe('Product controller', () => {
    it('should create, update and return a product', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send(createProductDto)
        .expect(HttpStatus.CREATED);

      const { id } = response.body;

      await request(app.getHttpServer())
        .put(`${url}/${id}`)
        .send(updateProductDto)
        .expect(HttpStatus.OK);

      return request(app.getHttpServer())
        .get(`${url}/${id}`)
        .expect(HttpStatus.OK);
    });
  });
});
