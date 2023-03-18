import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';

import { CreateBrandDto } from '@/brands/dto/create-brand.dto';
import { UpdateBrandDto } from '@/brands/dto/update-brand.dto';
import { AppModule } from '../src/app.module';
import { TestHelper } from '../src/helpers/test.helper';

describe('BrandController (e2e)', () => {
  let app: any;
  const url = '/brands';
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

  const brandName = generateString(10);

  const createBrandDto: CreateBrandDto = {
    name: brandName,
  };

  const updateBrandDto: UpdateBrandDto = {
    name: brandName,
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

  describe('Brand controller', () => {
    it('should create, update and return a brand', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send(createBrandDto)
        .expect(HttpStatus.CREATED);

      const { id } = response.body;

      await request(app.getHttpServer())
        .put(`${url}/${id}`)
        .send(updateBrandDto)
        .expect(HttpStatus.OK);

      return request(app.getHttpServer())
        .get(`${url}/${id}`)
        .expect(HttpStatus.OK);
    });
  });
});
