import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

jest.mock('uuid', () => ({
  v4: () => 'uuid',
}));

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

  it('/posts/00000000-0000-0000-0000-000000000001 (GET)', async () => {
    const resp = await request(app.getHttpServer())
      .get('/posts/00000000-0000-0000-0000-000000000001')
      .expect(200);

    expect(resp.body.data).toEqual({
      uuid: '00000000-0000-0000-0000-000000000001',
      title: 'Travel through Africa',
      description: 'This is my post about my trip to Africa',
    });
  });

  describe('/posts (POST)', () => {
    it('should succeed', async () => {
      const resp = await request(app.getHttpServer())
        .post('/posts')
        .send({
          title: 'test post',
          description: 'test description',
        })
        .expect(201);

      expect(resp.body.data).toEqual({
        uuid: 'uuid',
        title: 'test post',
        description: 'test description',
      });
    });

    it('should error', async () => {
      const resp = await request(app.getHttpServer())
        .post('/posts')
        .send({})
        .expect(400);

      console.log(resp.body);
      expect(resp.body.errors).toEqual({
        title: 'Bad Request',
        detail: [
          'title should not be empty',
          'description should not be empty',
        ],
        status: '400',
      });
    });
  });

  describe('/posts/00000000-0000-0000-000000000001 (PUT)', () => {
    it('should succeed', async () => {
      const resp = await request(app.getHttpServer())
        .put('/posts/00000000-0000-0000-0000-000000000001')
        .send({
          title: 'test post',
        })
        .expect(200);

      expect(resp.body.data).toEqual({
        uuid: '00000000-0000-0000-0000-000000000001',
        title: 'test post',
        description: 'This is my post about my trip to Africa',
      });
    });

    it("should error if uuid doesn't exist", async () => {
      const resp = await request(app.getHttpServer())
        .put('/posts/00000000-0000-0000-000000000010')
        .send({})
        .expect(404);

      console.log(resp.body);
      expect(resp.body.errors).toEqual({
        code: 'ERR-1',
        details: "The Post requested couldn't be found",
        status: '404',
        title: 'Not found',
      });
    });
  });

  describe('/posts/00000000-0000-0000-000000000001 (DELETE)', () => {
    it('should succeed', async () => {
      const resp = await request(app.getHttpServer())
        .delete('/posts/00000000-0000-0000-0000-000000000001')
        .send()
        .expect(200);

      expect(resp.body.data).toEqual({});
    });

    it("should error if uuid doesn't exist", async () => {
      const resp = await request(app.getHttpServer())
        .put('/posts/00000000-0000-0000-000000000010')
        .send()
        .expect(404);

      console.log(resp.body);
      expect(resp.body.errors).toEqual({
        code: 'ERR-1',
        details: "The Post requested couldn't be found",
        status: '404',
        title: 'Not found',
      });
    });
  });
});
