import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing";
import { CatsService } from "../src/cats/cats.service";
import * as request from 'supertest';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Cat } from '../src/cats/cat.entity';
import { CatsController } from "../src/cats/cats.controller";

describe('Cats', () => {
  let app: INestApplication;
  let mock = [{
    id: 1,
    name: 'cat',
    age: 1,
    breed: 'hoge',
  }];

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find: jest.fn().mockResolvedValue(mock),
          }
        }
      ],
      controllers: [CatsController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect(mock);
  });

  afterAll(async () => {
    await app.close();
  })
})
