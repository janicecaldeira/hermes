import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';

import { CreateSellerDto } from '@/sellers/dto/create-seller.dto';
import { UpdateSellerDto } from '@/sellers/dto/update-seller.dto';
import { AppModule } from '../src/app.module';
import { TestHelper } from '../src/helpers/test.helper';

describe('SellerController (e2e)', () => {
  let app: any;
  const url = '/sellers';
  let testHelper: TestHelper;

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

  const sellerName = generateString(10);

  const createSellerDto: CreateSellerDto = {
    name: sellerName,
  };

  const updateSellerDto: UpdateSellerDto = {
    name: sellerName,
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
  });

  afterEach(() => {
    return testHelper.cleanDatabase();
  });

  describe('Seller controller', () => {
    it('should create, update and return a seller', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send(createSellerDto)
        .expect(HttpStatus.CREATED);

      const { id } = response.body;

      await request(app.getHttpServer())
        .put(`${url}/${id}`)
        .send(updateSellerDto)
        .expect(HttpStatus.OK);

      return request(app.getHttpServer())
        .get(`${url}/${id}`)
        .expect(HttpStatus.OK);
    });
  });
});
