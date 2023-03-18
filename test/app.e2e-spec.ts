import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = mockAppModule.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
