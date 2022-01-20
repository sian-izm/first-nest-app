import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from 'supertest';
import { Cat } from '../src/cats/models/cat.model';

const cats: Cat[] = [
  {
    name: 'Mike',
    age: 2,
    breed: 'mike',
    id: 3,
  }
];

const gql = '/graphql';

describe('GraphQL CatsResolver (e2e)', () => {
  let app: INestApplication;
  // FIXME: arrange to use mock
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('cats', () => {
      it('should get the cats array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{cats {id name age breed}}' })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.cats).toEqual(cats);
          });
      });
    })
  })
})
