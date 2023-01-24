import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PostsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (GET)', async () => {
    const resp = await request(app.getHttpServer()).get('/posts').expect(200);

    expect(resp.body.data).toHaveLength(5);
  });

  it('/posts/00000000-0000-0000-0000-000000000001', async () => {
    const resp = await request(app.getHttpServer())
      .get('/posts/00000000-0000-0000-0000-000000000001')
      .expect(200);

    expect(resp.body.data).toEqual({
      uuid: '00000000-0000-0000-0000-000000000001',
      title: 'Travel through Africa',
      description: 'This is my post about my trip to Africa',
      user: 1,
    });
  });
});
